# 9) General conclusion

## 9.1 Restating the problem

Jupyter notebooks have become a standard for teaching and for experimentation in Machine Learning because they combine code, explanations, and results.

However, their structure remains fundamentally **linear**: understanding a workflow often requires scrolling through long sequences of cells, mentally rebuilding the pipeline logic, and manually connecting the code to the produced artefacts (datasets, models, metrics, figures).

In the Galileo/Colombus context, the goal was therefore to propose an interface that enables a **more efficient and more interpretable** reading of an ML notebook by combining:

- structured and guided navigation,
- synthetic analysis oriented toward artefacts and performance,
- notebook comparison,
- an opening toward methodological analysis (patterns / best practices).

## 9.2 Summary of contributions

The delivered work results in a demonstrable web prototype, centered on user experience, and organized around three complementary spaces.

- **Storytelling**: import of a `.ipynb` file directly in the browser, JSON parsing and conversion into an internal model (cells, sections, tokens). The interface restructures reading through section navigation and supports interactive code reading (cell-based view or grouped view) with contextual documentation.

- **Artefacts**: a synthetic notebook view structured along analysis dimensions (context/problem, performance/evaluation, produced artefacts, pedagogical validation), with a **comparison mode** for up to three notebooks. Persistent navigation and readability mechanisms (sections, quick access, code diff area) support analysis of long pages.

- **Patterns**: exploration of a best-practice catalogue with search/filter and visualizations (heatmaps, radar chart, hierarchy). In the current scope, patterns rely on **simulated data**, but the UI and data structures prepare future integration of real detection.

From a technical perspective, the application is **fully client-side** (React + TypeScript + Vite + Tailwind), depends on no remote services, and relies on local persistence (import history via `localStorage`) and in-memory caching to keep the Storytelling workspace responsive.

## 9.3 Project value

The main added value of Galileo is transforming a linear technical document into a structured, faster, and more exploitable reading and analysis experience—particularly adapted to pedagogical and comparative use cases.

- For a **teacher/supervisor**, it supports evaluation and comparison (reference vs student submission) by making key dimensions visible (performance, artefacts, global coherence) and reducing time spent “searching inside the notebook”.

- For a **student**, it provides a self-evaluation support: easier identification of expected elements, clearer understanding of workflow progression, and comparison across versions.

- For a **researcher/data scientist**, the prototype validates a product direction: making exploration more interpretable (navigation, coordinated views) and preparing a progression toward more automated analysis (pattern/anti-pattern detection, more robust artefact extraction, performance instrumentation).

Finally, even though some information is mocked in the current version, the project remains a strong proof of concept: it stabilizes the user journeys, the frontend architecture, and the visualization forms, reducing risk for the next steps (industrialization and progressive replacement of simulated data with real extraction/detection).
