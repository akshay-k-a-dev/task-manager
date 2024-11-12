import { writable } from 'svelte/store';
import { loginUser } from '../api';

interface User {
  _id: string;
  username: string;
}

function createAuthStore() {
  const { subscribe, set } = writable<User | null>(null);

  return {
    subscribe,
    login: async (username: string) => {
      try {
        const user = await loginUser(username);
        localStorage.setItem('user', JSON.stringify(user));
        set(user);
      } catch (error) {
        console.error('Login failed:', error);
      }
    },
    logout: () => {
      localStorage.removeItem('user');
      set(null);
    },
    init: () => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        set(JSON.parse(storedUser));
      }
    }
  };
}

export const auth = createAuthStore();