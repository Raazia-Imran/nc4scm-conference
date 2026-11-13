import { readFile, writeFile } from 'node:fs/promises';

// Read only public, published fields; no CMS credential enters the build.
const file = new URL('../src/conference-content.json', import.meta.url);
const snapshot = JSON.parse(await readFile(file, 'utf8'));
const query = '*[_id == "event-gcgc-2027" && _type == "event"][0]{keynoteProfiles}';
const url = new URL('https://dxinqb51.api.sanity.io/v2024-01-01/data/query/production');
url.searchParams.set('query', query);
url.searchParams.set('perspective', 'published');
const safeUrl = value => {
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
};
const validProfile = profile => profile &&
  ['_key', 'name', 'initials', 'role', 'affiliation', 'bio', 'attendeeValue'].every(key => typeof profile[key] === 'string' && profile[key].trim()) &&
  safeUrl(profile.linkedin) && new URL(profile.linkedin).hostname === 'www.linkedin.com' &&
  Array.isArray(profile.expertise) && profile.expertise.length > 0 && profile.expertise.every(area => typeof area === 'string') &&
  Array.isArray(profile.sources) && profile.sources.length > 0 && profile.sources.every(source => source && typeof source._key === 'string' && typeof source.label === 'string' && safeUrl(source.url));
try {
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`CMS returned ${response.status}`);
  const profiles = (await response.json()).result?.keynoteProfiles;
  if (!Array.isArray(profiles) || profiles.length === 0 || !profiles.every(validProfile) || new Set(profiles.map(profile => profile._key)).size !== profiles.length) throw new Error('Published keynote profiles are missing or invalid');
  await writeFile(file, JSON.stringify({ ...snapshot, keynoteProfiles: profiles }, null, 2) + '\n');
  console.log('Loaded published Sanity keynote profiles.');
} catch {
  // A CMS outage cannot take down the static conference site.
  console.warn('Using the reviewed keynote snapshot because published CMS profiles were unavailable or invalid.');
}
