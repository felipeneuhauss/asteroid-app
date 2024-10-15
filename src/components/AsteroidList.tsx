'use client';

import { useState } from 'react';
import { Asteroid } from '@/types/asteroids';
import { useFavorites } from '@/hooks/use-favorites';
import { useAsteroids } from '@/hooks/use-asteroids';
import { 
  List, 
  ListItem, 
  ListItemText, 
  IconButton, 
  Typography, 
  Paper,
  Grid
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AsteroidDetailsDialog from './AsteroidDetailsDialog';

export default function AsteroidList({ asteroids }: { asteroids: Asteroid[] }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const { getAsteroid } = useAsteroids();
  const [selectedAsteroid, setSelectedAsteroid] = useState<Asteroid | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const handleAsteroidClick = async (asteroid: Asteroid) => {
    const details = await getAsteroid(asteroid.id);
    setSelectedAsteroid(details);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedAsteroid(null);
  };

  const handleFavoriteClick = (event: React.MouseEvent, asteroidId: string) => {
    event.stopPropagation();
    const isFavorite = favorites.some((fav) => fav.asteroid_id === asteroidId);
    return isFavorite ? removeFavorite(asteroidId) : addFavorite(asteroidId);
  };

  return (
    <>
      <List>
        {asteroids.map((asteroid) => {
          const isFavorite = favorites.some((fav) => fav.asteroid_id === asteroid.id);
          return (
            <Paper key={asteroid.id} elevation={2} sx={{ mb: 2, p: 2 }}>
              <ListItem
                disablePadding
                secondaryAction={
                  <IconButton 
                    edge="end" 
                    onClick={(event) => handleFavoriteClick(event, asteroid.id)}
                    color={isFavorite ? "secondary" : "default"}
                  >
                    {isFavorite ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>
                }
                onClick={() => handleAsteroidClick(asteroid)}
                sx={{ cursor: 'pointer' }}
              >
                <ListItemText
                  primary={<Typography variant="h6">{asteroid.name}</Typography>}
                  secondary={
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          Estimated diameter: {asteroid.estimated_diameter.meters.estimated_diameter_max.toFixed(2)} meters
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          Potentially hazardous: {asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography variant="body2">
                          Next close approach: {new Date(asteroid.close_approach_data[0].close_approach_date).toLocaleDateString()}
                        </Typography>
                      </Grid>
                    </Grid>
                  }
                />
              </ListItem>
            </Paper>
          );
        })}
      </List>

      <AsteroidDetailsDialog 
        asteroid={selectedAsteroid}
        open={openDialog}
        onClose={handleCloseDialog}
      />
    </>
  );
}
