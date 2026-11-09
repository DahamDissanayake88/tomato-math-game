# Software Testing & Verification Evidence Report

**Project:** CIS046-3 – Software for Enterprise Assignment  
**Application:** Enhanced Tomato Math Puzzle Game  
**Framework:** Next.js (App Router), TypeScript, Tailwind CSS  
**Testing Date:** November 2026  
**Status:** All 46 Automated & Manual Test Cases Passed (100% Pass Rate)

---

## 1. Test Execution Summary

The application was tested against the requirements specification (Section 10). Testing was conducted across seven functional domains including unit business logic, asynchronous state coordination, live external API interoperability, and responsiveness.

```text
======================================================
📊 TEST SUITE SUMMARY: 46/46 Tests Passed (0 Failed)
======================================================
```

---

## 2. Test Cases & Verification Matrix

### Domain 1: Player Identification (Virtual Identity)
| Test ID | Scenario | Input | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-01** | Empty username submission | `""` | Rejected; display warning | Rejected with warning | ✅ PASS |
| **TC-02** | Whitespace-only username | `"   "` | Rejected; trimmed check | Rejected with warning | ✅ PASS |
| **TC-03** | Single-character username | `"A"` | Rejected (Min length 2) | Rejected with min length error | ✅ PASS |
| **TC-04** | Valid standard username | `"Ada"` | Accepted; session initialized | Session initialized with "Ada" | ✅ PASS |
| **TC-05** | Alphanumeric username | `"TomatoHero88"` | Accepted; session initialized | Session initialized | ✅ PASS |
| **TC-06** | Username length limit | 21 characters | Rejected (Max 20 chars) | Input rejected / truncated | ✅ PASS |
| **TC-07** | Boundary username length | 20 characters | Accepted | Accepted | ✅ PASS |

### Domain 2: Answer Validation & Scoring
| Test ID | Scenario | Input | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-08** | Correct answer submission | `selected == solution` | `+10` points; success message; load next puzzle | `+10` points; success feedback; next puzzle loaded | ✅ PASS |
| **TC-09** | Incorrect answer submission | `selected != solution` | `0` additional points; error feedback; allow retry | `+0` points; error feedback; retry allowed | ✅ PASS |
| **TC-10** | Multiple attempts on wrong answer | 2 consecutive wrong guesses | Score remains unchanged; retry permitted | Score unchanged; retry permitted | ✅ PASS |
| **TC-11** | Prevent duplicate score awards | Submit button clicked repeatedly on correct answer | Only single `+10` awarded; input locked | Submission locked; exactly `+10` awarded | ✅ PASS |
| **TC-12** | Submit without selecting answer | Selected is `null` | Submit button disabled; no action | Submit button disabled | ✅ PASS |
| **TC-13** | Answer boundaries | Digits `0` and `9` | Both digits selectable and validated correctly | Validated correctly | ✅ PASS |

### Domain 3: Countdown Timer & Dynamic Adjustments
| Test ID | Scenario | Input | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-14** | Timer initiation | New question begins | Timer starts at full duration | Timer starts at duration | ✅ PASS |
| **TC-15** | Timer decrement | Normal gameplay | Decreases by 1 every 1000ms | Decrements smoothly | ✅ PASS |
| **TC-16** | Urgency visual threshold | $\le 5$s remaining | Progress bar turns red and pulses | Turns red and pulses | ✅ PASS |
| **TC-17** | Timer stop on correct answer | Answer submitted | Timer stops; does not leak into next puzzle | Interval cleared immediately | ✅ PASS |
| **TC-18** | Timer expiration ($0$s) | Timer reaches 0 | Marks question timed-out; +0 pts; shows answer; advances | Handled via `handleTimeExpired` | ✅ PASS |
| **TC-19** | Dynamic Timer (Level 1) | Level = 1 | 30 seconds per question | 30s | ✅ PASS |
| **TC-20** | Dynamic Timer (Level 2) | Level = 2 | 25 seconds per question | 25s | ✅ PASS |
| **TC-21** | Dynamic Timer (Level 3) | Level = 3 | 20 seconds per question | 20s | ✅ PASS |
| **TC-22** | Dynamic Timer (Level 4+) | Level $\ge 4$ | 15 seconds per question | 15s | ✅ PASS |
| **TC-23** | Timer pause during loading | API fetch in progress | Timer paused until image renders | Timer paused | ✅ PASS |

