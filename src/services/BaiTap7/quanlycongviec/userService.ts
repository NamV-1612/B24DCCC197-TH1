import { UserProfile } from '@/models/quanlycongviec/user';

const USER_KEY = 'TH7_TASK_MANAGER_USER';

export const getCurrentUser = (): string | null => {
  return localStorage.getItem(USER_KEY);
};

export const setCurrentUser = (username: string): UserProfile => {
  const profile: UserProfile = {
    username,
    loginAt: new Date().toISOString(),
  };
  localStorage.setItem(USER_KEY, username);
  return profile;
};

export const clearCurrentUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

export const isUserLoggedIn = (): boolean => {
  return !!localStorage.getItem(USER_KEY);
};
