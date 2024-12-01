import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDateTime(date: Date) {
  return new Date(date).toLocaleString(
      'en-US',
        {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
        }
  )
}