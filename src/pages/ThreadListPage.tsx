// src/pages/ThreadListPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getThreads, exportJSON, exportExcel } from '../utils/storage';
import { Thread } from '../utils/types';
import { Download } from 'lucide-react';

export default function ThreadListPage() {
  const [threads, setThreads] = React.useState<Thread[]>([]);
  React.useEffect(() => {
    setThreads(getThreads());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md shadow-lg z-20">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center p-5 gap-4">
          <h1 className="text-3xl font-extrabold text-blue-700 tracking-wide drop-shadow-sm">
            Katoo Social
          </h1>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/new"
              className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
            >
              + New Thread
            </Link>
            <button
              onClick={exportJSON}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 text-white font-semibold hover:bg-green-700 transition shadow-md hover:shadow-lg"
              aria-label="Export JSON"
            >
              <Download size={18} />
              Export JSON
            </button>
            <button
              onClick={exportExcel}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition shadow-md hover:shadow-lg"
              aria-label="Export Excel"
            >
              <Download size={18} />
              Export Excel
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-8 select-none drop-shadow-sm">
          My Threads
        </h2>

        {threads.length === 0 ? (
          <p className="text-center text-gray-400 text-lg mt-20">
            No threads found. Create your first thread!
          </p>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {threads.map((thread) => (
              <li key={thread.id} className="mb-4 border rounded-lg bg-white p-4 shadow hover:shadow-lg transition-shadow">
                <h2 className="text-lg font-semibold text-blue-700 mb-2">{thread.title}</h2>
                <p className="text-gray-700 mb-3">{thread.content}</p>
                <small className="text-gray-500">
                  by IP: {thread.authorInfo.ip} on {new Date(thread.authorInfo.postedAt).toLocaleString()} using {thread.authorInfo.device}
                </small>
              </li>
            ))}

          </ul>
        )}
      </main>
    </div>
  );
}
