import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#01579b',
        },
        secondary: {
            main: '#ff9800',
            contrastText: '#fff',
        },
    },
});

export default theme;