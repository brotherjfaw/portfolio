# Playwright + TypeScript | Senior QA Automation Portfolio

[![Playwright TypeScript QA](https://github.com/brotherjfaw/portfolio/actions/workflows/playwright-qa.yml/badge.svg)](https://github.com/brotherjfaw/portfolio/actions/workflows/playwright-qa.yml)

**Author:** Jahi K. Faw · Senior Software QA Engineer

This project demonstrates structured, maintainable end-to-end and REST API automation using **Playwright Test, TypeScript and GitHub Actions**. It uses public practice services and contains no employer code or credentials.

## What it demonstrates

| Area | Implementation |
| --- | --- |
| UI testing | TodoMVC add, complete, filter, delete and blank-input scenarios |
| API testing | JSONPlaceholder GET/POST contract checks and a 404 negative scenario |
| Test architecture | Page Object Model (`pages/TodoPage.ts`) with strict TypeScript |
| Cross-browser coverage | Chromium and Firefox |
| Failure diagnostics | Screenshots, retained traces, video and HTML reports |
| CI/CD | GitHub Actions on PRs, relevant pushes and manual dispatch |
| Reliability | No arbitrary sleeps, automated retries only in CI, test isolation |

## Quick start

Requirements: Node.js 22+ and npm.

```bash
cd playwright-typescript-qa
npm install
npx playwright install chromium firefox
npm test
```

Additional commands:

```bash
npm run typecheck       # Static TypeScript checks
npm run test:chromium   # Run Chromium project
npm run test:api        # Only API tests
npm run test:headed     # Headed browser mode
npm run test:ui         # Playwright interactive test runner
npm run report          # Open the most recent HTML report
```

## Structure

```text
playwright-typescript-qa/
├── pages/TodoPage.ts               # Page Object
├── tests/
│   ├── ui/todo.spec.ts             # UI regression coverage
│   └── api/posts.spec.ts           # REST API contract coverage
├── playwright.config.ts            # Projects, retries and reporting
├── tsconfig.json                   # Strict TypeScript config
└── package.json                    # Scripts and dependencies
.github/workflows/playwright-qa.yml # GitHub Actions pipeline
```

## Test strategy and design decisions

- **Risk-based scenarios:** Focus on task creation, completion, filtering and deletion, plus API response status and contracts.
- **Readable tests:** Test scenarios express behavior; reusable selectors and actions live in a Page Object.
- **Negative coverage:** Blank todo input and a nonexistent REST resource supplement the happy paths.
- **Cross-browser:** The same UI scenarios run in Chromium and Firefox to catch rendering and behavior differences.
- **Diagnostics:** Preserve trace, screenshot and video on failure to reduce investigation time.
- **CI security:** Minimal read-only token permissions and no repository secrets.

## Continuous integration

[View GitHub Actions runs](https://github.com/brotherjfaw/portfolio/actions/workflows/playwright-qa.yml).

The workflow installs dependencies and browsers, checks TypeScript, executes the test suite and uploads the HTML report. Failure artifacts are uploaded separately when a job fails.

Because public demo endpoints can change or be temporarily unavailable, failures should be investigated rather than assumed to be application defects. No claim of passing CI is made until a successful workflow run is confirmed.

## Limitations and next steps

- Public demo applications and API endpoints are external test dependencies; there is no controlled backend.
- The UI and API examples are separate suites, not a single end-to-end business transaction.
- For stronger reproducibility, generate and commit an npm lockfile from an environment with registry access, then switch CI from `npm install` to `npm ci`.
- Next improvements: mocked network failure testing, data-driven cases, accessibility checks and a test-results dashboard.

[Back to Jahi's professional portfolio](../README.md)
