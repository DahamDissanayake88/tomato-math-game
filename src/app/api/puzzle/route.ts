import { NextResponse } from 'next/server';

const BANANA_API_URL = 'https://marcconrad.com/uob/tomato/api.php?out=csv&base64=yes';
const TIMEOUT_MS = 8000;

export const dynamic = 'force-dynamic';

/**
 * Next.js Route Handler acting as a resilient intermediary for the University of Bedfordshire Banana API.
 * Solves browser CORS limitations and guarantees clean CSV parsing and Base64 image validation.
 */
export async function GET() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(BANANA_API_URL, {
      signal: controller.signal,
      cache: 'no-store',
      headers: {
        'Accept': 'text/plain, text/csv, */*',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Banana API responded with HTTP status ${response.status}` },
        { status: 502 }
      );
    }

    const rawCsv = await response.text();
    if (!rawCsv || !rawCsv.includes(',')) {
      return NextResponse.json(
        { error: 'Invalid or empty response format received from Banana API' },
        { status: 502 }
      );
    }

    // Parse CSV format: [base64_image_data, solution]
    const commaIndex = rawCsv.indexOf(',');
    const base64Data = rawCsv.substring(0, commaIndex).trim();
    const solutionStr = rawCsv.substring(commaIndex + 1).trim();

    if (!base64Data) {
      return NextResponse.json(
        { error: 'Missing Base64 image payload in Banana API response' },
        { status: 502 }
      );
    }

    const solution = parseInt(solutionStr, 10);
    if (isNaN(solution) || solution < 0 || solution > 9) {
      return NextResponse.json(
        { error: `Invalid solution value received from Banana API: ${solutionStr}` },
        { status: 502 }
      );
    }

    // Construct valid Data URI for clean HTML <img> rendering without quality degradation
    const imageUrl = `data:image/png;base64,${base64Data}`;

    return NextResponse.json(
      {
        imageUrl,
        solution,
        timestamp: Date.now(),
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0',
        },
      }
    );
  } catch (error: any) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'Banana API request timed out. Please try again.' },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to communicate with the Banana API. Network connection error.' },
      { status: 502 }
    );
  }
}
