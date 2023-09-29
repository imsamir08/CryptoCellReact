
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './Pages/Homepage';
import CoinPage from './Pages/CoinPage';
import Header from './Component/Header';
import { createTheme, ThemeProvider} from '@mui/material';
import {makeStyles} from '@mui/material/styles';
function App() {

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

    <div className={classes.App}>
      <BrowserRouter>
          <Header/>
        <Routes>
          <Route exact path='/' Component={Homepage}/>
          <Route exact path='/coins/:id' Component={CoinPage}/>

        </Routes>
      </BrowserRouter>
    </div>
    // </ThemeProvider>
  );
}

export default App;
