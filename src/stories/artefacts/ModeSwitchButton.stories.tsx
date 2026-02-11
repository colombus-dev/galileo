import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModeSwitchButton, ModeType } from "../../components/artefacts/ModeSwitchButton";

const meta: Meta<typeof ModeSwitchButton> = {
  title: "Artefacts/ModeSwitchButton",
  component: ModeSwitchButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ModeSwitchButton>;

export const Default: Story = {
  render: () => {
    const [mode, setMode] = useState<ModeType>("simple");
    return <ModeSwitchButton mode={mode} onChange={setMode} />;
  },
};
