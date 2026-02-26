# 3) Solution space & selected approach

## 3.1 Exploring possible solutions

### 3.1.1 Approaches considered

Our approach was to explore solutions by functional axis, starting from the real project need: better connect code, produced artefacts, and the global reading of a notebook workflow.

We did not look for “one single tool”, but rather for families of approaches:

- experiment tracking,
- provenance / fine-grained traceability,
- pipeline visualization,
- visual or narrative storytelling,
- coordinated multiple views.

In parallel, the project DOW helped us stay aligned with the core objectives (traceability, patterns analysis, visual narration, integration into a unified interface) without drifting into out-of-scope features.

### 3.1.2 Technical alternatives

We considered several alternatives:

- **A) Rely on experiment tracking platforms** (e.g., MLflow, Weights & Biases) to manage runs, metrics, and artefacts.
- **B) Use a structured pipeline approach** (e.g., Kedro / DVC) with a more macro-level graph visualization.
- **C) Build a notebook-specific solution** by combining inspirations from the state of the art: structure/dependency extraction, fine traceability, interactive visualizations, storytelling, and coordinated views.

The last option progressively became the most suitable for our context.

### 3.1.3 Pros and cons

- Tracking platforms are robust for metrics, but often run-centric and not well suited for fine navigation at cell/artefact level.
- Pipeline-centric approaches improve macro readability, but assume an explicit and stable pipeline, while notebooks are often exploratory, iterative, and non-linear.
- Provenance and structural analysis are highly relevant for fine traceability, but insufficient alone to meet UX, narration, and pedagogical needs.
- Storytelling and visual analytics provide strong UX principles, but do not natively address ML notebook specifics.

Our conclusion was to combine these contributions rather than depend on a single existing paradigm.

## 3.2 Why this solution was selected

### 3.2.1 Decision criteria

The final choice was guided by criteria such as:

- compatibility with non-linear notebooks,
- fine-grained traceability between cells and artefacts,
- ability to provide both global and local workflow views,
- quality of the user experience,
- feasibility within the available time.

### 3.2.2 Technical reasoning

We used the state of the art as inspiration, without trying to reproduce it as-is.

- Tracking platforms inspired the notion of artefacts and metrics.
- Provenance and structure analysis inspired artefact↔code relationships and more explicit dependencies.
- Storytelling and coordinated views inspired navigation and contextualization.

From these elements, we built the current prototype as a dedicated, usage-oriented interface rather than a raw assembly of external tools.

### 3.2.3 Key trade-offs

The main trade-off was to prioritize the **frontend** over the backend at the end of the project due to time constraints.

Concretely, we prioritized a functional, readable, and demonstrable interface (visualizations, view transitions, user experience) over a complex backend.

This decision matches the current goal of the project: validate usage value and the visualization approach first, while keeping a clear enough structure to enable backend extensions later.

We also decided early to de-prioritize the “sonar-like” notebook diagnostics module, because it did not align well with the updated objectives and timelines.
