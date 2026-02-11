import { ArtefactFilterKey, ArtefactFilterMenu } from "@/components/artefacts/ArtefactFilterMenu";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof ArtefactFilterMenu> = {
  title: "Artefacts/ArtefactFilterMenu",
  component: ArtefactFilterMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ArtefactFilterMenu>;

export const Default: Story = {
  render: () => {
    const [filter, setFilter] = useState<ArtefactFilterKey>("all");
    return <ArtefactFilterMenu value={filter} onChange={setFilter} />;
  },
};