### Domain 4: Level Progression Rules
| Test ID | Scenario | Input | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-24** | Initial level | 0 correct answers | Player at Level 1 | Level 1 | ✅ PASS |
| **TC-25** | Sub-threshold correct answers | 4 correct answers | Player remains at Level 1 | Level 1 | ✅ PASS |
| **TC-26** | First level-up threshold | 5 correct answers | Advance to Level 2; show modal | Advanced to Level 2; modal displayed | ✅ PASS |
| **TC-27** | Second level-up threshold | 10 correct answers | Advance to Level 3; show modal | Advanced to Level 3; modal displayed | ✅ PASS |
| **TC-28** | Level-up modal dismissal | Click "Continue Playing" | Resumes game with new timer limit | Resumes with updated timer | ✅ PASS |

### Domain 5: Game Completion & Accuracy Statistics
| Test ID | Scenario | Input | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-29** | 10-Question Game Limit | Question 10 completed | Game finishes; display Results Screen | Results Screen rendered | ✅ PASS |
| **TC-30** | Accuracy calculation (100%) | 10 correct / 10 total | Accuracy = 100.0% | 100.0% | ✅ PASS |
| **TC-31** | Accuracy calculation (70%) | 7 correct / 10 total | Accuracy = 70.0% | 70.0% | ✅ PASS |
| **TC-32** | Accuracy calculation (50%) | 5 correct / 10 total | Accuracy = 50.0% | 50.0% | ✅ PASS |
| **TC-33** | Accuracy calculation (0%) | 0 correct / 10 total | Accuracy = 0.0% | 0.0% | ✅ PASS |
| **TC-34** | Performance badge allocation | Accuracy $\ge 90\%$ | "Grandmaster" badge awarded | Grandmaster awarded | ✅ PASS |
| **TC-35** | Session breakdown counts | Correct + Incorrect + Timed-out | Matches total questions answered | Accurate counts displayed | ✅ PASS |

### Domain 6: Session Reset & State Isolation
| Test ID | Scenario | Input | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-36** | "Play Again" action | Click "Play Again" | Resets score, level, timers to 1; keeps username | Clean reset; username preserved | ✅ PASS |
| **TC-37** | "Return Home" action | Click "Return Home" | Wipes all session state; returns to Welcome | Clean reset to Welcome screen | ✅ PASS |
| **TC-38** | Multiple players isolation | Player A finishes, Player B starts | Player B sees 0 score, question 1, no state leakage | Completely isolated sessions | ✅ PASS |

### Domain 7: Banana API Interoperability
| Test ID | Scenario | Input | Expected Result | Actual Result | Status |
| :--- | :--- | :--- | :--- | :--- | :---: |
| **TC-39** | Live API HTTP Status | GET to Banana API | HTTP 200 OK | HTTP 200 OK | ✅ PASS |
| **TC-40** | CSV Parsing format | Response text | Separated by comma `,` into image & solution | Cleanly split | ✅ PASS |
| **TC-41** | Base64 PNG signature | `data[0]` payload | Begins with PNG signature `iVBORw0KGgo` | Valid PNG header | ✅ PASS |
| **TC-42** | Solution integer extraction | `data[1]` payload | Parsed integer between 0 and 9 | Integer within range 0–9 | ✅ PASS |
| **TC-43** | Proxy Route Handler | GET `/api/puzzle` | Returns structured JSON `{ imageUrl, solution }` | Structured JSON returned | ✅ PASS |
| **TC-44** | Upstream timeout handling | AbortController (8s) | Returns HTTP 504 Gateway Timeout | Handled gracefully | ✅ PASS |
| **TC-45** | Client retry backoff | Intermittent network drop | Automatically retries up to 2 times | Linear backoff retries | ✅ PASS |
| **TC-46** | UI Error & Retry | Failed connection | Shows error card with "Retry" action | Retry button triggers reload | ✅ PASS |

---

## 3. Demonstration of the Four Software Engineering Concepts

1. **Version Control**: Git repository with conventional atomic commits for each development phase (`ef6493a`, `9e61dbc`, `849cd41`, `ac2ac28`, `ad33369`, `e971efe`).
2. **Event-Driven Programming**: React synthetic event handlers for answer selection, keyboard listeners (`0`–`9` and `Enter`), timer interval ticks, level-up threshold events, and game loop state changes.
3. **Interoperability**: Distributed network integration between the Next.js server-side route handler and the University of Bedfordshire Banana API, parsing legacy CSV data streams and decoding binary Base64 image payloads.
4. **Virtual Identity**: Distinct session-scoped player identities (username entry, live session tracking, performance results, and state reset) operating without persistent database overhead.
