import axios from 'axios';
import { Asteroid, ApiResponse } from '@/types/asteroids';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9000/api';

export async function getAsteroids(startDate: string, endDate: string): Promise<Asteroid[]> {
  if (!startDate || !endDate) return [];

  try {
    const response = await axios.get<ApiResponse>(`${BASE_URL}/asteroids`, {
      params: { start_date: startDate, end_date: endDate, endpoint: 'feed' }
    });
    
    return Object.values(response.data.near_earth_objects).flat();
  } catch (error) {
    console.error('Failed to fetch asteroids:', error);
    return [];
  }
}