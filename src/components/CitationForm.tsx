import React, { useState } from 'react';
import { Search } from 'lucide-react';
import LoadingMessage from './LoadingMessage';
import type { CitationFormat, CitationRequest } from '../types';

interface Props {
  onSubmit: (request: CitationRequest) => void;
  isLoading: boolean;
}

const citationFormats: CitationFormat[] = [
  'MLA8',
  'Chicago',
  'APA',
  'Harvard',
  'MHRA',
  'Vancouver',
  'OSCOLA'
];

export default function CitationForm({ onSubmit, isLoading }: Props) {
  const [request, setRequest] = useState<CitationRequest>({
    text: '',
    format: 'APA',
    sampleSize: '',
    dateRange: '',
    location: '',
    parameters: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(request);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6 bg-gray-800 p-6 rounded-lg shadow-lg border border-purple-900/20">
      <div className="space-y-2">
        <label htmlFor="text" className="block text-sm font-medium text-gray-300">
          Explain the citation you need
        </label>
        <textarea
          id="text"
          rows={4}
          className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500"
          placeholder="e.g., I need a citation that proves oceans are warming"
          value={request.text}
          onChange={(e) => setRequest({ ...request, text: e.target.value })}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="format" className="block text-sm font-medium text-gray-300">
            Citation Format
          </label>
          <select
            id="format"
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white py-2 pl-3 pr-10 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
            value={request.format}
            onChange={(e) => setRequest({ ...request, format: e.target.value as CitationFormat })}
          >
            {citationFormats.map((format) => (
              <option key={format} value={format}>
                {format}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="sampleSize" className="block text-sm font-medium text-gray-300">
            Sample Size (Optional)
          </label>
          <input
            type="text"
            id="sampleSize"
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white px-3 py-2 focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g., 1000+"
            value={request.sampleSize}
            onChange={(e) => setRequest({ ...request, sampleSize: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="dateRange" className="block text-sm font-medium text-gray-300">
            Date Range (Optional)
          </label>
          <input
            type="text"
            id="dateRange"
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white px-3 py-2 focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g., 2020-2023"
            value={request.dateRange}
            onChange={(e) => setRequest({ ...request, dateRange: e.target.value })}
          />
        </div>

        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-300">
            Geographic Location (Optional)
          </label>
          <input
            type="text"
            id="location"
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white px-3 py-2 focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g., North America"
            value={request.location}
            onChange={(e) => setRequest({ ...request, location: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label htmlFor="parameters" className="block text-sm font-medium text-gray-300">
          Additional Parameters (Optional)
          <span className="block text-xs text-gray-400 mt-1">Add anything you need here in free text</span>
        </label>
        <input
          type="text"
          id="parameters"
          className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 text-white px-3 py-2 focus:border-purple-500 focus:ring-purple-500"
          placeholder="e.g., peer-reviewed only, specific journal"
          value={request.parameters}
          onChange={(e) => setRequest({ ...request, parameters: e.target.value })}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="flex w-full items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50"
      >
        {isLoading ? (
          <LoadingMessage />
        ) : (
          <>
            <Search className="mr-2 h-5 w-5" />
            Generate Citation
          </>
        )}
      </button>
    </form>
  );
}