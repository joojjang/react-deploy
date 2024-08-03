import { apiOptionLocalStorage } from '@/utils/storage';

const BASE_URL_KIM = process.env.REACT_APP_BASE_URL_KIM;
const BASE_URL_PARK = process.env.REACT_APP_BASE_URL_PARK;
const BASE_URL_AHN = process.env.REACT_APP_BASE_URL_AHN;
const BASE_URL_LEE = process.env.REACT_APP_BASE_URL_LEE;

const apiOption = apiOptionLocalStorage.get() || '김은선';

export const BASE_URL =
  apiOption === '김은선'
    ? BASE_URL_KIM
    : apiOption === '박준석'
      ? BASE_URL_PARK
      : apiOption === '안재민'
        ? BASE_URL_AHN
        : apiOption === '이도훈'
          ? BASE_URL_LEE
          : BASE_URL_KIM;

console.log('BASE_URL: ', BASE_URL); // test

export default async (req, res) => {
  const { method, body, headers } = req;

  try {
    const response = await fetch(`${BASE_URL}${req.url}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: method === 'POST' || method === 'PUT' ? JSON.stringify(body) : null,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
