import { Artifact } from '../data/mockData';
import { BarChart3, Activity, Brain, Code2, Database } from 'lucide-react';
import { ArtifactVisualization } from './ArtifactVisualization';

interface ArtefactItemProps {
  artifact: Artifact;
  selected?: boolean;
  onClick?: () => void;
}

const artifactConfig: Record<Artifact['type'], {
  icon: typeof BarChart3;
  bgColor: string;
  borderColor: string;
  iconBg: string;
  iconColor: string;
  selectedBorder: string;
}> = {
  dataset: {
    icon: Database,
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    selectedBorder: 'border-blue-600'
  },
  model: {
    icon: Brain,
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    selectedBorder: 'border-purple-600'
  },
  visualization: {
    icon: BarChart3,
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    selectedBorder: 'border-green-600'
  },
  metric: {
    icon: Activity,
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    selectedBorder: 'border-orange-600'
  }
};

export function ArtefactItem({ artifact, selected = false, onClick }: ArtefactItemProps) {
  const config = artifactConfig[artifact.type];
  const Icon = config.icon;

  return (
    <button
      onClick={onClick}
      className={`w-full h-full text-left rounded-xl border-2 transition-all overflow-hidden flex flex-col ${
        selected
          ? `${config.selectedBorder} shadow-lg scale-[1.02]`
          : `${config.borderColor} hover:shadow-md hover:scale-[1.01]`
      }`}
    >
      {/* Header */}
      <div className={`p-4 ${config.bgColor} flex-shrink-0`}>
        <div className="flex items-start gap-3">
          <div className={`w-10 h-10 rounded-lg ${config.iconBg} flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-5 h-5 ${config.iconColor}`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-slate-900 truncate">{artifact.name}</h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white rounded text-xs text-slate-600 border border-slate-200 flex-shrink-0">
                <Code2 className="w-3 h-3" />
                Cell {artifact.cellIndex}
              </span>
            </div>
            
            <p className="text-sm text-slate-600 line-clamp-2">{artifact.description}</p>
            
            <ArtifactBadges artifact={artifact} />
          </div>
        </div>
      </div>

      {/* Integrated Visualization */}
      <div className="bg-white flex-1 overflow-hidden">
        <ArtifactVisualization artifact={artifact} />
      </div>
    </button>
  );
}

function ArtifactBadges({ artifact }: { artifact: Artifact }) {
  const badges: string[] = [];

  if (artifact.type === 'dataset') {
    const samples = artifact.metadata?.samples;
    const features = artifact.metadata?.features;
    if (typeof samples === 'number') badges.push(`${samples} échantillons`);
    if (typeof features === 'number') badges.push(`${features} features`);
  }

  if (artifact.type === 'model') {
    const modelType = artifact.metadata?.modelType;
    if (modelType) badges.push(modelType);
  }

  if (artifact.type === 'metric') {
    const metric = artifact.metadata?.metric;
    const value = artifact.metadata?.value;
    if (metric && typeof value === 'number') badges.push(`${metric}: ${value.toFixed(2)}`);
    else if (metric) badges.push(metric);
  }

  if (artifact.className) {
    badges.push(artifact.className);
  }

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {badges.map((label) => (
        <span
          key={label}
          className="inline-flex items-center px-2 py-1 bg-white rounded text-xs text-slate-700 border border-slate-200"
        >
          {label}
        </span>
      ))}
    </div>
  );
}