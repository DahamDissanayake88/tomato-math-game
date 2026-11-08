import { Puzzle } from '@/types/game';

const API_ENDPOINT = '/api/puzzle';

export interface FetchPuzzleOptions {
  retries?: number;
  retryDelayMs?: number;
}

/**
 * Service to retrieve mathematical puzzles from the Banana API via the Next.js intermediary route.
 * Handles network failures, response validation, and automatic retries.
 */
export async function fetchRandomPuzzle(options: FetchPuzzleOptions = {}): Promise<Puzzle> {
  const { retries = 2, retryDelayMs = 1000 } = options;

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      if (attempt > 0) {
        // Linear backoff wait before retry
        await new Promise((resolve) => setTimeout(resolve, retryDelayMs * attempt));
      }

      const response = await fetch(API_ENDPOINT, {
        method: 'GET',
        cache: 'no-store',
        headers: {
          'Accept': 'application/json',
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error ${response.status} from puzzle API`);
      }

      if (!data.imageUrl || typeof data.solution !== 'number') {
        throw new Error('Received malformed puzzle data structure');
      }

      return {
        id: `puzzle_${data.timestamp || Date.now()}`,
        imageUrl: data.imageUrl,
        solution: data.solution,
      };
    } catch (err: any) {
      lastError = err instanceof Error ? err : new Error(String(err));
      console.warn(`[BananaApi] Attempt ${attempt + 1}/${retries + 1} failed:`, lastError.message);
    }
  }

  throw lastError || new Error('Failed to fetch puzzle after multiple attempts.');
}
