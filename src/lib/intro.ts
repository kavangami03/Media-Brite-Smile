"use client";

import { useEffect, useState } from "react";

/**
 * Coordinates the preloader with the hero entrance.
 * The preloader calls `markIntroDone()` as its curtain lifts;
 * hero animations wait on `introDone` / `useIntroReady()` before they start.
 */
let resolveIntro: () => void = () => {};
let finished = false;

export const introDone: Promise<void> =
  typeof window === "undefined" ? Promise.resolve() : new Promise<void>((r) => (resolveIntro = r));

export function markIntroDone() {
  finished = true;
  resolveIntro();
}

export const isIntroDone = () => finished;

export function useIntroReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    introDone.then(() => alive && setReady(true));
    return () => {
      alive = false;
    };
  }, []);
  return ready;
}
