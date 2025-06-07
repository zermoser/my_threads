import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getThreads, saveThreads } from '../utils/storage';
import { Thread, Reply } from '../utils/types';
import { getRandomIP, getDevice, getCurrentTimestamp, generateId } from '../utils/helpers';
import { ArrowLeft } from 'lucide-react';

export default function ThreadDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = React.useState<Thread | null>(null);
  const [replyContent, setReplyContent] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const threads = getThreads();
    const found = threads.find(t => t.id === id) || null;
    setThread(found);
  }, [id]);

  const handleReply = () => {
    if (!replyContent.trim()) {
      setError('Please write something before replying.');
      return;
    }
    if (!thread) return;

    const newReply: Reply = {
      id: generateId(),
      content: replyContent.trim(),
      replierInfo: {
        ip: getRandomIP(),
        device: getDevice(),
        postedAt: getCurrentTimestamp()
      }
    };
    const threads = getThreads().map(t =>
      t.id === thread.id ? { ...t, replies: [...t.replies, newReply] } : t
    );
    saveThreads(threads);
    setThread({ ...thread, replies: [...thread.replies, newReply] });
    setReplyContent('');
    setError('');
  };

  if (!thread) return (
    <div className="flex items-center justify-center min-h-screen bg-indigo-50">
      <p className="text-xl text-gray-600">Thread not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 p-6 sm:p-10 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl p-8 relative">
        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-900 transition"
        >
          <ArrowLeft size={24} />
          Back
        </Link>

        {/* Thread Title */}
        <h1 className="text-4xl font-extrabold text-indigo-700 mt-6 mb-4 drop-shadow-sm">{thread.title}</h1>

        {/* Thread Content */}
        <p className="text-gray-800 text-lg leading-relaxed mb-6 whitespace-pre-wrap">{thread.content}</p>

        {/* Thread Meta */}
        <div className="text-sm text-gray-500 mb-4 border-b pb-4 flex flex-wrap gap-4">
          <div><strong>Posted:</strong> {new Date(thread.authorInfo.postedAt).toLocaleString()}</div>
          <div><strong>IP:</strong> {thread.authorInfo.ip}</div>
          <div><strong>Device:</strong> {thread.authorInfo.device}</div>
        </div>

        {/* Replies Section */}
        <section>
          <h2 className="text-2xl font-semibold text-indigo-700 mb-6">Replies ({thread.replies.length})</h2>

          {thread.replies.length === 0 && (
            <p className="text-gray-400 italic mb-6">No replies yet. Be the first to reply!</p>
          )}

          <div className="space-y-5 max-h-[400px] overflow-y-auto mb-8">
            {thread.replies.map(r => (
              <div
                key={r.id}
                className="p-4 bg-indigo-50 rounded-xl shadow-inner border border-indigo-100"
              >
                <p className="mb-2 text-gray-900 whitespace-pre-wrap">{r.content}</p>
                <p className="text-xs text-gray-500">
                  <span><strong>At:</strong> {new Date(r.replierInfo.postedAt).toLocaleString()}</span> |{' '}
                  <span><strong>IP:</strong> {r.replierInfo.ip}</span> |{' '}
                  <span><strong>Device:</strong> {r.replierInfo.device}</span>
                </p>
              </div>
            ))}
          </div>

          {/* Reply Input */}
          {error && (
            <div className="mb-3 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          <textarea
            className="w-full rounded-2xl border border-gray-300 p-4 resize-none focus:outline-none focus:ring-4 focus:ring-indigo-400 transition shadow-sm"
            rows={4}
            placeholder="Write your reply here..."
            value={replyContent}
            onChange={e => {
              setReplyContent(e.target.value);
              setError('');
            }}
          />
          <button
            onClick={handleReply}
            className="mt-4 w-full bg-indigo-600 text-white font-semibold py-3 rounded-2xl shadow-lg hover:bg-indigo-700 transition duration-200"
          >
            Send Reply
          </button>
        </section>
      </div>
    </div>
  );
}
