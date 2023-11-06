import * as React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Stack from '@mui/material/Stack';

export default function MessageAlerts(props) {
  return (
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity={props.error || "error"}>
        <AlertTitle>{props.children}</AlertTitle>
      </Alert>
      {/* <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
      </Alert>
      <Alert severity="info">
        <AlertTitle>Info</AlertTitle>
      </Alert>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
      </Alert> */}
    </Stack>
  );
}
