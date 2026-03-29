'use client';

import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/store';
import { fetchFeedNotes, resetFeed } from '@/store/noteSlice';
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { feedNotes, feedLoading, feedPagination } = useSelector(
    (state: RootState) => state.notes
  );

  useEffect(() => {
    dispatch(fetchFeedNotes(1));
    return () => {
      dispatch(resetFeed());
    };
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (!feedLoading && feedPagination.hasMore) {
      dispatch(fetchFeedNotes(feedPagination.currentPage + 1));
    }
  }, [dispatch, feedLoading, feedPagination]);

  const { triggerRef } = useInfiniteScroll(loadMore, feedPagination.hasMore, feedLoading);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 p-6">
      <div className="max-w-2xl mx-auto">

        {feedLoading && feedNotes.length === 0 && (
          <div className="flex flex-col gap-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 animate-pulse"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700" />
                  <div className="w-28 h-3 rounded-full bg-slate-200 dark:bg-slate-700" />
                </div>
                <div className="w-3/4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 mb-3" />
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-700 mb-2" />
                <div className="w-2/3 h-3 rounded-full bg-slate-200 dark:bg-slate-700" />
              </div>
            ))}
          </div>
        )}

        {/* NOTE LIST */}
        <div className="flex flex-col gap-4">
          {feedNotes.map((note, index) => (
            <div
              key={note.id}
              className="group bg-white dark:bg-slate-800 rounded-3xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 animate-fadeSlideIn"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <div className="flex items-start justify-between gap-4">

                {/*  Avatar + Username */}
                <div className="flex items-center gap-2.5 shrink-0">
                  {note.user?.profile?.avatarUrl ? (
                    <img
                      src={note.user.profile.avatarUrl}
                      alt={note.user.profile.username}
                      className="w-9 h-9 rounded-full object-cover ring-2 ring-blue-100 dark:ring-blue-900"
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shrink-0">
                      {note.user?.name?.charAt(0).toUpperCase() ?? '?'}
                    </div>
                  )}
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    @{note.user?.profile?.username ?? 'kullanıcı'}
                  </span>
                </div>

                {/* DATE */}
                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1 shrink-0">
                  {note.createdAt
                    ? new Date(note.createdAt).toLocaleDateString('tr-TR')
                    : 'Yeni'}
                </span>
              </div>

              <div className="my-3 border-t border-slate-100 dark:border-slate-700/50" />

              {/* NOTE CONTENT */}
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-1">
                  {note.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {note.content}
                </p>
              </div>

              {/* DOWN DATA */}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                  {note.user?.profile?.department ?? ''}
                </span>
                {note.isPublic && (
                  <span className="text-[10px] px-2.5 py-1 rounded-full font-semibold bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                    Herkese Açık
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Infinite scroll trigger */}
        {feedPagination.hasMore && (
          <div ref={triggerRef} className="flex justify-center py-10">
            {feedLoading && (
              <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            )}
          </div>
        )}

        {!feedPagination.hasMore && feedNotes.length > 0 && (
          <p className="text-center text-slate-400 dark:text-slate-500 text-sm py-8">
            Tüm notlar yüklendi ✓
          </p>
        )}

        {!feedLoading && feedNotes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="text-6xl mb-4 opacity-20">📝</div>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic">
              Henüz hiç not yok.
            </p>
          </div>
        )}
      </div>


    </div>
  );
}