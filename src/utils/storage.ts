import { Thread } from './types';

const STORAGE_KEY = 'threads';

export function getThreads(): Thread[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveThreads(threads: Thread[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(threads, null, 2));
}

export function exportJSON() {
  const data = localStorage.getItem(STORAGE_KEY) || '[]';
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'threads.json';
  a.click();
  URL.revokeObjectURL(url);
}
