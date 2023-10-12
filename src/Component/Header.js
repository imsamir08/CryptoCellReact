import React from 'react'
import {AppBar, Container, Toolbar, Typography, Select, MenuItem, createTheme, ThemeProvider} from '@mui/material';
import '../App.css' ;
import {useNavigate} from 'react-router-dom';
import { CryptoState } from '../CryptoContext';

const Header = () => {
    const navigate = useNavigate();
    const darkTheme = createTheme({
        palette:{
            mode:'dark',
        }
    });

    const {currency, setCurrency} = CryptoState();

    console.log(currency);
  return (
    <ThemeProvider theme={darkTheme}>

    <AppBar color='primary' position='static'>
        <Container >
            <Toolbar>
                <Typography onClick={() => navigate("/")} className='title' variant='h6' style={{ fontWeight: 'bold' }}>Crypto Cell</Typography>

                <Select variant='outlined' style={{
                    width: 100, height: 40, marginRight: 15,
                }}
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                >
        
                    <MenuItem value={"USD"}>USD </MenuItem>
                    <MenuItem value={"INR"}>INR</MenuItem>
                </Select>

            </Toolbar>
        </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header
