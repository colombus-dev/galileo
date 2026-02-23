import React, { useRef, useEffect, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { completeMockDocs } from "@/services/completeDocsMock";

export interface CodeViewerProps {
  code: string;
  language?: string;
  className?: string;
  showLineNumbers?: boolean;
  wrapLines?: boolean;
  lineProps?:
    | React.HTMLAttributes<HTMLElement>
    | ((lineNumber: number) => React.HTMLAttributes<HTMLElement>);
  // Extension optionnelle
  enableDocLinks?: boolean;
  onDocKeyClick?: (docKey: string) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  code,
  language = "python",
  className = "",
  showLineNumbers = true,
  wrapLines,
  lineProps,
  enableDocLinks = false,
  onDocKeyClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tooltipPos, setTooltipPos] = useState<{ x: number; y: number } | null>(null);
  const [hoveredToken, setHoveredToken] = useState<string | null>(null);

  // Ajoute les événements de hover et click au rendu HTML
  useEffect(() => {
    if (!enableDocLinks || !containerRef.current) return;

    const container = containerRef.current;

    // Récupérer les éléments texte du SyntaxHighlighter
    const codeElements = container.querySelectorAll("pre");
    if (codeElements.length === 0) return;

    const codeElement = codeElements[0];
    const walker = document.createTreeWalker(
      codeElement,
      NodeFilter.SHOW_TEXT,
      null
    );

    // Récupérer tous les clés documentées possibles
    const allDocKeys = Object.keys(completeMockDocs);
    
    // Créer un regex qui matche TOUS les termes documentés
    // Trier par longueur décroissante pour matcher les plus longs d'abord
    const sortedKeys = [...allDocKeys].sort((a, b) => b.length - a.length);
    
    // Échapper les caractères spéciaux et créer le pattern
    // Utiliser \b pour le début (marche avec les points) et (?![a-zA-Z0-9_.]) pour la fin
    const escapedKeys = sortedKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    // On utilise un pattern simple qui ne crée qu'un groupe de capture
    const keyPattern = new RegExp(`\\b(${escapedKeys.join('|')})\\b`, 'g');

    let node;
    const nodesToReplace: Array<{ node: Node; fragment: DocumentFragment }> = [];

    while ((node = walker.nextNode())) {
      if (!node.textContent) continue;

      const text = node.textContent;
      let lastIndex = 0;
      let hasMatch = false;
      const fragment = document.createDocumentFragment();

      // Trouver tous les matches du pattern
      let match;
      const matches: Array<{ token: string; startIndex: number; endIndex: number }> = [];
      
      // Réinitialiser lastIndex du regex pour chaque nœud texte
      keyPattern.lastIndex = 0;
      
      while ((match = keyPattern.exec(text)) !== null) {
        const token = match[1];  // Le groupe 1 est le token réel
        const tokenStartIndex = match.index;
        const tokenEndIndex = tokenStartIndex + token.length;
        
        // Vérifier les limites (pas d'identifiant avant/après)
        const charBefore = tokenStartIndex > 0 ? text[tokenStartIndex - 1] : ' ';
        const charAfter = tokenEndIndex < text.length ? text[tokenEndIndex] : ' ';
        
        // Les caractères qui peuvent précéder/suivre un token documenté
        const validBefore = /[\s\(\[\{,=:]|^/.test(charBefore) || tokenStartIndex === 0;
        const validAfter = /[\s\)\]\},;:\(\[]|$/.test(charAfter) || tokenEndIndex === text.length;
        
        if (validBefore && validAfter) {
          matches.push({
            token,
            startIndex: tokenStartIndex,
            endIndex: tokenEndIndex,
          });
        }
      }

      // Traiter les matches en ordre d'apparition
      matches.forEach(({ token, startIndex, endIndex }) => {
        hasMatch = true;

        // Ajouter le texte avant le token
        if (startIndex > lastIndex) {
          fragment.appendChild(
            document.createTextNode(text.substring(lastIndex, startIndex))
          );
        }

        // Créer l'élément de token cliquable
        const span = document.createElement('span');
        span.className = 'doc-token-interactive';
        span.textContent = token;
        span.style.cursor = 'pointer';
        span.style.position = 'relative';
        span.setAttribute('data-doc-key', token);
        // Highlighting par défaut (subtle)
        span.style.backgroundColor = 'rgba(59, 130, 246, 0.15)';
        span.style.borderBottom = '1px dotted rgba(59, 130, 246, 0.5)';
        span.style.borderRadius = '2px';
        span.style.padding = '2px 4px';
        
        // Événement hover
        span.addEventListener('mouseenter', () => {
          setHoveredToken(token);
          const rect = span.getBoundingClientRect();
          setTooltipPos({
            x: rect.left + rect.width / 2,
            y: rect.top,
          });
          span.style.backgroundColor = 'rgba(59, 130, 246, 0.3)';
          span.style.borderBottom = '2px dotted rgb(59, 130, 246)';
        });

        span.addEventListener('mouseleave', () => {
          setHoveredToken(null);
          setTooltipPos(null);
          span.style.backgroundColor = 'rgba(59, 130, 246, 0.15)';
          span.style.borderBottom = '1px dotted rgba(59, 130, 246, 0.5)';
        });

        span.addEventListener('click', () => {
          onDocKeyClick?.(token);
        });

        fragment.appendChild(span);
        lastIndex = endIndex;
      });

      if (hasMatch) {
        // Ajouter le texte restant après le dernier token
        if (lastIndex < text.length) {
          fragment.appendChild(
            document.createTextNode(text.substring(lastIndex))
          );
        }
        nodesToReplace.push({ node, fragment });
      }
    }

    // Remplacer les nœuds en dehors de la boucle pour éviter les problèmes
    nodesToReplace.forEach(({ node, fragment }) => {
      if (node.parentNode) {
        node.parentNode.replaceChild(fragment, node);
      }
    });
  }, [enableDocLinks, code, onDocKeyClick]);

  return (
    <div className={`w-full rounded-xl overflow-hidden shadow-md border border-slate-200 bg-slate-900 ${className}`} ref={containerRef}>
      <div className="flex items-center px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-green-400 font-mono text-xs">Python</span>
      </div>
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            background: "transparent",
            fontSize: 15,
            padding: "1.2em",
            borderRadius: 0,
          }}
          showLineNumbers={showLineNumbers}
          wrapLines={wrapLines}
          lineProps={lineProps as never}
        >
          {code}
        </SyntaxHighlighter>

        {/* Tooltip "Voir plus" */}
        {enableDocLinks && hoveredToken && tooltipPos && (
          <div
            className="fixed pointer-events-none z-40 bg-slate-900 text-slate-100 px-2 py-1 rounded text-xs border border-blue-500 whitespace-nowrap"
            style={{
              left: `${tooltipPos.x - 35}px`,
              top: `${tooltipPos.y - 32}px`,
              transform: 'translateX(-50%)',
            }}
          >
            🔍 Voir plus
          </div>
        )}
      </div>

      <style>{`
        .doc-token-interactive {
          transition: all 0.15s ease;
        }
        .doc-token-interactive:hover {
          box-shadow: 0 0 4px rgba(59, 130, 246, 0.4);
        }
      `}</style>
    </div>
  );
};