# claude-code-review-poc

Moved to [wl-agents-code-review-poc](https://github.com/workleap/wl-agents-code-review-poc) to include Copilot to the rounds of testing.

## Findings

### @codex

- Caught only 8 issues out of 29.
- Time to completion was high
- No visual indicator that it's in progress
- Reporting format is great though
- Automating "@codex review" with a GitHub action doesn't work. I always get "To use Codex here, create a Codex account and connect to github.". But when I do it manually it works..
- Manually commenting "@codex do a full accessibility review and list all issues found" reports more issues than "@codex review".

### Can only validate the changes of the PR even if instructions say otherwise

Your CLAUDE.md says "review the entire file for /accessibility", but the plugin's internal validation logic says "pre-existing issues are false positives" - and the plugin     
wins.

This is a fundamental limitation of the code-review@claude-code-plugins plugin. It's designed to only comment on issues introduced by the PR, regardless of what your CLAUDE.md 
says.
