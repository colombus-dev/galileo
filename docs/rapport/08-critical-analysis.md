# 8) Critical analysis & hindsight

The project was carried out with a strong “product” and “user experience” orientation, while integrating feedback from several interviews with data scientists, researchers, and teachers.

These exchanges helped refine directions, but also revealed deeper challenges related to real notebook analysis.

## 8.1 What worked well

A major success factor was the user-journey approach. Galileo does not merely display a notebook: it organizes the experience around three coherent spaces (Storytelling, Artefacts, Patterns). This structure makes the tool easier to understand—even for first-time users.

Interviews confirmed a key point: raw notebook reading is often difficult, even for experts. Segmenting content into sections and improving navigation was perceived as relevant, confirming that the addressed problem is real.

The Storytelling workspace is particularly strong ergonomically. The three-zone organization (sections, content, documentation) makes exploration smoother. The ability to read code cell-by-cell or as a single script matches natural ways of working.

In Artefacts, the ability to compare multiple notebooks was identified as valuable in pedagogical contexts. Teachers expressed interest in quickly comparing a student version with a reference.

Finally, the Patterns page—despite simulated data—validates a strong idea: users appreciate a synthetic and structured view of best practices. The visualizations (rankings, radar chart, hierarchy) make that dimension concrete.

## 8.2 What could have been improved

The main weakness concerns the gap between the interface and real data.

A significant part of the displayed information is based on mocked data. This enabled rapid prototyping and UI stabilization, but it creates a mismatch: the tool appears capable of extracting many insights, while in practice not all of them are directly recoverable from a raw notebook.

Interviews also emphasized notebook heterogeneity. Some notebooks are well structured, others are not; some contain clear explanations, others almost none. This makes extraction much more complex than initially expected.

The Storytelling summary works well when a notebook is well organized (titles + Markdown descriptions). When the document is poorly structured, the summary becomes fragile.

Similarly, some artefacts (metrics, results, cell organization) are hard to detect automatically because they can appear in many forms.

Finally, real pattern detection is much more complex than what the current interface suggests: automatically verifying a best practice requires fine, sometimes contextual, code understanding.

## 8.3 What we would do differently

If restarting the project, several adjustments would be made.

First, we would validate earlier and more rigorously what can truly be extracted automatically from notebooks and with what reliability, before designing too many dependent visualizations.

Second, we would separate the analysis layer (extraction, detection, scoring) more strictly from the UI layer, so robustness can be tested independently.

Third, we would integrate a more diverse notebook dataset earlier (well structured, poorly structured, minimal, large) to stress-test assumptions.

Finally, we would introduce automated tests earlier, especially for extraction and transformation functions.

## 8.4 Methodological limitations

User tests and interviews were qualitative and exploratory. They provided useful feedback on ergonomics and perceived value, but the limited number of participants prevents strong generalization. Results should be interpreted cautiously due to possible biases (context, participant profiles).

Mocked data also limits the analytical scope: visualizations show what could be displayed but do not yet guarantee reliable outputs for arbitrary real notebooks.

Functional validation was mostly manual. While key scenarios were tested, the lack of comprehensive automated tests reduces the demonstrable stability over the long term.

## 8.5 Difficulties encountered

### 8.5.1 Technical issues

A major technical challenge was notebook variability. Two notebooks can target a similar outcome while being structured very differently (sections, writing style, amount of detail, presence/absence of Markdown, cell ordering). This heterogeneity complicated parsing, information extraction, and comparison.

A second challenge was defining a data contract that covers UI needs (Storytelling, Artefacts, comparison). Stabilizing a contract was difficult because some expected information is not always available in a raw notebook.

In particular:

- extracting outputs (metrics, plots, results) is difficult when they are missing or when execution is required,
- extracting execution dependencies can be ambiguous.

Notebook comparison also raised challenges. It is not only about comparing content, but aligning notebooks that do not share the same section structure while remaining methodologically comparable.

For code diffs, an initial approach using a dedicated library (react-diff-viewer) was tested, but the rendering felt too similar to a Git interface and did not match our pedagogical goals. A specific implementation was therefore built, with a strong readability constraint to avoid overwhelming users with irrelevant differences.

Dynamic documentation was also difficult to stabilize. It relies on regex-based detection of “documentable” terms. On full notebooks, this implies scanning large amounts of text and dealing with edge cases where regexes behave unexpectedly. Characters such as `.` introduced additional complexity. This led to false positives/negatives and made maintenance harder when new cases appeared.

