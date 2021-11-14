interface JsonRequestInit extends RequestInit {
  body?: any;
  type?: string;
}
export const fetchAsync = async (url: string, options: JsonRequestInit = {}) => {
  const type = options.type || 'json';
  if (type === 'json') {
    options.body = JSON.stringify(options.body);
    options.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.headers,
    };
  }

  const response = await fetch(url, {
    ...options,
  });
  const contentType = response.headers.get('Content-Type') || '';
  let result: any;

  try {
    if (/application\/json/.test(contentType)) {
      result = await response.json();
    } else {
      result = await response.text();
    }
  } catch (err) {
    console.error('Invalid data type');
  }
  if (response.ok) {
    return result;
  } else {
    // eslint-disable-next-line no-throw-literal
    throw { status: response.status, headers: response.headers, data: result };
  }
};
