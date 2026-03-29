import React from 'react'

const LeftMenu = () => {
    return (
        <div className="flex flex-col gap-3 p-3">

            {/* Profile*/}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 shrink-0" />
                    <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">@kullanici</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500">Bilgisayar Müh.</p>
                    </div>
                </div>
            </div>

            {/* MENU LINKS */}
            <nav className="bg-white dark:bg-slate-800 rounded-3xl p-4 border border-slate-200 dark:border-slate-700 flex flex-col gap-1">
                {[
                    { icon: '🏠', label: 'Ana Sayfa', active: true },
                    { icon: '📝', label: 'Notlarım', active: false },
                    { icon: '➕', label: 'Yeni Not', active: false },
                    { icon: '🔖', label: 'Kaydettiklerim', active: false },
                    { icon: '⚙️', label: 'Ayarlar', active: false },
                ].map((item) => (
                    <button
                        key={item.label}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200 w-full text-left
                            ${item.active
                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                            }`}
                    >
                        <span className="text-base">{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* ISTATISTIC CARD */}
            <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-3">
                    İstatistikler
                </p>
                <div className="flex flex-col gap-2">
                    {[
                        { label: 'Toplam Not', value: '24' },
                        { label: 'Bu Ay', value: '8' },
                        { label: 'Takipçi', value: '142' },
                    ].map((stat) => (
                        <div key={stat.label} className="flex items-center justify-between">
                            <span className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</span>
                            <span className="text-sm font-bold text-slate-900 dark:text-white">{stat.value}</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default LeftMenu;