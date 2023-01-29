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
        MuiContainer: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    padding: '0 10px',
                },
            },
        },

        MuiTypography: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    marginRight: '10px'
                },
            },
        },

        // MuiButtonBase: {
        //     styleOverrides: {
        //         // Name of the slot
        //         root: {
        //             // Some CSS
        //             padding: '10px 10px 10px 0 !important'
        //         },
        //     },
        // },

        MuiCardContent: {
          styleOverrides: {
            // Name of the slot
            root: {
              // Some CSS
              height: '170px',
            },
          },
        },

        MuiBadge: {
            styleOverrides: {
                // Name of the slot
                badge: {
                    // Some CSS
                    color: '#fff',
                    top: '5px',
                    right: '5px'
                },
            },
        },

        MuiSvgIcon: {
            styleOverrides: {
                // Name of the slot
                root: {
                    // Some CSS
                    cursor: 'pointer',
                },
            },
        },

      },

});

export default theme;