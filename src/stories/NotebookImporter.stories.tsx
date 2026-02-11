import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { NotebookImporter } from "../components/NotebookImporter";

const meta: Meta<typeof NotebookImporter> = {
  title: "Galileo/NotebookImporter",
  component: NotebookImporter,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  argTypes: {
    onConfirm: { action: "confirm" },
    onError: { action: "error" },
  },
};
export default meta;

type Story = StoryObj<typeof NotebookImporter>;

export const Default: Story = {
  args: {
    showPreview: true,
  },
  render: (args) => (
    <div className="w-[760px]">
      <NotebookImporter {...args} />
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => {
    const [status, setStatus] = useState("—");

    return (
      <div className="w-[760px] space-y-3">
        <NotebookImporter
          showPreview
          onConfirm={({ file }) => setStatus(`Import validé: ${file.name}`)}
          onError={({ message }) => setStatus(`Erreur: ${message}`)}
        />
        <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800">
          Statut: <span className="font-medium">{status}</span>
        </div>
      </div>
    );
  },
};
