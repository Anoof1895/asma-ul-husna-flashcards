"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "asma_ul_husna_study_progress_v1";

interface StoredProgress {
  memorized: number[];
  favorites: number[];
  lastActiveId?: number;
}

export function useStudyProgress() {
  const [memorized, setMemorized] = useState<Set<number>>(new Set());
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  const [lastActiveId, setLastActiveId] = useState<number | undefined>(undefined);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data: StoredProgress = JSON.parse(raw);
        if (Array.isArray(data.memorized)) {
          setMemorized(new Set(data.memorized));
        }
        if (Array.isArray(data.favorites)) {
          setFavorites(new Set(data.favorites));
        }
        if (typeof data.lastActiveId === "number") {
          setLastActiveId(data.lastActiveId);
        }
      }
    } catch (e) {
      console.warn("Failed to read progress from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Save changes to localStorage
  const saveToStorage = useCallback(
    (newMemorized: Set<number>, newFavorites: Set<number>, lastId?: number) => {
      try {
        const payload: StoredProgress = {
          memorized: Array.from(newMemorized),
          favorites: Array.from(newFavorites),
          lastActiveId: lastId,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
      } catch (e) {
        console.warn("Failed to save progress to localStorage", e);
      }
    },
    []
  );

  const toggleMemorized = useCallback(
    (id: number) => {
      setMemorized((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        saveToStorage(next, favorites, lastActiveId);
        return next;
      });
    },
    [favorites, lastActiveId, saveToStorage]
  );

  const toggleFavorite = useCallback(
    (id: number) => {
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(id)) {
          next.delete(id);
        } else {
          next.add(id);
        }
        saveToStorage(memorized, next, lastActiveId);
        return next;
      });
    },
    [memorized, lastActiveId, saveToStorage]
  );

  const setLastActive = useCallback(
    (id: number) => {
      setLastActiveId(id);
      saveToStorage(memorized, favorites, id);
    },
    [memorized, favorites, saveToStorage]
  );

  const resetAllProgress = useCallback(() => {
    setMemorized(new Set());
    setFavorites(new Set());
    setLastActiveId(undefined);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn("Failed to reset localStorage", e);
    }
  }, []);

  return {
    isHydrated,
    memorized,
    favorites,
    lastActiveId,
    isMemorized: (id: number) => memorized.has(id),
    isFavorite: (id: number) => favorites.has(id),
    toggleMemorized,
    toggleFavorite,
    setLastActive,
    resetAllProgress,
    memorizedCount: memorized.size,
    favoritesCount: favorites.size,
  };
}
