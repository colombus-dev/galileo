import React from 'react';

/**
 * Convertit markdown basique en JSX
 */
export function renderMarkdown(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let codeBlock = false;
  let codeContent = '';
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Code blocks
    if (line.startsWith('```')) {
      if (codeBlock) {
        elements.push(
          React.createElement(
            'pre',
            {
              key: key++,
              className: 'p-3 bg-slate-900 text-green-400 rounded-lg text-xs overflow-x-auto my-3',
            },
            React.createElement('code', null, codeContent)
          )
        );
        codeContent = '';
        codeBlock = false;
      } else {
        codeBlock = true;
      }
      continue;
    }

    if (codeBlock) {
      codeContent += line + '\n';
      continue;
    }

    // Headings
    if (line.startsWith('# ')) {
      elements.push(
        React.createElement('h1', { key: key++, className: 'text-2xl font-bold text-slate-900 mt-6 mb-3' }, line.replace('# ', ''))
      );
      continue;
    }
    if (line.startsWith('## ')) {
      elements.push(
        React.createElement('h2', { key: key++, className: 'text-xl font-bold text-slate-900 mt-5 mb-3' }, line.replace('## ', ''))
      );
      continue;
    }
    if (line.startsWith('### ')) {
      elements.push(
        React.createElement('h3', { key: key++, className: 'text-lg font-semibold text-slate-900 mt-4 mb-2' }, line.replace('### ', ''))
      );
      continue;
    }

    // Lists
    if (line.startsWith('- ')) {
      elements.push(
        React.createElement('li', { key: key++, className: 'ml-4 text-slate-700 text-sm list-disc' }, line.replace('- ', ''))
      );
      continue;
    }

    // Process inline formatting (bold, italic, code)
    let processedLine = line;
    
    // Order matters: process bold first, then italic, then code
    // Bold **text** - handle any content inside (including single * or other chars)
    processedLine = processedLine.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // Italic *text* - match any chars except * (to avoid matching bold)
    processedLine = processedLine.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    
    // Backticks `code`
    processedLine = processedLine.replace(/`([^`]+)`/g, '<code class="bg-slate-100 px-2 py-1 rounded text-sm font-mono">$1</code>');

    // Empty lines
    if (line.trim() === '') {
      continue;
    }

    // Paragraphs with HTML content
    if (processedLine.includes('<')) {
      elements.push(
        React.createElement('p', {
          key: key++,
          className: 'text-slate-700 text-sm leading-relaxed mb-2',
          dangerouslySetInnerHTML: { __html: processedLine },
        })
      );
    } else {
      elements.push(
        React.createElement('p', { key: key++, className: 'text-slate-700 text-sm leading-relaxed mb-2' }, line)
      );
    }
  }

  return elements;
}
