// app/home/layout.tsx
import { ReactNode } from 'react';
import LeftMenu from '@/components/leftMenu';

export default function HomeLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">

-          

            <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-[260px_1fr_260px] gap-6 items-start">

                {/* LEFT SIDEBAR */}
                <aside className="sticky top-[88px] h-fit">
                    <LeftMenu />
                </aside>

                {/* FEED ALL NOTES */}
                <main>
                    {children}
                    
                </main>

                {/* RIGHT SIDEBAR */}
                <aside className="sticky top-[88px] h-fit">
                    <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700">
                        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                            Yakında
                        </p>
                    </div>
                </aside>

            </div>
        </div>
    );
}