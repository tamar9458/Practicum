import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary">
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/tamar9458">
             GitHub
            </Link>{' '}
            {"2024"}
            {'.'}
        </Typography>
    );
}

const defaultTheme = createTheme();

export default () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Box
                component="footer"
                sx={{
                    py: 3, px: 2, mt: 'auto',
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[200]
                            : theme.palette.grey[800],
                }} >
                <Container maxWidth="sm">
                    <Typography variant="body1">
                        Developing.Bussines.Money.
                    </Typography>
                    <Copyright />
                </Container>
            </Box>
        </ThemeProvider>
    );
}