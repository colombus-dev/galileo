import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { CommentBox } from "../components/CommentBox";

const meta: Meta<typeof CommentBox> = {
  title: "Galileo/CommentBox",
  component: CommentBox,
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
