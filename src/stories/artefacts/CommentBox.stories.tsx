import { CommentBox } from "@/components/artefacts/CommentBox";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof CommentBox> = {
  title: "Artefacts/CommentBox",
  component: CommentBox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof CommentBox>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <CommentBox
        value={value}
        onChange={setValue}
        label="Commentaires sur cet artefact"
        placeholder="Ajouter un commentaire sur cet artefact..."
      />
    );
  },
};
