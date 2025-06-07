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
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white flex items-center justify-center px-4 py-10">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8">
        <h2 className="text-4xl font-bold text-indigo-700 mb-6 text-center drop-shadow">
          ✏️ Create New Thread
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="mb-5">
          <label className="block mb-2 font-semibold text-gray-700">Title</label>
          <input
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter a thread title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError('');
            }}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-semibold text-gray-700">Content</label>
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400"
            rows={5}
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setError('');
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 transition duration-200 shadow-md"
        >
          🚀 Post Thread
        </button>
      </div>
    </div>
  );
}
