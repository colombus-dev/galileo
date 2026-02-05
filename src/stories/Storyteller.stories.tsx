import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Storyteller } from "../components/Storyteller";

const meta: Meta<typeof Storyteller> = {
  title: "Components/Storyteller",
  component: Storyteller,
  tags: ["autodocs"],
  args: {
    title: "Aperçu des performances",
    paragraph:
      "Cette section présente les indicateurs clés et explique leur objectif. Elle aide à comprendre ce que vous allez analyser ensuite.",
    as: "h2",
    variant: "plain",
    tone: "default",
    size: "md",
    align: "left",
    maxWidth: 720,
  },
  argTypes: {
    as: { control: "inline-radio", options: ["h1", "h2", "h3", "h4"] },
    variant: { control: "inline-radio", options: ["plain", "panel", "card"] },
    tone: { control: "inline-radio", options: ["default", "subtle", "muted", "brand"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    align: { control: "inline-radio", options: ["left", "center"] },
    maxWidth: { control: "text" },
    eyebrow: { control: "text" },
    helper: { control: "text" },
    meta: { control: "text" },
    showDivider: { control: "boolean" },
    actions: { control: false },
    icon: { control: false },
    className: { control: "text" },
    style: { control: false },
    id: { control: "text" },
  },
};

export default meta;

type Story = StoryObj<typeof Storyteller>;

export const Plain: Story = {};

export const Panel: Story = {
  args: { variant: "panel", eyebrow: "Section", meta: "Mis à jour aujourd’hui", showDivider: true },
};

export const CardCentered: Story = {
  args: {
    variant: "card",
    align: "center",
    tone: "muted",
    size: "lg",
    eyebrow: "Vue d’ensemble",
    helper: "Astuce : comparez avec la période précédente pour mieux interpréter l’évolution.",
  },
};

export const WithActions: Story = {
  args: {
    variant: "panel",
    eyebrow: "Contexte",
    meta: "Source : produit",
    actions: (
      <div style={{ display: "flex", gap: 8 }}>
        <button style={{ padding: "6px 10px", borderRadius: 10, border: "1px solid #e2e8f0" }}>
          Exporter
        </button>
        <button style={{ padding: "6px 10px", borderRadius: 10, border: "1px solid #e2e8f0" }}>
          Détails
        </button>
      </div>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    variant: "panel",
    tone: "subtle",
    eyebrow: "Graphique",
    icon: (
      <span
        style={{
          width: 18,
          height: 18,
          display: "inline-flex",
          borderRadius: 6,
          border: "1px solid #e2e8f0",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 12,
        }}
      >
        i
      </span>
    ),
  },
};