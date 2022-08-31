import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Preloader() {
    return (
        <Stack
            sx={{ color: 'grey.500', width: '100%', height: '50vh', justifyContent: 'center', alignItems: 'center'}}
            spacing={4}
            direction="row"
        >
            <CircularProgress />
        </Stack>
    );
}
