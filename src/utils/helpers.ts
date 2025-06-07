import { v4 as uuidv4 } from 'uuid';

// Mock random IP generator
export function getRandomIP(): string {
  return Array.from({ length: 4 })
    .map(() => Math.floor(Math.random() * 256))
    .join('.');
}

export function getDevice(): string {
  const ua = navigator.userAgent;

  if (/windows phone/i.test(ua)) return "Windows Phone";
  if (/Win/i.test(ua)) return "Windows";
  if (/Mac/i.test(ua)) return "Mac";
  if (/iPad|iPhone|iPod/.test(ua)) return "iOS";
  if (/android/i.test(ua)) return "Android";
  if (/Linux/i.test(ua)) return "Linux";

  return "Unknown Device";
}

export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

export function generateId(): string {
  return uuidv4();
}
