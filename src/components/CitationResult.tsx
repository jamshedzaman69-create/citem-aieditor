import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Save, RefreshCw, Trash2, Copy, Check } from 'lucide-react';
import type { Citation } from '../types';

interface Props {
  citation: Citation;
  onSave?: () => void;
  onRegenerate?: () => void;
  onDelete?: () => void;
  isSaving?: boolean;
  showSaveButton?: boolean;
}

export default function CitationResult({
  citation,
  onSave,
  onRegenerate,
  onDelete,
  isSaving = false,
  showSaveButton = true
}: Props) {
  const [copied, setCopied] = React.useState(false);
  const { t } = useTranslation();

  // Check if the link is a valid external URL
  const isValidExternalLink = (link: string): boolean => {
    if (!link || link.trim() === '' || link === 'Not available') {
      return false;
    }
    
    try {
      const url = new URL(link);
      // Check if it's not pointing to the current app domain
      return !url.hostname.includes('citeme.app') && 
             !url.hostname.includes('localhost') &&
             (url.protocol === 'http:' || url.protocol === 'https:');
    } catch {
      return false;
    }
  };

  const handleCopy = async () => {
    if (citation.formattedCitation) {
      // Create a temporary div to handle HTML formatting
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = citation.formattedCitation;
      
      try {
        // Try to copy as rich text first
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([tempDiv.innerHTML], { type: 'text/html' }),
            'text/plain': new Blob([tempDiv.innerText], { type: 'text/plain' })
          })
        ]);
      } catch (err) {
        // Fallback to plain text if rich text copying fails
        await navigator.clipboard.writeText(tempDiv.innerText);
      }
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="w-full rounded-lg border border-purple-900/20 bg-gray-800 p-6 shadow-lg">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white">Citation Result</h2>
        <div className="flex gap-2">
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="inline-flex items-center rounded-md border border-gray-600 bg-gray-700 px-3 py-2 text-sm font-medium text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate
            </button>
          )}
          {showSaveButton && onSave && (
            <button
              onClick={onSave}
              disabled={isSaving}
              className="inline-flex items-center rounded-md border border-transparent bg-purple-600 px-3 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? 'Saving...' : 'Save Citation'}
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="inline-flex items-center rounded-md border border-red-900/20 bg-red-900/10 px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium text-gray-400">Study Findings</h3>
          <p className="mt-1 text-white">{citation.studyFindings}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-400">Citation</h3>
          <p className="mt-1 text-white">{citation.citation}</p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-400">Brief Description</h3>
          <p className="mt-1 text-white">{citation.briefDescription}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <h3 className="text-sm font-medium text-gray-400">Location</h3>
            <p className="mt-1 text-white">{citation.location}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400">Date</h3>
            <p className="mt-1 text-white">{citation.date}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400">Participants</h3>
            <p className="mt-1 text-white">{citation.participants}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400">Accessibility</h3>
            <p className="mt-1 text-white">{citation.accessibility}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-400">Link</h3>
          {isValidExternalLink(citation.link) ? (
            <a
              href={citation.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center text-purple-400 hover:text-purple-300"
            >
              {t('citation.viewStudy')}
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          ) : (
            <p className="mt-1 text-gray-500 italic">{t('citation.noLinkAvailable')}</p>
          )}
        </div>

        {/* Remove the old link section since we replaced it above */}
        {false && citation.link && (
          <div>
            <h3 className="text-sm font-medium text-gray-400">Link</h3>
            <a
              href={citation.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex items-center text-purple-400 hover:text-purple-300"
            >
              View Study
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </div>
        )}

        <div className="mt-8 border-t border-gray-700 pt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-white">Ready to Use Citation</h3>
            <button
              onClick={handleCopy}
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                copied
                  ? 'bg-green-600/20 text-green-400'
                  : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
              }`}
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Citation
                </>
              )}
            </button>
          </div>
          <p className="text-sm text-gray-400 mb-3">
            Copy this citation and paste it directly into your work
          </p>
          {citation.formattedCitation ? (
            <div className="bg-gray-900 p-4 rounded-lg border border-purple-500/20">
              <p 
                className="text-white font-mono text-sm whitespace-pre-wrap"
                dangerouslySetInnerHTML={{ __html: citation.formattedCitation }}
              />
            </div>
          ) : (
            <p className="text-gray-500 italic">No formatted citation available</p>
          )}
        </div>
      </div>
    </div>
  );
}