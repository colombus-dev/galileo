import type { Meta, StoryObj } from "@storybook/react";
import { ArtefactItem } from "../components/ArtefactItem";

const meta: Meta<typeof ArtefactItem> = {
  title: "Galileo/ArtefactItem",
  component: ArtefactItem,
};

export default meta;
type Story = StoryObj<typeof ArtefactItem>;

export const DonneesBrutes: Story = {
  args: {
    name: "Données brutes",
    type: "data",
    cellIndex: 0,
    description: "Chargement du dataset Iris",
    metadata: [
      { label: "150 échantillons" },
      { label: "4 features" },
    ],
  },
};

export const Selectionne: Story = {
  args: {
    ...DonneesBrutes.args,
    selected: true,
  },
};

export const Modele: Story = {
  args: {
    name: "Random Forest",
    type: "model",
    cellIndex: 3,
    description: "Entraînement du modèle",
    metadata: [{ label: "RandomForestClassifier" }],
  },
};

export const Metrique: Story = {
  args: {
    name: "Accuracy",
    type: "metric",
    cellIndex: 4,
    metadata: [{ label: "accuracy: 0.96" }],
  },
};