Finally, we encountered UI overlay (z-index) issues, especially when multiple complex components interacted in the layout (panels, dynamic code rendering, Artefacts overlays). These issues were not only visual: they sometimes masked interactions or important content.

### 8.5.2 Organizational issues

A recurring organizational difficulty was late decision-making when choosing between technical quality, data precision, and prototype demonstrability.

The axis-based split (Storytelling / Artefacts / Patterns) accelerated progress, but also introduced small UX differences that required harmonization during integration.

Another challenge was balancing realistic data extraction against product progress: mocking enabled fast iteration, but also impacted the final “truthfulness” of some screens.

### 8.5.3 Solutions applied

To address these issues, we established an explicit data contract, with fallbacks where needed. This stabilized UI development despite notebook heterogeneity and clarified what was real vs simulated.

For comparison and readability, we prioritized targeted UI refactors rather than integrating standard components. For example, the code diff view was re-implemented to better match our use case.

For dynamic documentation, parsing rules and regexes were progressively adjusted. This improved behavior without claiming full industrial robustness.

For overlay issues, layout refactors were applied to better control stacking and reduce conflicts between interactive areas.

On organizational constraints, we clarified scope and accepted explicit trade-offs: frontend-first priority, a demonstrable prototype, and consciously accepted compromises (mock data, partial case coverage, non-industrial solutions).

## 8.6 Skills acquired

The project developed technical, methodological, and product skills.

Technically, it strengthened our mastery of a modern web application: frontend architecture, state management, code structuring, and interactive visualization integration.

It also involved reading/parsing real formats such as `.ipynb` notebooks and working with mocked data to simulate complex flows.

Methodologically, it included qualitative interviews and user tests, analysis of feedback, and iterative adaptation of product choices.

From a product perspective, it strengthened our user-centered design practice: information structuring, clear and synchronized navigation, interactive components design, and handling of complex content readability.

## 8.7 Future work

Future directions can be structured at multiple levels.

### 8.7.1 Short-term improvements

- Strengthen robustness of real data extraction.
- Improve artefact detection and summary generation.
- Better handle poorly structured notebooks.
- Instrument performance (processing time, notebook size) to quantify current limits.

### 8.7.2 Functional extensions

- Generate an exportable analysis report (PDF or Markdown).
- Add explicit completeness/quality indicators.
- Visualize real notebook content associated with patterns.
- Compare artefacts and patterns across notebooks.

### 8.7.3 Technical optimizations

- More robust persistence (e.g., IndexedDB for large data).
- Split heavy processing (e.g., Web Workers).
- More efficient rendering strategies for very large notebooks.

### 8.7.4 Potential industrialization

If Galileo evolves into a durable product, key steps would include:

- implementing a backend to store and analyze notebooks,
- securing data,
- full automated testing,
- deployment and continuous maintenance.

### 8.7.5 Accessibility

#### Preliminary analysis (design review)

Even though none of the user tests specifically targeted accessibility, several design choices were made in that direction after a preliminary analysis of the platform available before the project described in this report.

#### Choices already made

- **Colorblind-friendly palette** adopted early based on the initial platform analysis.
- **Reduced reliance on color alone**: introducing alternatives (e.g., shapes, labels, visual variations) so information is not conveyed only through color codes.
- **Limited animations**: movements and transitions kept to a minimum to reduce visual overload and improve comfort.

#### Current limitations

- The conducted user tests did not evaluate accessibility (no dedicated protocol and no participants relying on assistive technologies).
- The impact of non-mouse interactions (keyboard navigation, focus management, tab order) has not been measured.
- Usability with screen readers has not been evaluated (text alternatives, semantic structure, ARIA, etc.).

#### Proposed improvements

- Run a targeted **RGAA-inspired evaluation** (contrast ratios, text size/hierarchy, visible focus, interaction consistency).
- Make the product fully **keyboard-usable** (main actions accessible without hover, optional shortcuts, clear focus management).
- Provide **accessible alternatives** to visualizations (summary tables, textual summaries, and structured descriptions of charts for screen readers).
- Add dedicated testing (NVDA/VoiceOver + keyboard-only journeys) with a small set of concerned users, to prioritize the most impactful fixes.

#### Justification

Delivering full accessibility within the available time was not feasible, so comprehensive accessibility work was deliberately kept in backlog.
