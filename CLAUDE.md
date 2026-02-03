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

## Web Quality Review Extensions

For frontend code, also apply web quality validation using these skills:

### `/web-quality-audit`
Use for comprehensive quality review covering all categories:
- Performance, accessibility, SEO, and best practices
- Categorize findings by severity (Critical, High, Medium, Low)

### `/performance`
Use for performance optimization:
- Resource loading and optimization
- JavaScript and CSS efficiency
- Image and font optimization
- Caching strategies

### `/core-web-vitals`
Use for Core Web Vitals compliance:
- LCP (Largest Contentful Paint) optimization
- INP (Interaction to Next Paint) optimization
- CLS (Cumulative Layout Shift) prevention

### `/accessibility`
Use for WCAG 2.1 compliance:
- Perceivable: alt text, color contrast, media alternatives
- Operable: keyboard navigation, focus management
- Understandable: labels, error handling, consistency
- Robust: valid HTML, proper ARIA usage

### `/best-practices`
Use for security and code quality:
- HTTPS and CSP compliance
- No vulnerable dependencies
- Valid HTML and semantic markup
- Proper error handling

## Monorepo & CI Review Extensions

### `/turborepo`
Use for monorepo configuration and Turborepo usage:
- `turbo.json` task configuration and pipelines
- `dependsOn`, caching, and `outputs` configuration
- Package structure and internal packages
- CI optimization with `--affected` flag
- Environment variable handling

### `/workleap-chromatic-best-practices`
Use for Chromatic/Storybook visual testing configuration:
- `chromatic.config.json` and `untraced` option
- CI workflow label-based triggering (`run chromatic` label)
- TurboSnap preservation (avoiding barrel imports in preview files)
- Required CI flags (`onlyChanged`, `fetch-depth: 0`)
- Snapshot cost optimization
