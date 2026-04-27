const API_URL = import.meta.env.VITE_API_URL;

export interface Lottery {
  id: string;
  name: string;
  prize: string;
  type: string;
  status: 'running' | 'finished';
}

export async function getLotteries(): Promise<Lottery[]> {
  const response = await fetch(`${API_URL}/lotteries`);

  if (!response.ok) {
    throw new Error('Failed to fetch lotteries');
  }

  return response.json();
}

export async function createLottery(data: { name: string; prize: string }): Promise<Lottery> {
  const response = await fetch(`${API_URL}/lotteries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, type: 'simple' }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error ?? 'Failed to create lottery');
  }

  return response.json();
}
