const TIMEOUT = 10000;

async function Get(url, headers = new Headers()) {
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'application/json');
  headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
  );
  headers.set('Pragma', 'no-cache');
  headers.set('Expires', '0');

  let response = await fetch(url, {
    method: 'GET',
    timeout: TIMEOUT,
    headers: headers,
  });
  let respJson = await response.json();
  return respJson;
}

async function Post(url, body = {}, headers = new Headers()) {
  headers.set('Accept', 'application/json');
  headers.set('Content-Type', 'multipart/form-data');
  headers.set(
    'Cache-Control',
    'no-store, no-cache, must-revalidate, post-check=0, pre-check=0',
  );
  headers.set('Pragma', 'no-cache');
  headers.set('Expires', '0');

  let data = new FormData();
  for (let key in body) {
    data.append(key, body[key]);
  }

  let response = await fetch(url, {
    method: 'POST',
    timeout: TIMEOUT,
    headers: headers,
    body: data,
  });
  let respJson = await response.json();
  return respJson;
}

module.exports = {
  Get: Get,
  Post: Post,
};
