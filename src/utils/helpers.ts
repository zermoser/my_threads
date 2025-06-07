import { v4 as uuidv4 } from 'uuid';

// Mock random IP generator
export function getRandomIP(): string {
  return Array.from({ length: 4 })
    .map(() => Math.floor(Math.random() * 256))
    .join('.');
}

export function getDevice(): string {
  return navigator.userAgent;
}

export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

export function generateId(): string {
  return uuidv4();
}
