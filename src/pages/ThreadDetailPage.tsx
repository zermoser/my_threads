import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { getThreads, saveThreads } from '../utils/storage';
import { Thread, Reply } from '../utils/types';
import { getRandomIP, getDevice, getCurrentTimestamp, generateId } from '../utils/helpers';

export default function ThreadDetailPage() {
  const { id } = useParams<{id: string}>();
  const [thread, setThread] = React.useState<Thread | null>(null);
  const [replyContent, setReplyContent] = React.useState('');

  React.useEffect(() => {
    const threads = getThreads();
    const found = threads.find(t => t.id === id) || null;
    setThread(found);
  }, [id]);

  const handleReply = () => {
    if (!thread) return;
    const newReply: Reply = {
      id: generateId(),
      content: replyContent,
      replierInfo: {
        ip: getRandomIP(),
        device: getDevice(),
        postedAt: getCurrentTimestamp()
      }
    };
    const threads = getThreads().map(t => t.id === thread.id ? { ...t, replies: [...t.replies, newReply] } : t);
    saveThreads(threads);
    setThread({ ...thread, replies: [...thread.replies, newReply] });
    setReplyContent('');
  };

  if (!thread) return <p>Thread not found.</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Link to="/" className="text-blue-500 hover:underline mb-4 block">&larr; Back</Link>
      <h2 className="text-3xl font-bold mb-2">{thread.title}</h2>
      <p className="mb-4">{thread.content}</p>
      <p className="text-sm text-gray-500 mb-4">
        Posted at: {thread.authorInfo.postedAt} | IP: {thread.authorInfo.ip} | Device: {thread.authorInfo.device}
      </p>
      <div className="border-t pt-4">
        <h3 className="text-2xl mb-2">Replies</h3>
        {thread.replies.length === 0 ? <p>No replies yet.</p> : (
          thread.replies.map(r => (
            <div key={r.id} className="mb-4 p-2 border rounded">
              <p>{r.content}</p>
              <p className="text-xs text-gray-500">
                At: {r.replierInfo.postedAt} | IP: {r.replierInfo.ip} | Device: {r.replierInfo.device}
              </p>
            </div>
          ))
        )}
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows={3}
          placeholder="Your reply"
          value={replyContent}
          onChange={e => setReplyContent(e.target.value)}
        />
        <button
          onClick={handleReply}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Reply
        </button>
      </div>
    </div>
  );
}
