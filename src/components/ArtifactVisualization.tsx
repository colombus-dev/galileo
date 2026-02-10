import { Artifact } from '../data/mockData';
import { Database, Brain } from 'lucide-react';
import { resolveImageSrc } from '@/utils/imageSrc';

interface ArtifactVisualizationProps {
  artifact: Artifact;
  compact?: boolean;
}

export function ArtifactVisualization({ artifact, compact = false }: ArtifactVisualizationProps) {
  const hasPreviews = (artifact.previewUrls?.length ?? 0) > 0;

  const renderVisualization = () => {
    if (artifact.type === 'metric') {
      return <MetricVisualization artifact={artifact} compact={compact} />;
    }

    if (artifact.type === 'visualization') {
      return <PreviewVisualization artifact={artifact} compact={compact} />;
    }

    if (hasPreviews) {
      return <PreviewVisualization artifact={artifact} compact={compact} />;
    }

    switch (artifact.type) {
      case 'dataset':
        return <DatasetVisualization artifact={artifact} compact={compact} />;
      case 'model':
        return <ModelVisualization artifact={artifact} compact={compact} />;
      default:
        return null;
    }
  };

  return (
    <div className={`${compact ? '' : 'bg-white overflow-hidden'}`}>
      {renderVisualization()}
    </div>
  );
}

function PreviewVisualization({
  artifact,
  compact
}: {
  artifact: Artifact;
  compact: boolean;
}) {
  const urls = artifact.previewUrls ?? [];
  const displayUrls = (compact ? urls.slice(0, 1) : urls.slice(0, 4)).filter(Boolean);
  const displaySrcs = displayUrls
    .map((value, index) =>
      resolveImageSrc(value, artifact.previewMimeTypes?.[index] ?? artifact.previewMimeType)
    )
    .filter(Boolean) as string[];

  const outerPadding = compact ? 'p-2' : 'p-4';
  const minHeight = compact ? 'min-h-[140px]' : 'min-h-[220px]';

  if (displaySrcs.length <= 1) {
    const src = displaySrcs[0];
    return (
      <div className={`${outerPadding} ${minHeight} h-full`}> 
        <div className="h-full w-full rounded-lg border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center">
          {src ? (
            <img
              src={src}
              alt={`Prévisualisation: ${artifact.name}`}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          ) : (
            <div className="text-xs text-slate-500">Aperçu indisponible</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={`${outerPadding} ${minHeight} h-full`}>
      <div className="grid grid-cols-2 gap-2 h-full">
        {displaySrcs.map((src, index) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: stable previews; URLs are not guaranteed unique
            key={`${src}-${index}`}
            className="rounded-lg border border-slate-200 bg-slate-50 overflow-hidden flex items-center justify-center"
          >
            <img
              src={src}
              alt={`Prévisualisation ${index + 1}: ${artifact.name}`}
              className="w-full h-full object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function MetricVisualization({ artifact, compact }: { artifact: Artifact; compact: boolean }) {
  const value = artifact.metadata?.value || 0;
  const percentage = value * 100;

  return (
    <div className={compact ? 'p-3' : 'p-6'}>
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-center">
        <div className="relative inline-flex">
          <svg className="w-24 h-24 transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-slate-100"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${2 * Math.PI * 40 * (1 - value)}`}
              className="text-orange-500"
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl text-slate-900">{percentage.toFixed(0)}%</span>
          </div>
        </div>
        <p className="text-sm text-slate-600 mt-2">{value.toFixed(3)}</p>
      </div>
    </div>
  );
}

function DatasetVisualization({ artifact, compact }: { artifact: Artifact; compact: boolean }) {
  const samples = artifact.metadata?.samples || 0;
  const features = artifact.metadata?.features || 0;

  return (
    <div className={compact ? 'p-3' : 'p-6'}>
      <div className="flex items-center gap-2 mb-3">
        <Database className="w-4 h-4 text-blue-600" />
        <span className="text-sm text-slate-900">Aperçu des données</span>
      </div>
      <div className="overflow-hidden rounded border border-slate-200">
        <table className="w-full text-xs">
          <thead className="bg-slate-50">
            <tr>
              {Array.from({ length: Math.min(features, 4) }).map((_, i) => (
                <th key={i} className="px-2 py-1 text-left text-slate-600">
                  F{i + 1}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {Array.from({ length: compact ? 3 : 5 }).map((_, i) => (
              <tr key={i} className="border-t border-slate-100">
                {Array.from({ length: Math.min(features, 4) }).map((_, j) => (
                  <td key={j} className="px-2 py-1 text-slate-700">
                    {(Math.random() * 10).toFixed(2)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-2 flex gap-3 text-xs text-slate-600">
        <span>{samples} lignes</span>
        <span>•</span>
        <span>{features} colonnes</span>
      </div>
    </div>
  );
}

function ModelVisualization({ artifact, compact }: { artifact: Artifact; compact: boolean }) {
  const modelType = artifact.metadata?.modelType || 'Model';

  return (
    <div className={compact ? 'p-3' : 'p-6'}>
      <div className="flex items-center gap-2 mb-3">
        <Brain className="w-4 h-4 text-purple-600" />
        <span className="text-sm text-slate-900">Architecture du modèle</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <div className="w-full bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
          <div className="text-xs text-purple-600 mb-1">Input Layer</div>
          <div className="text-sm text-purple-900">{artifact.metadata?.features || 4} features</div>
        </div>
        <div className="w-1 h-3 bg-purple-300 rounded" />
        <div className="w-full bg-purple-100 border border-purple-300 rounded-lg p-3 text-center">
          <div className="text-xs text-purple-700 mb-1">{modelType}</div>
          <div className="text-sm text-purple-900">Hidden Layers</div>
        </div>
        <div className="w-1 h-3 bg-purple-300 rounded" />
        <div className="w-full bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
          <div className="text-xs text-purple-600 mb-1">Output Layer</div>
          <div className="text-sm text-purple-900">3 classes</div>
        </div>
      </div>
    </div>
  );
}
