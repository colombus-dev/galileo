import type { Meta, StoryObj } from "@storybook/react";
import { MdShowChart, MdBarChart } from "react-icons/md";
import { ResultCard } from "../components/ResultCard";

const meta: Meta<typeof ResultCard> = {
  title: "Galileo/ResultCard",
  component: ResultCard,
};

export default meta;
type Story = StoryObj<typeof ResultCard>;

// Exemple de matrice de confusion
const matrix = [
  [10, 0, 0],
  [0, 9, 1],
  [0, 0, 10],
];

const ConfusionMatrix = () => (
  <div className="grid grid-cols-3 gap-3 w-fit mx-auto">
    {matrix.flat().map((v, i) => (
      <div
        key={i}
        className={`w-20 h-20 flex items-center justify-center rounded-lg font-semibold text-lg transition
          ${v === 0 ? "bg-slate-50 text-slate-400" : v === 1 ? "bg-green-200 text-green-900" : "bg-green-600 text-white"}`}
      >
        {v}
      </div>
    ))}
  </div>
);

export const ConfusionMatrixCard: Story = {
  args: {
    icon: <MdBarChart className="text-green-500" />,
    title: "Matrice de confusion",
    children: <ConfusionMatrix />,
  },
};

// Exemple de carte de métrique
const MetricCircle = ({ percent, value }: { percent: number; value: number }) => (
  <div className="flex flex-col items-center justify-center py-6">
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r="40" stroke="#eee" strokeWidth="10" fill="none" />
      <circle
        cx="50"
        cy="50"
        r="40"
        stroke="#ff7300"
        strokeWidth="10"
        fill="none"
        strokeDasharray={2 * Math.PI * 40}
        strokeDashoffset={2 * Math.PI * 40 * (1 - percent / 100)}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.5s" }}
      />
      <text x="50" y="56" textAnchor="middle" fontSize="28" fill="#ff7300" fontWeight="bold">
        {percent}%
      </text>
    </svg>
    <div className="text-slate-400 text-lg mt-2">{value.toFixed(3)}</div>
  </div>
);

export const MetricCard: Story = {
  args: {
    icon: <MdShowChart className="text-orange-500" />,
    title: "Accuracy",
    children: <MetricCircle percent={96} value={0.96} />,
  },
};
