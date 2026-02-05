import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { ModeSwitchButton, ModeType } from "../components/ModeSwitchButton";

const meta: Meta<typeof ModeSwitchButton> = {
  title: "Galileo/ModeSwitchButton",
  component: ModeSwitchButton,
};

export default meta;
type Story = StoryObj<typeof ModeSwitchButton>;

export const Default: Story = {
  render: () => {
    const [mode, setMode] = useState<ModeType>("simple");
    return <ModeSwitchButton mode={mode} onChange={setMode} />;
  },
};
