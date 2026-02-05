import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NotebookSelectorDropdown, NotebookOption } from "../../components/NotebookSelectorDropdown";

const meta: Meta<typeof NotebookSelectorDropdown> = {
  title: "Artefacts/NotebookSelectorDropdown",
  component: NotebookSelectorDropdown,
};

export default meta;
type Story = StoryObj<typeof NotebookSelectorDropdown>;

const options: NotebookOption[] = [
  { id: "marie", user: "Marie Dupont", project: "Classification de fleurs Iris" },
  { id: "lucas", user: "Lucas Martin", project: "Classification de fleurs Iris" },
  { id: "sophie", user: "Sophie Rousseau", project: "Classification de fleurs Iris" },
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
