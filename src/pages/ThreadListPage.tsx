// src/pages/ThreadListPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { getThreads, exportJSON, exportExcel } from '../utils/storage';
import { Thread } from '../utils/types';
import { Download, MessageCircle, CalendarClock, Laptop } from 'lucide-react';

export default function ThreadListPage() {
  const [threads, setThreads] = React.useState<Thread[]>([]);
  React.useEffect(() => {
    setThreads(getThreads());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-md shadow-md z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center p-6 gap-4">
          <h1 className="text-4xl font-extrabold text-indigo-700 tracking-tight drop-shadow-md">
            Katoo Social
          </h1>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/new"
              className="px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg hover:bg-indigo-700 transition"
            >
              + New Thread
            </Link>
            <button
              onClick={exportJSON}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-lg hover:bg-green-700 transition"
              aria-label="Export JSON"
            >
              <Download size={20} />
              Export JSON
            </button>
            <button
              onClick={exportExcel}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-600 text-white font-semibold shadow-lg hover:bg-orange-700 transition"
              aria-label="Export Excel"
            >
              <Download size={20} />
              Export Excel
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="pt-32 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <h2 className="text-5xl font-extrabold text-indigo-900 mb-10 select-none drop-shadow-md">
          My Threads
        </h2>

        {threads.length === 0 ? (
          <p className="text-center text-gray-400 text-xl mt-24">
            No threads found. Create your first thread!
          </p>
        ) : (
          <ul className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {threads.map((thread) => (
              <Link
                to={`/thread/${thread.id}`}
                key={thread.id}
                className="flex flex-col justify-between bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow cursor-pointer group"
                title={thread.content}
              >
                <h3 className="text-2xl font-semibold text-indigo-700 mb-3 line-clamp-2 group-hover:text-indigo-900 transition">
                  {thread.title}
                </h3>
                <p className="text-gray-700 mb-5 line-clamp-3">{thread.content}</p>

                <div className="flex flex-col space-y-2 text-gray-500 text-sm select-none">
                  <div className="flex items-center gap-2">
                    <CalendarClock size={16} />
                    <span>Posted: {new Date(thread.authorInfo.postedAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Laptop size={16} />
                    <span>{thread.authorInfo.device}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} />
                    <span>{thread.replies.length} Replies</span>
                  </div>
                  <div className="text-xs text-gray-400 truncate">IP: {thread.authorInfo.ip}</div>
                </div>
              </Link>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
