const integer = (value) => /^\d+$/.test(String(value ?? '')) ? Number(value) : NaN;

export default async function handler(request, response) {
  const z = integer(request.query.z);
  const x = integer(request.query.x);
  const y = integer(request.query.y);
  const maxTile = Number.isFinite(z) ? 2 ** z : 0;

  if (!Number.isInteger(z) || z < 1 || z > 19 || !Number.isInteger(x) || !Number.isInteger(y) || x < 0 || y < 0 || x >= maxTile || y >= maxTile) {
    return response.status(400).json({ error: 'Invalid tile coordinates' });
  }

  const upstream = await fetch(`https://tile.openstreetmap.org/${z}/${x}/${y}.png`, {
    headers: { 'User-Agent': 'RATA mobile prototype/1.0' }
  });

  if (!upstream.ok) {
    return response.status(502).json({ error: 'Map tile unavailable' });
  }

  response.setHeader('Content-Type', upstream.headers.get('content-type') || 'image/png');
  response.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  return response.status(200).send(Buffer.from(await upstream.arrayBuffer()));
}
