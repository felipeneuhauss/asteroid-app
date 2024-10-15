"use client";

import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Button, Box, Alert } from '@mui/material';
import { useRouter } from 'next/navigation';

interface SearchFormProps {
  initialStartDate?: string;
  initialEndDate?: string;
}

export const SearchForm: React.FC<SearchFormProps> = ({ initialStartDate, initialEndDate }) => {
  const router = useRouter();
  const [startDate, setStartDate] = React.useState<Dayjs | null>(dayjs(initialStartDate));
  const [endDate, setEndDate] = React.useState<Dayjs | null>(dayjs(initialEndDate));
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  const handleSearch = () => {
    setErrorMessage(null); 

    if (startDate && endDate && startDate.isAfter(endDate)) {
      setErrorMessage('The start date cannot be after the end date.');
      return;
    }
    
    if (startDate && endDate && endDate.diff(startDate, 'day') > 7) {
      setErrorMessage('The date range cannot exceed 7 days.');
      return;
    }

    if (startDate && endDate) {
      const formattedStartDate = startDate.format('YYYY-MM-DD');
      const formattedEndDate = endDate.format('YYYY-MM-DD');
      router.push(`/?start_date=${formattedStartDate}&end_date=${formattedEndDate}`);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box display="flex" flexDirection="column" gap={2} alignItems="center">
        <DatePicker
          label="Start Date"
          value={startDate}
          onChange={(newValue) => setStartDate(newValue)}
          slotProps={{ textField: { fullWidth: true } }}
        />
        <DatePicker
          label="End Date"
          value={endDate}
          onChange={(newValue) => setEndDate(newValue)}
          slotProps={{ textField: { fullWidth: true } }}
        />
        {errorMessage && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {errorMessage}
          </Alert>
        )}
        <Button variant="contained" color="primary" onClick={handleSearch} fullWidth>
          Search Asteroids
        </Button>
      </Box>
    </LocalizationProvider>
  );
};
