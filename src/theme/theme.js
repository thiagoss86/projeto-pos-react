import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#6d7cff' },
        error: { main: '#ff5a69' },
        background: {
            default: '#0b0b12',
            paper: '#14141f',
        },
        text: {
            primary: '#e7e7f7',
            secondary: '#a4a4bd',
        },
    },
    shape: {
        borderRadius: 12,
    },
    typography: {
        fontFamily: [
            'Inter',
            'system-ui',
            '-apple-system',
            'Roboto',
            'Arial',
            'sans-serif',
        ].join(','),
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    border: '1px solid #24243a',
                },
            },
        },
    },
});