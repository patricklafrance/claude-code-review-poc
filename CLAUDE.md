# Code Review Instructions

When performing code reviews on this repository, in addition to standard code review practices, use the following agent skills to validate frontend code:

## Frontend Code Review Extensions

For frontend files (`.ts`, `.tsx`, `.js`, `.jsx`, configuration files), apply additional validation using these skills:

### `/workleap-squide`
Use for code that imports from `@squide/firefly` and `@squide/i18next`:
- Route and navigation registration
- Modular application architecture
- Global data fetching patterns
- Runtime initialization

### `/workleap-telemetry`
Use for code that imports from `@workleap/telemetry`:
- Honeycomb, LogRocket, or Mixpanel instrumentation
- Telemetry initialization and provider setup
- Privacy compliance

### `/workleap-logging`
Use for code that imports from `@workleap/logging`:
- Logger setup and configuration
- Log level usage and error logging patterns

### `/workleap-web-configs`
Use for configuration files:
- ESLint configuration (`eslint.config.*`)
- TypeScript configuration (`tsconfig.json`)
- Rsbuild/Rslib configuration
- Stylelint configuration
