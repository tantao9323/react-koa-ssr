const fetch = require('isomorphic-fetch');

const base = 'https://36kr.com/api';

const stringify = (body) => {
  if (!body) return '';
  return Object.entries(body)
    .map(item => `${item[0]}=${item[1]}`)
    .join('&');
};

module.exports = async (reqUrl = '', reqBody = {}, method = 'GET') => {
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
