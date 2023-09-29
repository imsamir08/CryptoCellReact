import React from 'react'
import {AppBar, Container, Toolbar, Typography, Select, MenuItem, createTheme, ThemeProvider} from '@mui/material';
import '../App.css' ;
import {useNavigate} from 'react-router-dom';
import {makeStyles} from '@mui/material/styles';
const Header = () => {
    const navigate = useNavigate();
    const darkTheme = createTheme({
        palette:{
            mode:'dark',
        }
    });

    const useStyle = makeStyles(() => ({
        App:{
            backgroundColor: "black",

        }
    }))

    const classes = useStyle();
  return (
    <ThemeProvider theme={darkTheme}>

    <AppBar color='primary' position='static'>
        <Container className={classes.App}>
            <Toolbar>
                <Typography onClick={() => navigate("/")} className='title' variant='h6' style={{ fontWeight: 'bold' }}>Crypto Cell</Typography>

                <Select variant='outlined' style={{
                    width: 100, height: 40, marginRight: 15,
                }}>
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
