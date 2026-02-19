import { useMemo } from 'react';
import { completeMockDocs } from '@/services/completeDocsMock';
import type { Token } from '@/types/notebook';

/**
 * Hook pour extraire les tokens documentés d'un code
 * Utilise la même base de connaissance que CodeViewer
 */
export const useExtractTokens = (code: string): Token[] => {
  return useMemo(() => {
    const allDocKeys = Object.keys(completeMockDocs);
    const sortedKeys = [...allDocKeys].sort((a, b) => b.length - a.length);
    
    // Créer un regex pour tous les termes documentés
    const escapedKeys = sortedKeys.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
    const keyPattern = new RegExp(`\\b(${escapedKeys.join('|')})\\b`, 'g');
    
    const foundTokens = new Map<string, Token>();
    let match;
    
    while ((match = keyPattern.exec(code)) !== null) {
      const token = match[1];
      const charBefore = match.index > 0 ? code[match.index - 1] : ' ';
      const charAfter = match.index + token.length < code.length ? code[match.index + token.length] : ' ';
      
      // Vérifier les limites
      const validBefore = /[\s\(\[\{,=:]|^/.test(charBefore) || match.index === 0;
      const validAfter = /[\s\)\]\},;:\(\[]|$/.test(charAfter) || match.index + token.length === code.length;
      
      if (validBefore && validAfter) {
        // Éviter les doublons
        if (!foundTokens.has(token)) {
          const docEntry = completeMockDocs[token];
          
          // Créer un Token à partir de la documentation
          const tokenObj: Token = {
            id: `${token}-${foundTokens.size}`,
            name: token,
            lib: docEntry?.libName || 'unknown',
            kind: 'function',
            docKey: token,
          };
          
          foundTokens.set(token, tokenObj);
        }
      }
    }
    
    return Array.from(foundTokens.values());
  }, [code]);
};
