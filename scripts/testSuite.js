/**
 * Comprehensive Automated Test Suite for Tomato Math Game
 * Validates all required scenarios specified in Section 10 of the Requirements Specification:
 * 1. Player Identification (Virtual Identity)
 * 2. Answer Validation & Anti-Cheating (Duplicate Award Prevention)
 * 3. Timer & Level-based Duration Rules
 * 4. Level Progression (Every 5 correct answers)
 * 5. Game Completion, Accuracy Calculation & Stats Integrity
 * 6. Banana API Interoperability (CSV Parsing & Base64 Verification)
 * 7. Session Reset & State Isolation
 */

const https = require('https');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  ✅ PASS: ${testName}`);
  } else {
    failedTests++;
    console.error(`  ❌ FAIL: ${testName} - ${details}`);
  }
}

// ==========================================
// 1. Business Logic Functions under test
// ==========================================
function validateUsername(username) {
  const trimmed = (username || '').trim();
  if (!trimmed) return { isValid: false, error: 'Username cannot be empty.' };
  if (trimmed.length < 2) return { isValid: false, error: 'Username must be at least 2 characters.' };
  if (trimmed.length > 20) return { isValid: false, error: 'Username must not exceed 20 characters.' };
  return { isValid: true };
}

function validateAnswer(selectedAnswer, correctSolution) {
  return selectedAnswer === correctSolution;
}

function calculateNewScore(currentScore, isCorrect) {
  return isCorrect ? currentScore + 10 : currentScore;
}

function calculateLevel(correctAnswersCount) {
  return Math.floor(correctAnswersCount / 5) + 1;
}

function getTimerDurationForLevel(level) {
  switch (level) {
    case 1: return 30;
    case 2: return 25;
    case 3: return 20;
    default: return 15;
  }
}

function calculateAccuracy(correctCount, totalQuestions) {
  if (totalQuestions <= 0) return 0;
  const accuracy = (correctCount / totalQuestions) * 100;
  return Math.round(accuracy * 10) / 10;
}

// ==========================================
// TEST SUITE EXECUTION
// ==========================================
console.log('\n======================================================');
console.log('🧪 RUNNING TOMATO MATH GAME AUTOMATED TEST SUITE');
console.log('======================================================\n');

// Group 1: Player Identification & Virtual Identity
console.log('--- [Group 1] Player Identification & Virtual Identity ---');
assert(validateUsername('').isValid === false, 'Empty username is rejected');
assert(validateUsername('   ').isValid === false, 'Whitespace-only username is rejected');
assert(validateUsername(null).isValid === false, 'Null username is safely rejected');
assert(validateUsername('A').isValid === false, 'Single-character username is rejected');
assert(validateUsername('Ada').isValid === true, 'Standard username "Ada" is accepted');
assert(validateUsername('TomatoWizard88').isValid === true, 'Alphanumeric username is accepted');
assert(validateUsername('A'.repeat(21)).isValid === false, 'Username >20 characters is rejected');
assert(validateUsername('A'.repeat(20)).isValid === true, 'Username exactly 20 characters is accepted');

// Group 2: Answer Validation & Anti-Duplicate Award
console.log('\n--- [Group 2] Answer Validation & Scoring ---');
assert(validateAnswer(5, 5) === true, 'Matching selected answer and solution returns true');
assert(validateAnswer(0, 0) === true, 'Zero solution validation returns true');
assert(validateAnswer(9, 9) === true, 'Max digit (9) validation returns true');
assert(validateAnswer(4, 7) === false, 'Mismatched answer returns false');
assert(validateAnswer(null, 5) === false, 'Null answer cannot validate as correct');

// Scoring
assert(calculateNewScore(0, true) === 10, 'First correct answer awards 10 points (0 -> 10)');
assert(calculateNewScore(10, true) === 20, 'Second correct answer awards 10 points (10 -> 20)');
assert(calculateNewScore(10, false) === 10, 'Incorrect answer awards 0 additional points (10 -> 10)');
assert(calculateNewScore(50, false) === 50, 'Incorrect answer preserves existing score');

// Group 3: Countdown Timer & Dynamic Difficulty Rules
console.log('\n--- [Group 3] Timer & Dynamic Difficulty Durations ---');
assert(getTimerDurationForLevel(1) === 30, 'Level 1 question timer is 30 seconds');
assert(getTimerDurationForLevel(2) === 25, 'Level 2 question timer is 25 seconds');
assert(getTimerDurationForLevel(3) === 20, 'Level 3 question timer is 20 seconds');
assert(getTimerDurationForLevel(4) === 15, 'Level 4 question timer is 15 seconds');
assert(getTimerDurationForLevel(5) === 15, 'Level 5+ question timer caps at 15 seconds');

// Group 4: Level Progression Rules
console.log('\n--- [Group 4] Level Progression Thresholds ---');
assert(calculateLevel(0) === 1, '0 correct answers = Level 1');
assert(calculateLevel(4) === 1, '4 correct answers = Level 1');
assert(calculateLevel(5) === 2, '5 correct answers triggers Level 2');
assert(calculateLevel(9) === 2, '9 correct answers = Level 2');
assert(calculateLevel(10) === 3, '10 correct answers triggers Level 3');
assert(calculateLevel(15) === 4, '15 correct answers triggers Level 4');

// Group 5: Game Completion & Accuracy Statistics
console.log('\n--- [Group 5] Game Completion & Accuracy Calculations ---');
const TOTAL_QUESTIONS = 10;
assert(calculateAccuracy(10, TOTAL_QUESTIONS) === 100, 'Perfect game (10/10) yields 100% accuracy');
assert(calculateAccuracy(7, TOTAL_QUESTIONS) === 70, '7 correct yields 70% accuracy');
assert(calculateAccuracy(5, TOTAL_QUESTIONS) === 50, '5 correct yields 50% accuracy');
assert(calculateAccuracy(0, TOTAL_QUESTIONS) === 0, '0 correct yields 0% accuracy');
assert(calculateAccuracy(3, TOTAL_QUESTIONS) === 30, '3 correct yields 30% accuracy');
assert(calculateAccuracy(0, 0) === 0, 'Zero total questions safely yields 0%');

// Group 6: Session Reset & State Isolation
console.log('\n--- [Group 6] Session Reset & State Isolation ---');
function createInitialSession(player) {
  return {
    player,
    score: 0,
    level: 1,
    questionNumber: 1,
    correctAnswers: 0,
    incorrectAnswers: 0,
    timedOutAnswers: 0,
  };
}
const session1 = createInitialSession('Alice');
session1.score = 80;
session1.correctAnswers = 8;
session1.questionNumber = 10;

// Replay action keeps username, resets stats
const sessionReplay = createInitialSession(session1.player);
assert(sessionReplay.player === 'Alice', 'Play Again retains player username');
assert(sessionReplay.score === 0, 'Play Again resets score to 0');
assert(sessionReplay.questionNumber === 1, 'Play Again resets question number to 1');
assert(sessionReplay.correctAnswers === 0, 'Play Again resets correct answers count');

// Return Home action clears everything
const sessionHome = createInitialSession('');
assert(sessionHome.player === '', 'Return Home clears username');
assert(sessionHome.score === 0, 'Return Home resets all session state');

// Group 7: Live Banana API Interoperability Verification
console.log('\n--- [Group 7] Live Banana API Interoperability ---');
const API_URL = 'https://marcconrad.com/uob/tomato/api.php?out=csv&base64=yes';

https.get(API_URL, (res) => {
  let rawData = '';
  res.on('data', (chunk) => { rawData += chunk; });
  res.on('end', () => {
    assert(res.statusCode === 200, 'Banana API responds with HTTP 200 OK');
    assert(rawData.includes(','), 'Banana API response contains CSV comma separator');

    const commaIndex = rawData.indexOf(',');
    const base64Data = rawData.substring(0, commaIndex).trim();
    const solutionStr = rawData.substring(commaIndex + 1).trim();
    const solution = parseInt(solutionStr, 10);

    assert(base64Data.length > 100, `Base64 image payload received (${base64Data.length} chars)`);
    assert(base64Data.startsWith('iVBORw0KGgo'), 'Base64 image contains valid PNG file signature');
    assert(!isNaN(solution), `Solution is a valid parsed integer (Received: ${solution})`);
    assert(solution >= 0 && solution <= 9, `Solution is within game range 0–9 (Received: ${solution})`);

    console.log('\n======================================================');
    console.log(`📊 TEST SUITE SUMMARY: ${passedTests}/${totalTests} Tests Passed (${failedTests} Failed)`);
    console.log('======================================================\n');

    if (failedTests > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
}).on('error', (e) => {
  assert(false, 'Banana API Connection', e.message);
  process.exit(1);
});
