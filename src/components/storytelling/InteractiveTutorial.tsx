import React, { useState } from 'react';
import { MdClose, MdLightbulb } from 'react-icons/md';

/**
 * Mini tutoriel indiquant que le code est interactif
 * Affiche des conseils sur comment utiliser les features interactives
 */
export const InteractiveTutorial: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="w-full mb-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-lg shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3 flex-1">
          <MdLightbulb className="text-xl text-blue-600 flex-shrink-0 mt-1" />
          <div className="flex-1">
            <h3 className="font-semibold text-blue-900 text-sm mb-1">
              Le code est interactif !
            </h3>
            <ul className="text-xs text-blue-800 space-y-1">
              <li>
                <strong>1. Termes en surbrillance bleue:</strong> Cliquez sur les mots surlignés en bleu dans le code pour voir leur documentation.
              </li>
              <li>
                <strong>2. Tokens en bas:</strong> Cliquez sur les badges sous le code pour explorer les fonctions et imports utilisés.
              </li>
              <li>
                <strong>3. Panneau latéral:</strong> La documentation apparaît à droite avec des exemples et des explications.
              </li>
            </ul>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="flex-shrink-0 text-blue-400 hover:text-blue-600 transition-colors p-1"
          title="Fermer"
        >
          <MdClose className="text-lg" />
        </button>
      </div>
    </div>
  );
};
