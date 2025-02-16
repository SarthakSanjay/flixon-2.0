import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import api from "./api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export async function logout() {
  try {
    const response = await api.post('/api/user/logout', {

    }, { withCredentials: true })

    if (response.status > 200) {
      throw new Error('Logout failed');
    }

    window.location.href = '/login';
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}
