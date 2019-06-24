import fetch from 'isomorphic-fetch';
import config from '../../build/config';

const base = config[process.env.NODE_ENV].api || '/api';

const stringify = (body) => {
  if (!body) return '';
  return Object.entries(body)
    .map(item => `${item[0]}=${item[1]}`)
    .join('&');
};

export default async (reqUrl = '', reqBody = {}, method = 'GET') => {
  let url = reqUrl;
  let body = reqBody;
  if (method === 'GET') {
    url += `?${stringify(body)}`;
    body = null;
  }
  const res = await fetch(base + url, {
    credentials: 'include',
    method,
    ...(body ? { body } : {}),
  });
  const result = await res.json();
  return result;
};
