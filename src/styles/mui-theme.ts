import { createTheme } from '@mui/material';
import colors from './colors.scss';

export const theme = createTheme({
    palette: {
        primary: {
            main: colors['color-primary']
        },
        secondary: {
            main: colors['color-secondary']
        }
    }
});
