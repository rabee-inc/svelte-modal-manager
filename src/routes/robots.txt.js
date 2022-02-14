
export async function get(req, res) {
  var lines = [
    `# https://www.robotstxt.org/robotstxt.html`,
    `User-agent: *`,
    `Disallow:`,
    `Sitemap: ${req.url.origin}/sitemap.xml`,
  ];

  return {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
    body: lines.join('\n'),
  };
}
