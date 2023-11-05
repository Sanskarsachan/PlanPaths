import * as React from 'react';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

export default function Loader() {
  return (
    <Box sx={{mt: '64px', marginwidth: '100%' }}>
      <LinearProgress />
    </Box>
  );
}
