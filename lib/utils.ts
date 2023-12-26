import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSpotifyToken() {
  return localStorage.getItem('spotifyToken');
}

export function setSpotifyToken(token: string) {
  localStorage.setItem('spotifyToken', token);
}

export function removeSpotifyToken() {
  localStorage.removeItem('spotifyToken');
}

export function stringToSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}

export function cleanText(text: string) {
  // Remove <a> tags
  let cleaned = text.replace(/<a[^>]*>([^<]+)<\/a>/g, '');

  // Remove newline characters
  // cleaned = cleaned.replace(/\n/g, '');

  return cleaned;
}
