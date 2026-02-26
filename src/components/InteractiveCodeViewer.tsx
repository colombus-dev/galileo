import React from 'react';
import { CodeViewer, type CodeViewerProps } from '@/components/artefacts/CodeViewer';
import { DocModal } from '@/components/DocModal';
import { useCodeDocumentation } from '@/hooks/useCodeDocumentation';

export interface InteractiveCodeViewerProps extends CodeViewerProps {
  /** Active la documentation interactive */
  enableDocLinks?: boolean;
}

/**
 * CodeViewer avec extension documentation interactive
 * Affiche les termes documentés comme cliquables
 * Ouvre un modal avec la documentation
 */
export const InteractiveCodeViewer: React.FC<InteractiveCodeViewerProps> = ({
  enableDocLinks = false,
  ...codeViewerProps
}) => {
  const {
    isDocModalOpen,
    docEntry,
    loading,
    error,
    handleDocKeyClick,
    closeDocModal,
  } = useCodeDocumentation();

  return (
    <>
      <CodeViewer
        {...codeViewerProps}
        enableDocLinks={enableDocLinks}
        onDocKeyClick={enableDocLinks ? handleDocKeyClick : undefined}
      />

      {enableDocLinks && (
        <DocModal
          isOpen={isDocModalOpen}
          docEntry={docEntry}
          loading={loading}
          error={error}
          onClose={closeDocModal}
        />
      )}
    </>
  );
};
