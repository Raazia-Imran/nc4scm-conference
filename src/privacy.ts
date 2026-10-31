export const PRIVACY_KEY = 'gcgc-privacy-v1';
export const MAX_AGE = 180 * 24 * 60 * 60 * 1000;
export type Preference = { version: 1; performance: boolean; savedAt: number };
export function readPreference(): Preference | null {
  try {
    const value = JSON.parse(localStorage.getItem(PRIVACY_KEY) || 'null');
    if (value?.version === 1 && typeof value.performance === 'boolean' && Number.isFinite(value.savedAt) && value.savedAt <= Date.now() && Date.now() - value.savedAt < MAX_AGE) return value;
    localStorage.removeItem(PRIVACY_KEY);
  } catch { /* Private browsing or blocked storage keeps monitoring off. */ }
  return null;
}
export function savePreference(performance: boolean): boolean {
  try {
    localStorage.setItem(PRIVACY_KEY, JSON.stringify({ version: 1, performance, savedAt: Date.now() }));
    return true;
  } catch { return false; }
}
