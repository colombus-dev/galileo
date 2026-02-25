# 6) The final product

The product developed in this project is a web application named **Galileo**, whose objective is to facilitate the reading, analysis, and comparison of **Jupyter notebooks** in the `.ipynb` format.

A Jupyter notebook typically combines code, explanatory text, and execution outputs such as tables or plots. While notebooks are widely used in education and in data science, their **linear structure** can make them difficult to read and review—especially when the document is long or poorly structured.

The proposed prototype aims to transform a raw notebook into a more structured, analysable, and exploitable representation, especially in a pedagogical context.

The final prototype supports notebook import, automatic structuring, artefact exploration, multi-notebook comparison, and access to a library of best practices (“patterns”). The whole system runs **entirely in the browser**, with no server infrastructure.

## 6.1 Functional description

The application is organized around three main spaces: **Storytelling**, **Artefacts**, and **Patterns**. Together they support a progressive analysis workflow, from detailed reading to synthesis and methodological review.

### 6.1.1 Main features

#### Storytelling: import and structured reading

Storytelling is the entry point of the application. Users can import a `.ipynb` file. During import, the file is analyzed directly in the browser: its JSON content is parsed to extract cells, infer sections from Markdown headers, and identify code cells.

The imported notebook is then stored locally in the browser storage, so that it can be reused later without re-importing.

Once imported, the notebook is displayed in a structured workspace:

- section-based navigation inferred from headings,
- code cells readable individually or grouped,
- a side documentation panel that can display contextual information for selected tokens.

The goal is to transform a linear document into a guided and interactive reading experience.

#### Artefacts: analyze a notebook

Artefacts provides a more synthetic view. Rather than reading the full notebook, users access an analysis structured around four dimensions:

- context and problem statement,
- performance and evaluation,
- produced artefacts (models, datasets, metrics, visualizations),
- pedagogical validation.

This organization supports fast, evaluation-oriented review.

Artefacts supports:

- a **single-notebook mode**,
- a **comparison mode** for 2 or 3 notebooks.

Comparison is especially useful to compare different versions of a notebook or to compare a student submission with a reference solution.

#### Patterns: explore best practices

Patterns exposes a catalogue of best practices. Each pattern represents an identifiable practice in a notebook (e.g., cross-validation, train/test split).

Users can browse the library, search/filter entries, and open a detailed page for a given pattern.

In the current prototype scope, pattern presence is based on **simulated (mocked) data**, but the architecture is designed to allow future integration of real pattern detection.

### 6.1.2 User journey

A typical user journey is:

1. Import a notebook in Storytelling.
2. Explore the structure and sections.
3. Open Artefacts to review key elements.
4. Enable comparison if needed (2–3 notebooks).
5. Consult Patterns to deepen methodological review.

This flow guides users from detailed reading toward synthesis and comparison.

### 6.1.3 Usage scenarios

#### Teacher / supervisor

A teacher imports a student notebook to:

- verify expected metrics are present,
- inspect produced visualizations,
- compare with a reference notebook,
- identify methodological gaps.

#### Student

A student uses Galileo to:

- quickly check if the notebook includes required elements,
- identify missing parts (e.g., no adequate metrics),
- compare with a more advanced version.

#### Variant comparison

In an experimentation context, a user compares notebook variants to:

- measure the impact of changes,
- objectify performance differences,
- analyze structural evolution.

## 6.2 General architecture

The prototype is **fully client-side**:

- no backend infrastructure,
- no external API consumption,
- no dependency on remote services.

All operations (import, parsing, transformation, rendering) run directly in the browser.

This choice simplifies deployment, improves portability, and enabled fast iteration on UX.

### 6.2.1 Technology choices

The stack was selected to support autonomy and rapid UI iteration:

- React + TypeScript: interactive SPA, typed models (cells, sections, tokens)
- Tailwind CSS: consistent UI styling
- Vite: fast development server and optimized bundling
- Plotly + Recharts: interactive visualizations (heatmaps, comparative radar charts)
- Prism via react-syntax-highlighter: syntax-highlighted code panels and diffs
- localStorage: persistence of imported notebooks (history + current notebook)
- in-memory cache: accelerates the Storytelling workspace, with limitations on hard refresh

### 6.2.2 Layered organization

The architecture is organized into three functional layers:

- **Presentation layer**: React pages and components, navigation, interactions, visualization rendering
- **Processing layer**: notebook parsing, extraction of cells/sections/tokens, view-ready data preparation
- **Persistence layer**: local storage (localStorage) + in-memory caching for fast access

This organization is reflected in the repository structure:

- `src/pages/`: main routes and screen orchestration
- `src/components/`: reusable UI components (with `artefacts/`, `patterns/`, `storytelling/` subfolders)
- `src/hooks/`: import state, persistence, and UI state management
- `src/services/`: notebook parsing and processing
- `src/utils/`: shared utilities (diff, markdown rendering, mapping)
- `src/data/` and `src/mocks/`: demo data and simulated elements

### 6.2.3 Internal pipeline (import → parsing → views)

Notebook processing follows a client-side functional pipeline:

1. **Import**: file selection through the Notebook Importer UI.
2. **Processing**: read the file and parse JSON, convert to an internal model.
3. **Parsing and structuring**: extract Markdown and code cells, generate sections from headings, extract tokens from code.
4. **Persistence**:
   - store the raw notebook in localStorage through the import/history hook,
   - cache processed models in memory for fast Storytelling access.
5. **View generation**:
   - Storytelling: section-based workspace + interactive code + documentation panel
   - Artefacts: synthetic analysis + comparison mode + code/diff blocks
   - Patterns: mock pattern scores mapped to imported notebooks

### 6.2.4 Main modules

- **NotebookParser** (`src/services/notebookParser.ts`): JSON → internal model, section generation, token extraction
- **NotebookProcessor** (`src/services/notebookProcessor.ts`): import orchestration, memory caching, access to processed notebooks
- **Notebook history hook**: local persistence of notebook history and selected notebook
- **Storytelling workspace**: guided reading with summary/sections/code/documentation
- **Artefacts view**: synthetic analysis + comparison + code/diff visualization
- **Patterns pages**: pattern library browsing and detail view with charts
- **Contextual documentation**: token-based documentation display driven by code parsing

## 6.3 Tests and validation

Validation relied on a mix of technical checks and functional tests.

- Technical validation: TypeScript compilation to detect typing inconsistencies.
- Build validation: production build to ensure the app can be bundled without blocking errors.
- Static analysis: linting to detect style and potential issues.

In addition, manual functional tests were executed on the main scenarios:

- importing a notebook,
- navigating sections,
- enabling comparison,
- consulting patterns,
- verifying persistence.

Overall, the implemented functionality supports the intended core workflows: notebook import and persistence, automatic section structuring, comparison mode, and patterns visualization. The final product is therefore a proof of concept demonstrating the feasibility of a lightweight, autonomous, and extensible pedagogical notebook analysis interface.
