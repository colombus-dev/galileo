# 4) State of the art & positioning

## 4.1 Existing solutions

### 4.1.1 Existing tools

The state of the art shows that powerful tools exist, but each one covers only part of the need.

On one side, **experiment tracking tools** (platforms that track runs, metrics, and artefacts) are effective for centralizing results, comparing executions, and visualizing performance. They support experimental reproducibility, but they are generally run-centric and not designed for detailed notebook reading, cell by cell.

On another side, **pipeline-oriented tools** (DAG visualization, data versioning, orchestration) provide a good macro-level view of workflow steps. They are relevant when a pipeline is formalized, but less suited to exploratory, non-linear, evolving Jupyter notebooks.

Finally, **visual analytics / storytelling tools** and **coordinated views** provide interesting UX principles (navigation, contextualization, transitions, progressive disclosure) but are not specifically designed for pedagogical ML notebook analysis.

### 4.1.2 Similar projects

We observed three broad families of related work:

1. **Traceability and provenance**: linking data, transformations, results, and executions. These approaches match our conceptual needs by making implicit dependencies visible.
2. **Notebook structural visualization**: extracting notebook structure, dependency graphs, categorizing ML steps, comparing notebooks.
3. **Qualitative analysis tools**: patterns / best practices / code quality diagnostics, sometimes “sonar-like”. They are interesting pedagogically, but do not, alone, provide a narrative or guided reading.

Our conclusion is that none of the observed projects combines, in a single usage-oriented interface, structured reading, artefact↔code traceability, comparison, and a pedagogical view of an ML notebook.

### 4.1.3 Scientific literature

Scientific work was primarily useful to understand what can be automated:

- extracting notebook structures,
- dependencies between cells,
- identification of pipeline steps,
- provenance tracking,
- large-scale notebook analysis.

These contributions support the project foundations by showing that it is possible to go beyond linear notebook reading. However, they are often focused on extraction/classification/graph analysis rather than on delivering a finalized interactive interface for daily pedagogical use.

In other words, the state of the art provided conceptual and technical building blocks, but not a directly transferable solution.

## 4.2 Comparison and limitations

### 4.2.1 Comparison criteria

We use the following criteria to position Galileo:

- **Granularity**: run/pipeline/file vs cell/section/artefact.
- **Pedagogical usability**: supporting teachers/students vs pure engineering workflows.
- **Integration**: separate views vs an explicit user journey.
- **Interactivity**: navigation, comparison, contextual documentation.

### 4.2.2 Limitations of existing solutions

Existing solutions show several gaps relative to our needs:

- **Granularity mismatch**: many tools operate at run/pipeline/file level, while we need cell/artefact/narrative reading.
- **Usage mismatch**: orchestration and technical traceability do not necessarily help users quickly understand a notebook.
- **UX fragmentation**: several approaches cover one dimension well but remain separate views with no coherent user journey.

Many tools also assume a more industrial context (explicit pipelines, prior instrumentation, dedicated backend), while our prototype was built under time constraints and focused on validating UX value through a frontend-first approach.

### 4.2.3 Specific contribution of our solution

Galileo provides a notebook reading and analysis interface designed primarily for **pedagogical and exploratory usage**, combining multiple inspirations without depending on a single paradigm.

Concretely, it provides:

- structured notebook reading (Storytelling),
- a synthetic analysis view oriented towards artefacts / performance / validation (Artefacts),
- a qualitative dimension around best practices (Patterns),
- multi-notebook comparison in one environment.

The fully client-side architecture is not only a constraint: it also enabled a fast validation of the ergonomic and functional value before investing in a heavier backend analysis pipeline.

## 4.3 Positioning

### 4.3.1 Is it an innovation?

The project is not a “disruptive innovation” in the sense of inventing a new theoretical paradigm for notebook analysis. However, it proposes an original combination of dimensions that are rarely integrated into one product: narrative, structured reading, artefact-oriented analysis, comparison, and patterns.

The innovation is primarily in UX/UI integration and usage positioning rather than in a novel algorithm.

### 4.3.2 Is it an improvement?

Yes. Galileo clearly improves on raw notebook reading and on fragmented approaches by improving readability, navigation, contextualization, and the ability to compare notebooks in a more coherent interface.

It also improves conceptual accessibility for users who are not advanced data science experts, especially in pedagogical contexts.

### 4.3.3 Is it an adaptation?

Yes. It is also a targeted adaptation of existing building blocks to a specific context: pedagogical and exploratory ML notebook analysis.

We reused principles from tracking, provenance, dependency graphs, storytelling, and coordinated views, and adapted them to our scope, DOW, and time constraints.

This positioning also explains our final trade-offs: frontend-first delivery, validation of usage value, and a coherent prototype rather than full industrialization.
