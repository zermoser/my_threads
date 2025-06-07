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
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 w-full bg-white/70 backdrop-blur-sm shadow-md z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-extrabold text-blue-600">Katoo Social</h1>
          <div className="space-x-2">
            <Link to="/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              New Thread
            </Link>
            <button onClick={exportJSON} className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              <Download size={16} className="inline mr-1" /> JSON
            </button>
            <button onClick={exportExcel} className="p-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
              <Download size={16} className="inline mr-1" /> Excel
            </button>
          </div>
        </div>
      </header>
      {/* ... */}
    </div>
  );
}
