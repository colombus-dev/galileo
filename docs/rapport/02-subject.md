# 2) Problem statement & context

## 2.1 Problem statement

### 2.1.1 What is the problem?

The Galileo platform already provides several useful visualizations (heatmaps, node-link graphs, radar charts, small multiples) to analyze the structure of Machine Learning notebooks. However, these views remain largely independent and strongly code-centric.

They do not explicitly connect code to the produced artefacts (datasets, models, metrics, visualizations), and they do not provide a clear narrative or temporal representation of the workflow. As a result, users must mentally reconstruct the pipeline logic and the relationship between results and the code cells that produced them.

### 2.1.2 Why does it matter?

This limitation reduces the understanding of the experimental reasoning, the traceability of results, the ability to compare notebooks, and the overall interpretability of ML workflows.

The Galileo project aims to improve transparency, reproducibility, and the pedagogical/scientific value of notebook exploration by integrating multiple analytical dimensions into a unified and interactive interface.

### 2.1.3 Who is impacted?

The main audiences are teachers, students, and researchers who use the Colombus ecosystem to analyze, explain, compare, and understand ML workflows.

- Teachers need to evaluate the coherence of reasoning.
- Students need to better understand the impact of their code choices.
- Researchers need analysis/comparison tools at a larger scale.

## 2.2 Context

### 2.2.1 Technical context

Galileo is designed as an extension of Colombus and targets a rich, interactive, and traceable visualization interface. The technical architecture follows a modular approach with React on the frontend.

The initial plan included a backend, but it was de-scoped in order to focus on interface design and delivery. Key axes include artefact↔code traceability, patterns/anti-patterns analysis, and improving narrative understanding through storytelling.

### 2.2.2 Domain / usage context

The project addresses the need for more effective analysis and reporting on ML notebooks in pedagogical contexts (teaching, comparing student notebooks, explaining pipeline steps) and research contexts (practice analysis, structure/performance correlations, sharing interpretable analyses).

Our analysis of the existing Galileo interface also highlighted UX/UI opportunities, such as poorly connected views, limited narrative guidance, weak user feedback, and a fragmented cognitive journey.

## 2.3 Users

### 2.3.1 User profiles

We identified three target profiles:

1. Teachers, who use the platform as a pedagogical support to explain ML workflows.
2. Students, who want to understand and improve their notebook design practices.
3. Researchers, who analyze notebooks, identify recurring patterns, and compare workflows in an interpretable way.

### 2.3.2 Key needs

Recurring needs include: understanding pipeline logic, traceability between code and results, notebook comparison, visual/narrative guidance, and better integration of views.

Our initial analysis also emphasized needs around readability, visual hierarchy, contextual feedback, accessibility (contrast, keyboard, screen reader), and reducing cognitive load.

### 2.3.3 Main use cases

A central use case is a teacher analyzing student notebooks to evaluate the coherence of experimental reasoning, by visualizing artefacts (models, metrics, visualizations) linked to their source cells and by comparing pipelines.

Another use case is guided exploration via visual/narrative storytelling (timeline, transitions, annotations, contextual zooms) to follow the chronological sequence of steps and their impact.

On the research side, Galileo should also help identify patterns/anti-patterns and explore correlations between code structure, artefacts, and performance.

## 2.4 Scope

### 2.4.1 What the project covers

The project covers the design and implementation of an interactive visualization interface for exploring, interpreting, and reporting on ML notebook workflows in Galileo.

The functional scope includes the main axes:

- patterns influence on efficiency,
- bidirectional artefacts↔code linking,
- storytelling / workflow contextualization,
- integration of these dimensions in a coherent global visualization (unified dashboard).

### 2.4.2 What is intentionally excluded

The optional “sonar-like” quality diagnostics module is explicitly excluded from the core scope and placed in backlog if time does not allow a complete implementation.

### 2.4.3 Technical and time constraints

The project faces interface complexity constraints (risk of cognitive overload, harmonization across views), performance constraints (comparison of many notebooks, concurrent interactive visualizations), provenance extraction challenges (ambiguities and reproducibility of artefacts), and integration of heterogeneous modules.

From a time perspective, the plan includes a preparation phase followed by a full-time phase in February, with a tight sequence of deliverables (stable backend baseline, functional prototype, full integration, poster, final report, demo video), which shaped what could be implemented.
