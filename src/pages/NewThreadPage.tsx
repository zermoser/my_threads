import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getThreads, saveThreads } from '../utils/storage';
import { Thread } from '../utils/types';
import { getRandomIP, getDevice, getCurrentTimestamp, generateId } from '../utils/helpers';

export default function NewThreadPage() {
  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    const threads = getThreads();
    const newThread: Thread = {
      id: generateId(),
      title,
      content,
      authorInfo: {
        ip: getRandomIP(),
        device: getDevice(),
        postedAt: getCurrentTimestamp()
      },
      replies: []
    };
    saveThreads([newThread, ...threads]);
    navigate('/');
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">New Thread</h2>
      <input
        className="w-full p-2 border rounded mb-2"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 border rounded mb-4"
        placeholder="Content"
        rows={4}
        value={content}
        onChange={e => setContent(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Post
      </button>
    </div>
  );
}
