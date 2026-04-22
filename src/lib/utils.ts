import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format } from 'date-fns';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEventDate(date: string): string {
  return format(new Date(date), 'EEE, MMM d · h:mm a');
}

export function formatEventDateLong(date: string): string {
  return format(new Date(date), 'EEEE, MMMM do, yyyy');
}

export function formatTime(date: string): string {
  return format(new Date(date), 'h:mm a');
}

export function formatPrice(price: number): string {
  if (price === 0) return 'Free';
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
}

export function getSlotsLabel(available: number, capacity: number) {
  const pct = (available / capacity) * 100;
  if (available === 0) return { label: 'Sold Out', color: 'text-red-500' };
  if (pct <= 20) return { label: `Only ${available} left!`, color: 'text-orange-400' };
  return { label: `${available} spots left`, color: 'text-green-500' };
}
