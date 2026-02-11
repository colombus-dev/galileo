import { ComparisonSummaryCard } from "@/components/artefacts/ComparisonSummaryCard";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ComparisonSummaryCard> = {
  title: "Artefacts/ComparisonSummaryCard",
  component: ComparisonSummaryCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ComparisonSummaryCard>;

export const Commun: Story = {
  args: {
    title: "Artefacts communs",
    count: 3,
    items: ["Données brutes", "Données nettoyées", "Accuracy"],
    color: "green",
  },
};

export const UniquementMarie: Story = {
  args: {
    title: "Uniquement - Marie Dupont",
    count: 4,
    items: [
      "Distribution des features",
      "Random Forest",
      "Confusion Matrix",
      "+1 autres",
    ],
    color: "blue",
  },
};

export const UniquementLucas: Story = {
  args: {
    title: "Uniquement - Lucas Martin",
    count: 4,
    items: [
      "Decision Tree",
      "Graphique de précision",
      "Diagramme à barres",
      "+1 autres",
    ],
    color: "purple",
  },
};
