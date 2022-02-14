import {createSitemap} from 'sitemap'

export async function get(req, res) {
  var sitemap = createSitemap({
    hostname: req.url.origin,
    cacheTime: 60*10*1000, // 10 min
    urls: [],
  });

  sitemap.add({
    url: '/',
    priority: 0.8,
    changefreq: 'weekly',
    lastmod: new Date().toISOString(),
  });

  const xml = sitemap.toXML();

  return {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': `max-age=0, s-maxage=600`
    },
    body: xml,
  };
}