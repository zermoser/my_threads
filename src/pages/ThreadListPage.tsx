import React from 'react';
import { Link } from 'react-router-dom';
import { getThreads, saveThreads } from '../utils/storage';
import { Thread } from '../utils/types';

export default function ThreadListPage() {
  const [threads, setThreads] = React.useState<Thread[]>([]);
  React.useEffect(() => {
    setThreads(getThreads());
  }, []);

  const handleExport = () => {
    import('../utils/storage').then(mod => mod.exportJSON());
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Threads</h2>
        <div>
          <Link to="/new" className="px-4 py-2 bg-blue-600 text-white rounded mr-2">New Thread</Link>
          <button onClick={handleExport} className="px-4 py-2 bg-green-600 text-white rounded">
            Export JSON
          </button>
        </div>
      </div>
      {threads.length === 0 ? (
        <p>No threads yet.</p>
      ) : (
        <ul>
          {threads.map(t => (
            <li key={t.id} className="mb-2">
              <Link to={`/thread/${t.id}`} className="text-blue-500 hover:underline">
                {t.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
