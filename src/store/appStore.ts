import { useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { ApiService } from '../services/api';
import { INITIAL_USERS } from '../services/mockData';

export type AppRoute =
  | 'landing'
  | 'login'
  | 'dashboard'
  | 'jobs'
  | 'job-new'
  | 'job-detail'
  | 'applicants'
  | 'applicant-new'
  | 'applicant-detail'
  | 'pipeline'
  | 'clients'
  | 'vendors'
  | 'interviews'
  | 'submissions'
  | 'placements'
  | 'search'
  | 'tasks'
  | 'reports'
  | 'admin-users'
  | 'settings';

export type ThemePalette = 'indigo' | 'emerald' | 'teal' | 'violet';

interface AppState {
  currentRoute: AppRoute;
  selectedId?: string;
  currentUser: User | null;
  isAuthenticated: boolean;
  isDark: boolean;
  themePalette: ThemePalette;
  searchOpen: boolean;
  quickCreateOpen: boolean;
  notificationsOpen: boolean;
  selectedRoleForLogin: UserRole;
}

const initialPalette = (localStorage.getItem('talent_theme_palette') as ThemePalette) || 'indigo';

let globalState: AppState = {
  currentRoute: 'landing',
  selectedId: undefined,
  currentUser: null,
  isAuthenticated: false,
  isDark: false,
  themePalette: initialPalette,
  searchOpen: false,
  quickCreateOpen: false,
  notificationsOpen: false,
  selectedRoleForLogin: 'recruiter'
};

// Sync initial data-theme
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', initialPalette);
}

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

export function useAppStore() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const listener = () => setTick((t) => t + 1);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const navigate = (route: AppRoute, id?: string) => {
    globalState.currentRoute = route;
    globalState.selectedId = id;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    notify();
  };

  const loginAs = (role: UserRole) => {
    const user = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[2];
    globalState.currentUser = user;
    globalState.isAuthenticated = true;
    ApiService.setCurrentUser(user);
    globalState.currentRoute = 'dashboard';
    notify();
  };

  const logout = () => {
    globalState.currentUser = null;
    globalState.isAuthenticated = false;
    globalState.currentRoute = 'landing';
    notify();
  };

  const toggleTheme = () => {
    globalState.isDark = !globalState.isDark;
    if (globalState.isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    notify();
  };

  const setThemePalette = (palette: ThemePalette) => {
    globalState.themePalette = palette;
    document.documentElement.setAttribute('data-theme', palette);
    localStorage.setItem('talent_theme_palette', palette);
    notify();
  };

  const setGlobalSearch = (open: boolean) => {
    globalState.searchOpen = open;
    notify();
  };

  const setQuickCreate = (open: boolean) => {
    globalState.quickCreateOpen = open;
    notify();
  };

  const setNotifications = (open: boolean) => {
    globalState.notificationsOpen = open;
    notify();
  };

  const setLoginRole = (role: UserRole) => {
    globalState.selectedRoleForLogin = role;
    notify();
  };

  return {
    ...globalState,
    navigate,
    loginAs,
    logout,
    toggleTheme,
    setThemePalette,
    setGlobalSearch,
    setQuickCreate,
    setNotifications,
    setLoginRole
  };
}
