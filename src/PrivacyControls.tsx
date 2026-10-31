import { useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Link, useLocation } from 'react-router-dom';
import { MAX_AGE, readPreference, savePreference } from './privacy';
export function openPrivacySettings() { window.dispatchEvent(new Event('gcgc:privacy')); }
export default function PrivacyControls() {
  const [preference, setPreference] = useState(readPreference);
  const [open, setOpen] = useState(false);
  const [storageError, setStorageError] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const loc = useLocation();
  useEffect(() => {
    const show = () => { returnFocus.current = document.activeElement as HTMLElement; setOpen(true); };
    window.addEventListener('gcgc:privacy', show);
    return () => window.removeEventListener('gcgc:privacy', show);
  }, []);
  useEffect(() => {
    if (open) dialog.current?.showModal();
    else if (dialog.current?.open) dialog.current.close();
  }, [open]);
  useEffect(() => {
    const refresh = () => {
      const current = readPreference();
      if (preference?.performance && !current?.performance) window.location.reload();
      else setPreference(current);
    };
    const remaining = preference ? Math.max(0, preference.savedAt + MAX_AGE - Date.now()) : MAX_AGE;
    const timer = window.setTimeout(refresh, Math.min(remaining + 1, 2147483647));
    window.addEventListener('storage', refresh);
    window.addEventListener('focus', refresh);
    return () => { clearTimeout(timer); window.removeEventListener('storage', refresh); window.removeEventListener('focus', refresh); };
  }, [preference]);
  function trapFocus(event: KeyboardEvent<HTMLDialogElement>) {
    if (event.key !== 'Tab') return;
    const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'));
    const first = controls[0]; const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
  }
  function choose(performance: boolean) {
    const saved = savePreference(performance);
    if (!saved) { setStorageError(true); return; }
    if (preference?.performance && !performance) { window.location.reload(); return; }
    setPreference(readPreference()); setOpen(false);
  }
  return <>
    {preference?.performance && <SpeedInsights route={loc.pathname} beforeSend={event => {
      if (!readPreference()?.performance) return null;
      const url = new URL(event.url); url.search = ''; url.hash = '';
      return { ...event, url: url.href };
    }} />}
    <dialog ref={dialog} className="privacy-dialog" aria-labelledby="privacy-title" onKeyDown={trapFocus} onCancel={() => setOpen(false)} onClose={() => { setOpen(false); returnFocus.current?.focus(); }}>
      <h2 id="privacy-title">Your privacy choices</h2>
      <p>The website works without optional performance monitoring. If allowed, Vercel Speed Insights measures loading speed and page performance. It is off until you choose to allow it.</p>
      <p>We remember your selection on this browser for up to 180 days. You can change it from the footer at any time.</p>
      <p><Link to="/cookies" onClick={() => setOpen(false)}>Read about cookies and storage</Link></p>
      <div className="privacy-actions"><button onClick={() => choose(false)}>Essential only</button><button onClick={() => choose(true)}>Allow performance monitoring</button><button onClick={() => setOpen(false)}>Close settings</button></div>
      {storageError && <p role="alert">Your browser could not save the choice. Optional monitoring remains off. Enable browser storage to save a preference.</p>}
    </dialog>
  </>;
}
