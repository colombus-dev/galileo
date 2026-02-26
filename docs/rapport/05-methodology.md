# 5) Work method & standards

## 5.1 Methodology

### 5.1.1 Approach (Agile / Kanban)

We adopted an Agile organization with a workflow close to **Kanban** rather than a strict Scrum process.

The project progressed through short iterations, with regular prioritization based on time constraints, actual progress, and feedback.

Tracking was not done via GitHub Projects, but through a combination of:

- GitHub milestones (project milestones),
- GitHub issues (tasks),
- branches / pull requests (implementation work).

This approach worked well because it remained flexible while keeping a clear structure: each axis advanced in parallel, then decisions and trade-offs were consolidated in team meetings.

### 5.1.2 Team organization

The organization was structured around two phases:

- **Regular phase (outside full-time)**: 1 meeting per week
- **Full-time phase**: 2 fixed meetings per week

Meetings focused on:

- progress per axis,
- blockers,
- synchronizing UX/UI and implementation choices.

Even though work was mostly split by axis, meetings were essential to share ideas, align the product vision, and avoid axes evolving too independently.

Important decisions (frontend-first prioritization, feature trade-offs, final scope) were usually prepared in advance and then discussed and validated in meetings, including with supervisors.

### 5.1.3 Task distribution

Task distribution followed two levels: by research axis first, then by shared tasks.

#### 5.1.3.1 Distribution by research axis

Main tasks were split by axis (e.g., Storytelling, Artefacts, Patterns), to move faster through clear ownership boundaries.

This did not prevent collaboration: weekly meetings were used to share solutions, harmonize UX/UI choices, and preserve global coherence.

#### 5.1.3.2 Shared tasks

In addition to axis-specific work, cross-cutting tasks were handled collectively:

- overall project structure,
- interface consistency,
- final integration,
- deliverables preparation (report, poster, video, demo),
- knowledge sharing across axes,
- documentation and consolidation.

This dual organization (axes + shared tasks) preserved both specialization and consistency.

### 5.1.4 Tools (communication, versioning, tracking)

We primarily used:

- **GitHub** for source control, issues, milestones, branches, and pull requests
- **Discord** for team communication (messages, calls, sharing screenshots)
- **Google Drive** as a shared documentation repository (work documents, notes, draft contents)

GitHub centralized engineering work and task distribution, while Discord enabled daily coordination and quick resolution of blockers.

Regarding software quality, we chose not to integrate a full CI test pipeline in the final version, mostly due to time constraints. Instead, we prioritized a lighter validation approach (manual verification and prototype stability during demos).

## 5.2 User testing protocols and interviews

### 5.2.1 Testing protocols

We defined structured user testing protocols to evaluate multiple axes of Galileo (notably artefact↔code linking, Patterns, and Storytelling).

Tests were conducted on mockups (semi-static depending on the axis), in person or remotely, with consent and optional audio/screen recording.

The methodology was mainly qualitative and exploratory:

- thinking aloud,
- guided scenarios and tasks,
- post-test questions (ratings + open questions).

Sessions typically followed phases: welcome + consent, context setup, task execution, and debrief. Target durations were around 25–30 minutes per participant depending on the profile and axis.

Tasks were formulated from realistic situations, for example:

- quickly understanding the methodology of a notebook,
- linking a result to its code or artefacts,
- comparing multiple notebooks,
- detecting a methodological inconsistency,
- evaluating reproducibility or preparing a result for publication.

Protocols also included subjective measures (1–5 scales, confidence, usefulness, clarity, cognitive load) and observation grids (verbatims, confusions, criteria mentioned) to transform qualitative feedback into concrete UX improvement actions.

### 5.2.2 Interviews

Interviews were an important part of our design process, especially with participants having real ML notebook usage (teachers/supervisors, students, researchers).

We used semi-structured qualitative interviews centered on current practices, pain points, and the perceived value of Galileo.

Profiles were selected consistently with our personas:

- teachers / pedagogical supervisors (time constraints, need to review many notebooks),
- researchers in data science / ML (rigor, traceability, comparison, reproducibility),
- students (notebook authors, self-understanding and improvement).

Interviews were structured in three parts:

1. pre-interview about current practices,
2. guided scenarios/tasks on Galileo mockups,
3. post-interview about perceived gains, limits, and risks (information overload, rigidity, missing data for reproducibility).

These interviews helped us better understand expectations across profiles, identify friction points, adjust information hierarchy, clarify what must be visible quickly (synthesis, comparison, methodological criteria), and better frame Galileo as an analysis and reading tool (not only a visualization tool).
