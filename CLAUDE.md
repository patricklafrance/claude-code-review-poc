# Code Review Instructions

## Review Process

For each changed file in the PR, apply the relevant skills below based on file type and imports:

### Frontend Files (`.ts`, `.tsx`, `.js`, `.jsx`)

1. **Always run `/accessibility`** - Check for WCAG compliance:
   - Images must have meaningful `alt` text
   - Form inputs must have associated labels
   - Interactive elements must be keyboard accessible
   - Dynamic content must use `role="alert"` or live regions

2. **Always run `/best-practices`** - Check for:
   - Security issues (hardcoded secrets, XSS vulnerabilities)
   - No PII in logs (emails, passwords, tokens)
   - Proper error handling

3. **If file imports `@squide/firefly`** → Run `/workleap-squide`
4. **If file imports `@workleap/logging`** → Run `/workleap-logging`
5. **If file imports `@workleap/telemetry`** → Run `/workleap-telemetry`

### Configuration Files

- `eslint.config.*`, `tsconfig.json`, `rsbuild.*` → Run `/workleap-web-configs`
- `turbo.json` → Run `/turborepo`
- `chromatic.config.json`, `.storybook/*` → Run `/workleap-chromatic-best-practices`

## Issue Reporting

When reporting issues:
- Name the skill or category that identified the issue
- Include exact code location (`file:line`)
- Explain why it's a problem and how to fix it
