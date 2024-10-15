// app/page.tsx
import { getAsteroids } from '@/providers/asteroids';
import { Asteroid } from '@/types/asteroids';
import AsteroidList from '@/components/AsteroidList';
import { SearchForm } from '@/components/SearchForm';
import { Container, Typography, Box } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default async function Home({
  searchParams,
}: {
  searchParams: { start_date?: string; end_date?: string };
}) {
  const startDate = searchParams.start_date || '';
  const endDate = searchParams.end_date || '';
  let asteroids: Asteroid[] = [];
  let error = false;

  try {
    asteroids = await getAsteroids(startDate, endDate);
  } catch (e) {
    error = true;
  }

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Asteroids Information
      </Typography>
      <SearchForm initialStartDate={startDate} initialEndDate={endDate} />
      {error ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <ErrorOutlineIcon sx={{ fontSize: 60, color: 'error.main' }} />
          <Typography variant="h6" color="error" mt={2}>
            Oops! Something went wrong.
          </Typography>
          <Typography color="text.secondary" mt={1}>
            Please check your dates or try again later.
          </Typography>
        </Box>
      ) : (
        <AsteroidList asteroids={asteroids} />
      )}
    </Container>
  );
}
