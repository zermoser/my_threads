import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { Thread } from './types';
import dummyData from '../../public/dummy.json';

const STORAGE_KEY = 'threads';

// โหลดข้อมูล: ดึงจาก localStorage ถ้าไม่มีค่อยใช้ dummyData
export function getThreads(): Thread[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (data) {
    try {
      return JSON.parse(data) as Thread[];
    } catch {
      // กรณี parse ผิดพลาด fallback เป็น dummyData
    }
  }
  // ถ้า localStorage ว่าง ให้เซฟ dummyData ลง localStorage แล้วคืนค่า dummyData
  localStorage.setItem(STORAGE_KEY, JSON.stringify(dummyData));
  return dummyData as Thread[];
}

// บันทึกข้อมูลลง localStorage
export function saveThreads(threads: Thread[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(threads, null, 2));
}

// Export JSON
export function exportJSON() {
  const data = JSON.stringify(getThreads(), null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'threads.json';
  a.click();
  URL.revokeObjectURL(url);
}

// Export Excel
export function exportExcel() {
  const threads = getThreads();
  const data = threads.map(t => ({
    ID: t.id,
    Title: t.title,
    Content: t.content,
    PostedAt: t.authorInfo.postedAt,
    IP: t.authorInfo.ip,
    Device: t.authorInfo.device,
    Replies: t.replies.length
  }));
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Threads');
  const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([wbout], { type: 'application/octet-stream' });
  saveAs(blob, 'threads.xlsx');
}
