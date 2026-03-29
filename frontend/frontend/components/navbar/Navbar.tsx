"use client";

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { getProfile } from "@/store/profileSlice";
import { useRouter } from 'next/navigation';
import ThemeToggle from '../themeButton';
import { logoutUser } from '@/store/authSlice';

// --- CONFIGURATION ---
const NAVBAR_CONFIG = {
  LOGO: {
    TITLE: "Note",
    SUBTITLE: "App",
    INITIAL: "N",
    PATH: "/home",
  },
  USER_DEFAULT: {
    NAME: "Kullanıcı",
    DEPT: "Öğrenci",
    INITIAL: "U",
  },
  MENU_ITEMS: [
    { id: "profile", label: "Profilim", icon: "👤", path: "/my-profile" },
    { id: "notes", label: "Notlarım", icon: "📝", path: "/notes" },
    { id: "settings", label: "Ayarlar", icon: "⚙️", path: "/settings" },
    { id: "favorites", label: "Favoriler", icon: "🌟", path: "/favorites" },
  ],
  LOGOUT: {
    LABEL: "Çıkış Yap",
    ICON: "🚪",
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { username, avatarUrl, department } = useSelector(
    (state: RootState) => state.profile
  );

  useEffect(() => {
    if (!username) {
      dispatch(getProfile());
    }
  }, [dispatch, username]);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await dispatch(logoutUser()).unwrap();
      setIsMenuOpen(false);
      router.push('/login');
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <div
            onClick={() => router.push(NAVBAR_CONFIG.LOGO.PATH)}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:rotate-6 transition-transform">
              <span className="text-white font-bold text-xl">{NAVBAR_CONFIG.LOGO.INITIAL}</span>
            </div>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {NAVBAR_CONFIG.LOGO.TITLE}
              <span className="text-blue-600">{NAVBAR_CONFIG.LOGO.SUBTITLE}</span>
            </span>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">

            {/* THEME TOGGLE */}
            <ThemeToggle />

            {/* USER SECTION */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center group focus:outline-none"
              >
                <div className={`w-10 h-10 rounded-full border-2 ${isMenuOpen ? 'border-blue-500' : 'border-transparent'} group-hover:border-blue-500 transition-all p-0.5 overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center`}>
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="Avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-sm font-bold text-slate-500 dark:text-slate-400">
                      {username?.charAt(0).toUpperCase() || NAVBAR_CONFIG.USER_DEFAULT.INITIAL}
                    </span>
                  )}
                </div>
              </button>

              {/* DROPDOWN MENU */}
              {isMenuOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsMenuOpen(false)} />

                  <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-700 py-4 z-20 animate-fadeIn">

                    {/* USER INFO */}
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700/50 flex flex-col items-center">
                      <div className="w-16 h-16 rounded-full bg-blue-50 dark:bg-slate-900 mb-3 overflow-hidden border-2 border-blue-100 dark:border-slate-700 flex items-center justify-center">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl font-black text-blue-600 uppercase">
                            {username?.charAt(0) || NAVBAR_CONFIG.USER_DEFAULT.INITIAL}
                          </span>
                        )}
                      </div>
                      <p className="text-base font-bold text-slate-900 dark:text-white">
                        @{username || NAVBAR_CONFIG.USER_DEFAULT.NAME}
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        {department || NAVBAR_CONFIG.USER_DEFAULT.DEPT}
                      </p>
                    </div>

                    {/* GRID ACTIONS */}
                    <div className="grid grid-cols-2 gap-3 px-4 mt-4">
                      {NAVBAR_CONFIG.MENU_ITEMS.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => { router.push(item.path); setIsMenuOpen(false); }}
                          className="p-3 bg-slate-50 dark:bg-slate-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-2xl transition-all border border-transparent hover:border-blue-100 dark:hover:border-blue-800 text-left"
                        >
                          <div className="text-lg mb-1">{item.icon}</div>
                          <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tighter">
                            {item.label}
                          </p>
                        </button>
                      ))}
                    </div>

                    {/* LOGOUT */}
                    <div className="mt-4 px-4">
                      <button
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                        className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoggingOut ? (
                          <div className="w-4 h-4 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <span>{NAVBAR_CONFIG.LOGOUT.ICON}</span>
                        )}
                        <span>{isLoggingOut ? 'Çıkış yapılıyor...' : NAVBAR_CONFIG.LOGOUT.LABEL}</span>
                      </button>
                    </div>

                  </div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;