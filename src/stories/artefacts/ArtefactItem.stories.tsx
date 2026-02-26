import { ArtefactItem } from "@/components/artefacts/ArtefactItem";
import { mockNotebooks } from "@/data/mockData";
import type { Meta, StoryObj } from "@storybook/react";


const meta: Meta<typeof ArtefactItem> = {
  title: "Artefacts/ArtefactItem",
  component: ArtefactItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ArtefactItem>;

const notebook = mockNotebooks[0];
const dataset = notebook.artifacts.find((a) => a.type === "dataset");
const model = notebook.artifacts.find((a) => a.type === "model");
const metric = notebook.artifacts.find((a) => a.type === "metric");
const visualization = notebook.artifacts.find((a) => a.type === "visualization");

if (!dataset || !model || !metric || !visualization) {
  throw new Error("ArtefactItem stories require dataset/model/metric/visualization in mockNotebooks[0].");
}

export const DonneesBrutes: Story = {
  args: {
    artifact: dataset,
    selected: false,
    onClick: () => {},
  },
  render: (args) => (
    <div className="w-[360px] h-[400px]">
      <ArtefactItem {...args} />
    </div>
  ),
};

export const Selectionne: Story = {
  args: {
    artifact: visualization,
    selected: true,
    onClick: () => {},
  },
  render: (args) => (
    <div className="w-[360px] h-[400px]">
      <ArtefactItem {...args} />
    </div>
  ),
};

export const Modele: Story = {
  args: {
    artifact: model,
    selected: false,
    onClick: () => {},
  },
  render: (args) => (
    <div className="w-[360px] h-[400px]">
      <ArtefactItem {...args} />
    </div>
  ),
};

export const Metrique: Story = {
  args: {
    artifact: metric,
    selected: false,
    onClick: () => {},
  },
  render: (args) => (
    <div className="w-[360px] h-[400px]">
      <ArtefactItem {...args} />
    </div>
  ),
};
