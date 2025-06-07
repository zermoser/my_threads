import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getThreads, saveThreads } from '../utils/storage';
import { Thread } from '../utils/types';
import {
  getRandomIP,
  getDevice,
  getCurrentTimestamp,
  generateId,
} from '../utils/helpers';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NewThreadPage() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [error, setError] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      setError('Please fill out both the title and content.');
      return;
    }

    const threads = getThreads();
    const newThread: Thread = {
      id: generateId(),
      title: title.trim(),
      content: content.trim(),
      authorInfo: {
        ip: getRandomIP(),
        device: getDevice(),
        postedAt: getCurrentTimestamp(),
      },
      replies: [],
    };

    saveThreads([newThread, ...threads]);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-indigo-50 flex items-center justify-center px-4 py-16">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-10 relative">
        {/* Back Button */}
        <Link
          to="/"
          className="absolute top-6 left-6 flex items-center gap-2 text-indigo-600 hover:text-indigo-900 transition"
        >
          <ArrowLeft size={24} />
          Back
        </Link>

        {/* Title */}
        <h2 className="text-4xl my-8 font-extrabold text-indigo-700 text-center drop-shadow">
          ✏️ Start a New Thread
        </h2>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Title Input */}
        <div className="mb-6">
          <label className="block mb-2 text-gray-700 font-medium">Title</label>
          <input
            type="text"
            placeholder="Enter a catchy title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-sm"
          />
        </div>

        {/* Content Input */}
        <div className="mb-8">
          <label className="block mb-2 text-gray-700 font-medium">Content</label>
          <textarea
            placeholder="What's on your mind?"
            value={content}
            rows={5}
            onChange={(e) => {
              setContent(e.target.value);
              setError('');
            }}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition shadow-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-indigo-700 transition duration-200"
        >
          🚀 Post Your Thread
        </button>
      </div>
    </div>
  );
}
