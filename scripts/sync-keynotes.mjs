import { readFile, writeFile } from 'node:fs/promises';

// Read only published public fields; no CMS credential enters the build.
const file = new URL('../src/conference-content.json', import.meta.url);
const snapshot = JSON.parse(await readFile(file, 'utf8'));
const query = '*[_id == "event-gcgc-2027" && _type == "event"][0]{keynoteProfiles,posterImage{alt,asset->{_id,url,metadata{dimensions{width,height}}}}}';
const url = new URL('https://dxinqb51.api.sanity.io/v2024-01-01/data/query/production');
url.searchParams.set('query', query);
url.searchParams.set('perspective', 'published');
const safeUrl = value => {
  try { return new URL(value).protocol === 'https:'; } catch { return false; }
};
const safeSanityImageUrl = value => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'https:' &&
      parsed.hostname === 'cdn.sanity.io' &&
      parsed.pathname.startsWith('/images/dxinqb51/production/');
  } catch {
    return false;
  }
};
const validProfile = profile => profile &&
  ['_key', 'name', 'initials', 'role', 'affiliation', 'bio', 'attendeeValue'].every(key => typeof profile[key] === 'string' && profile[key].trim()) &&
  safeUrl(profile.linkedin) && new URL(profile.linkedin).hostname === 'www.linkedin.com' &&
  Array.isArray(profile.expertise) && profile.expertise.length > 0 && profile.expertise.every(area => typeof area === 'string') &&
  Array.isArray(profile.sources) && profile.sources.length > 0 && profile.sources.every(source => source && typeof source._key === 'string' && typeof source.label === 'string' && safeUrl(source.url));

try {
  const response = await fetch(url, { signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new Error(`CMS returned ${response.status}`);
  const event = (await response.json()).result;
  const next = { ...snapshot };

  const profiles = event?.keynoteProfiles;
  if (Array.isArray(profiles) && profiles.length > 0 &&
      profiles.every(validProfile) &&
      new Set(profiles.map(profile => profile._key)).size === profiles.length) {
    next.keynoteProfiles = profiles;
    console.log('Loaded published Sanity keynote profiles.');
  } else {
    console.warn('Using the reviewed keynote snapshot because published CMS profiles were unavailable or invalid.');
  }

  const poster = event?.posterImage;
  const asset = poster?.asset;
  if (asset && typeof asset._id === 'string' && safeSanityImageUrl(asset.url)) {
    const dimensions = asset.metadata?.dimensions || {};
    next.posterImage = {
      url: asset.url,
      alt: typeof poster.alt === 'string' && poster.alt.trim()
        ? poster.alt.trim()
        : 'Official GCGC 2027 conference poster',
      width: Number.isInteger(dimensions.width) && dimensions.width > 0 ? dimensions.width : 1152,
      height: Number.isInteger(dimensions.height) && dimensions.height > 0 ? dimensions.height : 2048,
    };
    console.log('Loaded the published GCGC 2027 poster from Sanity.');
  } else {
    next.posterImage = null;
    console.warn('No published GCGC 2027 poster image found in Sanity; the page will show an accessible placeholder instead of a broken image.');
  }

  await writeFile(file, JSON.stringify(next, null, 2) + '\n');
} catch {
  // A CMS outage cannot take down the static conference site.
  // The committed snapshot remains available and the poster UI fails closed.
  console.warn('Using the reviewed conference content snapshot because Sanity was unavailable.');
}
