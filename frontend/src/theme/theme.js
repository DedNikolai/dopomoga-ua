import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#01579b',
            green: '#4caf50',
            red: '#f44336',
        },
        secondary: {
            main: '#ff9800',
            contrastText: '#fff',
        },

        success: {
            main: '#4caf50'
        }
    },

    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',

    components: {
        // Name of the component
        MuiCardContent: {
          styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              height: '120px',
            },
          },
        },
      },
});

export default theme;