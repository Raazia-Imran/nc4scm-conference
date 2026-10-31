import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import pages from './page-meta.json';
import eventSchema from './event-schema.txt?raw';
export default function PageMetadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const path = pathname === '/' ? '/' : pathname.replace(/\/$/, '');
    const page = (pages as Record<string, string[]>)[path];
    document.title = page?.[0] || 'Page not found | GCGC 2027';
    const set = (selector: string, content: string) => document.querySelector(selector)?.setAttribute('content', content);
    set('meta[name="description"]', page?.[1] || 'The requested conference page could not be found.');
    set('meta[property="og:title"]', document.title);
    set('meta[property="og:description"]', page?.[1] || 'Page not found.');
    const canonical = document.querySelector('link[rel="canonical"]');
    if (page) {
      const link = canonical || document.head.appendChild(document.createElement('link'));
      link.setAttribute('rel', 'canonical'); link.setAttribute('href', `https://gcgc.nc4scm.com${path}`);
      set('meta[property="og:url"]', `https://gcgc.nc4scm.com${path}`);
    } else canonical?.remove();
    let robots = document.querySelector('meta[name="robots"]');
    if (!robots) { robots = document.head.appendChild(document.createElement('meta')); robots.setAttribute('name', 'robots'); }
    robots.setAttribute('content', page && window.location.hostname === 'gcgc.nc4scm.com' ? 'index, follow' : 'noindex, follow');
    // Event schema describes the homepage; do not retain it on unrelated SPA routes.
    document.querySelectorAll('script[type="application/ld+json"]').forEach(script => script.remove());
    if (path === '/') {
      const script = document.createElement('script'); script.type = 'application/ld+json';
      script.textContent = eventSchema; document.head.appendChild(script);
    }
  }, [pathname]);
  return null;
}
