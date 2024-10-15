import { useState, useEffect } from 'react';
import axios from 'axios';
import { Asteroid, ApiResponse } from '../types/asteroids';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9000/api';

export const useAsteroids = () => {
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchAsteroids = async (startDate: string, endDate: string) => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(`${BASE_URL}/asteroids`, {
        params: { start_date: startDate, end_date: endDate }
      });
      
      // Flatten the near_earth_objects object into a single array
      const allAsteroids = Object.values(response.data.near_earth_objects).flat();
      setAsteroids(allAsteroids);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('An error occurred'));
    } finally {
      setLoading(false);
    }
  };

  const getAsteroid = async (id: string): Promise<Asteroid> => {
    try {
      const response = await axios.get<Asteroid>(`${BASE_URL}/asteroids/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching asteroid details:', error);
      throw error;
    }
  };

  return { asteroids, loading, error, fetchAsteroids, getAsteroid };
};
