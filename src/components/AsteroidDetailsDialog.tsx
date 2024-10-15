import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid
} from '@mui/material';
import { Asteroid } from '@/types/asteroids';

interface AsteroidDetailsDialogProps {
  asteroid: Asteroid | null;
  open: boolean;
  onClose: () => void;
}

export default function AsteroidDetailsDialog({ asteroid, open, onClose }: AsteroidDetailsDialogProps) {
  if (!asteroid) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{asteroid.name}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>ID:</strong> {asteroid.id}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Absolute Magnitude:</strong> {asteroid.absolute_magnitude_h}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Estimated Diameter:</strong> {asteroid.estimated_diameter.kilometers.estimated_diameter_min.toFixed(2)} - {asteroid.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} km
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Potentially Hazardous:</strong> {asteroid.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>Close Approaches:</strong>
            </Typography>
            <ul>
              {asteroid.close_approach_data.slice(0, 5).map((approach, index) => (
                <li key={index}>
                  <Typography variant="body2">
                    Date: {approach.close_approach_date_full}, 
                    Distance: {parseFloat(approach.miss_distance.kilometers).toFixed(0)} km
                  </Typography>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
