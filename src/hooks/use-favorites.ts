// src/hooks/useFavorites.ts
import { useState, useEffect } from 'react';
import axios from 'axios';
import { FavoriteAsteroid } from '@/types/asteroids';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:9000/api';


export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteAsteroid[]>([]);
  const [error, setError] = useState<Error | null>(null);

  const fetchFavorites = async (): Promise<void> => {
    try {
      const response = await axios.get<FavoriteAsteroid[]>(`${BASE_URL}/asteroids/favorites`);
      setFavorites(response.data);
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Error fetching favorites.'));
    }
  };

  const addFavorite = async (asteroidId: string): Promise<void> => {
    try {;
      await axios.post(`${BASE_URL}/asteroids/favorites`, { asteroid_id: asteroidId });
      fetchFavorites();
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Error adding to favorites.'));
    }
  };

  const removeFavorite = async (id: string): Promise<void> => {
    try {
      await axios.delete(`${BASE_URL}/asteroids/favorites/${id}`);
      fetchFavorites();
    } catch (error) {
      setError(error instanceof Error ? error : new Error('Error removing favorite.'));
    }
  };

  useEffect(() => {
      fetchFavorites();   
  }, []);

  return { favorites, error, addFavorite, removeFavorite };
};
