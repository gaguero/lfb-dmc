# Memory Bank

This directory contains living documentation that tracks architecture decisions, domain knowledge, and project history for the DMC site & management system.

Files:
- `activeContext.md` – snapshot of current design decisions, assumptions, and constraints.
- `progress.md` – chronological log of milestones and noteworthy events.
- `visual-style-guide-v0.1.md` – brand guidelines, colors, fonts, and visual identity.
- `prd-multi-destination-system.md` – comprehensive Product Requirements Document for the multi-destination platform.

## Task Master Integration

This project uses **Task Master** for structured development with visual validation:
- **Configuration**: `.taskmaster/` directory with tasks, config, and documentation
- **Methodology**: Each development step requires visual verification and human approval
- **PRD-Driven**: Tasks generated from comprehensive Product Requirements Document
- **Incremental**: Every subtask produces observable, testable results

### Task Master Commands (for reference)
- `task-master list` – Show current tasks and status
- `task-master next` – Get next available task to work on
- `task-master show <id>` – View detailed task information
- `task-master set-status --id=<id> --status=<status>` – Update task status

Guidelines:
1. Keep entries concise and up-to-date.
2. Reference or link to deeper docs (e.g., architecture digests) when they grow large.
3. Treat these files as first-class code: review changes via PR and keep commit messages descriptive.
4. **Task Master Workflow**: Always use Task Master for development tracking and validation.
5. **Visual Validation**: Each development step must be visually verifiable before proceeding. 