import React from 'react';
import { Link } from 'react-router-dom';
import { getThreads, exportJSON, exportExcel } from '../utils/storage';
import { Thread } from '../utils/types';
import {
  Download,
  MessageCircle,
  CalendarClock,
  Laptop,
} from 'lucide-react';

export default function ThreadListPage() {
  const [threads, setThreads] = React.useState<Thread[]>([]);
  const [storageError, setStorageError] = React.useState<string | null>(null);

  // ฟังก์ชันช่วยเช็คว่า localStorage ใช้งานได้หรือไม่
  const isLocalStorageAvailable = (): boolean => {
    const testKey = '__storage_test__';
    try {
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  };

  React.useEffect(() => {
    if (!isLocalStorageAvailable()) {
      // กรณี localStorage ไม่สามารถใช้งานได้ (เช่น บล็อก, Incognito บางเบราเซอร์, นโยบายความปลอดภัย)
      setStorageError(
        'ดูเหมือนว่าการเข้าถึง Local Storage ถูกบล็อก กรุณาเปิดใช้งาน Local Storage หรืออนุญาตคุกกี้ เพื่อใช้งานฟีเจอร์นี้'
      );
      return;
    }

    try {
      const data = getThreads();
      setThreads(data);
    } catch (err) {
      console.error('Error while reading threads from storage:', err);
      setStorageError(
        'เกิดข้อผิดพลาดในการดึงข้อมูล กรุณาลองรีเฟรชหน้า หรืออนุญาต Local Storage ให้ใช้งานได้'
      );
    }
  }, []);

  // กรณี storageError ไม่เป็น null ให้แสดงข้อความแจ้ง
  if (storageError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-6">
        <div className="max-w-lg text-center bg-white border border-red-200 rounded-2xl p-8 shadow-md">
          <MessageCircle size={48} className="mx-auto text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            ไม่สามารถเข้าถึง Local Storage
          </h2>
          <p className="text-gray-600 mb-4">
            {storageError}
          </p>
          <p className="text-gray-500 text-sm">
            หากคุณใช้โหมดส่วนตัว (Incognito) หรือมีการตั้งค่าบล็อกคุกกี้/Local Storage
            ให้ลองปิดโหมดนั้น หรือปรับการตั้งค่าเบราเซอร์เพื่อให้อนุญาต Local Storage
          </p>
        </div>
      </div>
    );
  }

  // Render ปกติเมื่อไม่มีปัญหา
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-30">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6 py-5 gap-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-800 tracking-tight drop-shadow-sm select-none">
            🌐 Mos Social
          </h1>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/new"
              className="px-5 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition"
            >
              + New Thread
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-12 pb-24 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-900 mb-12 select-none drop-shadow">
          ✨ My Threads
        </h2>

        {threads.length === 0 ? (
          <div className="text-center text-gray-400 text-xl mt-32">
            No threads found. <br />
            <span className="text-blue-600">Create your first one!</span>
          </div>
        ) : (
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {threads.map((thread) => (
              <Link
                to={`/thread/${thread.id}`}
                key={thread.id}
                className="group bg-white border border-gray-100 rounded-3xl p-6 shadow-md hover:shadow-xl hover:border-blue-300 transition duration-300 cursor-pointer"
              >
                <h3 className="text-xl font-bold text-blue-700 group-hover:text-blue-900 mb-3 line-clamp-2 transition">
                  {thread.title}
                </h3>
                <p className="text-gray-700 text-sm mb-5 line-clamp-3 leading-relaxed">
                  {thread.content}
                </p>

                <div className="space-y-2 text-gray-500 text-sm">
                  <div className="flex items-center gap-2">
                    <CalendarClock size={16} />
                    <span>{new Date(thread.authorInfo.postedAt).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Laptop size={16} />
                    <span>{thread.authorInfo.device}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle size={16} />
                    <span>{thread.replies.length} replies</span>
                  </div>
                  <div className="text-xs text-gray-400 truncate">
                    IP: {thread.authorInfo.ip}
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        )}
      </main>

      {/* Footer with Export Buttons */}
      <footer className="sticky bottom-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg z-40">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-center sm:justify-end items-center gap-4 px-6 py-4">
          <button
            onClick={exportJSON}
            className="flex items-center gap-2 px-5 py-3 rounded-3xl bg-yellow-500 text-white font-semibold shadow-md hover:bg-yellow-600 transition duration-300 select-none"
            aria-label="Export JSON"
          >
            <Download size={20} />
            Export JSON
          </button>
          <button
            onClick={exportExcel}
            className="flex items-center gap-2 px-5 py-3 rounded-3xl bg-emerald-600 text-white font-semibold shadow-md hover:bg-emerald-700 transition duration-300 select-none"
            aria-label="Export Excel"
          >
            <Download size={20} />
            Export Excel
          </button>
        </div>
      </footer>
    </div>
  );
}
