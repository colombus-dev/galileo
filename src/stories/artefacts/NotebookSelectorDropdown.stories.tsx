import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NotebookSelectorDropdown } from "../../components/NotebookSelectorDropdown";

const meta: Meta<typeof NotebookSelectorDropdown> = {
  title: "Artefacts/NotebookSelectorDropdown",
  component: NotebookSelectorDropdown,
};

export default meta;
type Story = StoryObj<typeof NotebookSelectorDropdown>;

const options = [
  {
    id: "marie",
    user: "Marie Dupont",
    project: "Diagnostic de pneumonie (radiographie)",
    domain: "Médecine",
    problem: "Classification binaire",
  },
  {
    id: "lucas",
    user: "Lucas Martin",
    project: "Analyse de lettres anciennes",
    domain: "Histoire",
    problem: "Classification multi-classes",
  },
  {
    id: "sophie",
    user: "Sophie Rousseau",
    project: "Classification de fleurs Iris",
    domain: "Botanique",
    problem: "Classification multi-classes",
  },
];

export const Simple: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["lucas"]);
    return (
      <NotebookSelectorDropdown
        options={options}
        selected={selected}
        onChange={setSelected}
        multiple={false}
      />
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["marie", "lucas"]);
    return (
      <NotebookSelectorDropdown
        options={options}
        selected={selected}
        onChange={setSelected}
        multiple={true}
      />
    );
  },
};
