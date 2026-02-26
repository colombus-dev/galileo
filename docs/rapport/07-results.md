# 7) Results obtained

## 7.1 Achieved objectives

A first concrete result of the project is demonstrating that a Jupyter notebook can be transformed into a more structured and more readable experience.

A classic notebook is a linear document: users scroll through code and text cells in order. Galileo shows that a clearer organization can be reconstructed from the content:

- section segmentation,
- code grouping,
- highlighting of important elements,
- simplified navigation.

This transformation improves understanding, especially when the notebook is long.

A second achieved objective is the implementation of guided code reading. Users can explore parts of a notebook without getting lost in continuous scrolling. This helps build a global mental model, even for users who are not experts.

The project also demonstrates that it is possible to provide an analysis-oriented view of a notebook: instead of only showing raw content, the application highlights key dimensions such as context, performance, and produced elements. This opens the door to more pedagogical and comparative reading.

Finally, the prototype validates that notebooks can be compared inside a single interface. Visual comparison is a significant contribution, especially for evaluating different versions of the same work.

Overall, the main promise—making a notebook more analyzable and more readable—is validated at the conceptual and ergonomic level.

## 7.2 Non-achieved or partially achieved objectives

Even though the interface works, important limitations appear when analyzing the project in depth.

First, a large share of the data used to feed visualizations is **mocked (simulated)**. This is not limited to patterns: other elements displayed in analysis views are also simulated.

In the current codebase, this is materialized by dedicated demo datasets, notably:

- [src/data/patternMockData.ts](../../src/data/patternMockData.ts) for the Patterns pages,
- [src/data/mockData.ts](../../src/data/mockData.ts) for Artefacts-oriented content (context cards, pedagogical validation checkpoints, sample artefacts, etc.),
- [src/mocks/docs.mock.ts](../../src/mocks/docs.mock.ts), [src/mocks/mockApi.ts](../../src/mocks/mockApi.ts), [src/mocks/notebook.mock.ts](../../src/mocks/notebook.mock.ts) for the Storytelling pages.

In other words, the interface demonstrates how information would be presented, but it does not guarantee that all those data can actually be extracted automatically from a raw notebook.

In practice, a `.ipynb` file does not always contain structured information in an exploitable form. Metrics may be printed in free text, outputs may be mixed with code, and some expected information may simply be absent. Therefore, it is not certain that the current visualizations can be fully rebuilt from real notebooks without additional advanced processing.

The automatic summary in Storytelling is also a limitation: it strongly relies on notebook structure, titles, and Markdown descriptions. If a notebook is poorly structured or lacks clear explanations, the summary becomes imprecise. The tool therefore depends on the writing quality of the initial notebook.

More broadly, the project depends on the heterogeneity of notebooks. Real notebooks can be:

- poorly organized,
- minimally commented,
- composed of disordered cells,
- structured without a clear logic.

This variability makes automatic analysis difficult and can degrade the user experience.

In addition, real pattern detection is a major challenge. Automatically identifying best practices (cross-validation, correct data splitting, etc.) requires fine-grained code analysis—either complex static rules or specialized ML models. This part is not implemented yet.

On persistence, imported notebooks are stored in browser local storage, but some intermediate transformations are kept in memory. A full page reload can interrupt the active workspace, even if the notebook remains available in history.

Finally, the lack of backend limits scalability (no central storage, no sharing between users, no large-scale analysis), and the testing strategy remains mostly manual. Compilation/build checks exist, but a complete automated coverage (unit, integration, end-to-end) has not been industrialized.

## 7.3 System performance

The system runs entirely in the user’s browser, without external servers. This simplifies usage, but means that all operations (reading files, transforming data, rendering views) depend on the user’s machine.

For medium-sized notebooks, the experience remains fluid: import and navigation do not show significant slowdowns.

However, very large notebooks or notebooks containing many visualizations can increase loading time and reduce responsiveness. Rendering time then directly depends on machine resources (memory, CPU).

## 7.4 Real project contributions

The main contribution of the project is demonstrating that a notebook can be treated as a structured and analyzable object—not only as a raw technical document.

Galileo shows it is possible to:

- improve notebook readability,
- facilitate exploration,
- provide a comparative view,
- introduce a qualitative analysis dimension.

The Storytelling workspace reduces cognitive load by providing a clear hierarchy and direct interaction with documentation. Users are no longer limited to linear scrolling: they can navigate, contextualize, and understand content more efficiently.

The Artefacts space introduces a structured evaluation dimension. It makes visible elements that are often implicit or dispersed in notebooks: performance, produced artefacts, and validation. The comparison mode is particularly significant because it objectifies differences between versions and supports pedagogical/technical analysis.

Finally, the Patterns page materializes a qualitative dimension. Even with mocked data, the product demonstrates how best-practice indicators could be integrated in a clear and usable interface.

Even with simulated data, the project validates the ergonomic and pedagogical interest of this direction. It provides a concrete proof of concept for what a more advanced notebook analysis tool could become. The delivered work is therefore a strong proof of concept, especially in terms of interface and user experience.
