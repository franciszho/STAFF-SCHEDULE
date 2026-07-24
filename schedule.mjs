import { getStore } from '@netlify/blobs';

const headers = {
  'content-type': 'application/json; charset=utf-8',
  'cache-control': 'no-store',
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, OPTIONS',
  'access-control-allow-headers': 'content-type'
};

export default async (request) => {
  if (request.method === 'OPTIONS') return new Response('', { status: 204, headers });
  const store = getStore({ name: 'staff-scheduler-live', consistency: 'strong' });
  const key = 'shared-schedule';
  try {
    if (request.method === 'GET') {
      const raw = await store.get(key);
      return new Response(JSON.stringify({ ok: true, data: raw ? JSON.parse(raw) : null }), { headers });
    }
    if (request.method === 'POST') {
      const body = await request.json();
      if (!body || typeof body !== 'object' || !body.data) {
        return new Response(JSON.stringify({ ok: false, error: 'Invalid payload' }), { status: 400, headers });
      }
      const payload = { ...body.data, serverUpdatedAt: new Date().toISOString() };
      await store.set(key, JSON.stringify(payload));
      return new Response(JSON.stringify({ ok: true, updatedAt: payload.serverUpdatedAt }), { headers });
    }
    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed' }), { status: 405, headers });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ ok: false, error: error?.message || 'Server error' }), { status: 500, headers });
  }
};
