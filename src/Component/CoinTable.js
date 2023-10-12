import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext'
import { CoinList } from '../Config/Api'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Container, LinearProgress, TableCell, TableContainer, TableHead, TableRow, Typography, Table, TableBody } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import Pagination from '@mui/material/Pagination';

export const numWithComma = (value) => {
  if (value !== undefined) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  // return ''; 
};
const CoinTable = () => {
  const { currency, symbol } = CryptoState()
  const [coins, setCoins] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency));
    setCoins(data)
    setLoading(false)
  };
  console.log(coins)

  useEffect(() => {
    fetchCoins()
  }, [currency])

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    }
  });

  const handleSearch = () => {
    return coins.filter((coin) =>
      coin.name.toLowerCase().includes(search)
      || coin.symbol.toLowerCase().includes(search)
      )
  };

  const navigate = useNavigate();
  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: "center" }}>
        <Typography variant='h4' style={{ margin: 18, fontFamily: "Montserrat" }}>
          CryptoCurrency Prices by Market Cap
        </Typography>

        <TextField label="Search For A Crypto Currency" variant="outlined" style={{ margin: 20, width: "100%" }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow>
                  {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700", fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "Coin" ? "" : "right"}>
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className='table'>
                {handleSearch()
                .slice((page-1)*10 , (page-1)*10+10)
                .map((row) => {
                  const profit = row.price_change_percentage_24th > 0;
                  return (
                    <TableRow className='row-item'
                      onClick={() => navigate(`/coins/${row.id}`)}
                      key={row.name}
                    >
                      <TableCell
                        component='th'
                        scope='row'
                        style={{
                          display: "flex",
                          gap: 15,

                        }}

                      >
                        <img src={row?.image} alt={row.name} height="50" style={{ marginBottom: 10 }} />

                        <div
                          style={{ display: "flex", flexDirection: "column",  }}>
                          <span
                            style={{ textTransform: "uppercase", fontSize: 22, }}
                          >
                            {row.symbol}
                          </span>

                          <span style={{ color: "red" }}>{row.name}</span>

                        </div>

                      </TableCell>
                      <TableCell align="right">
                        {symbol}{" "}
                        {numWithComma(row.current_price)}
                      </TableCell>

                      <TableCell align="right"
                      style={{color: profit> 0 ? "green":"red", fontWeight: 500}}>
                        {profit && "+"}
                        {row.price_change_percentage_24th}%
                      </TableCell>
                      
                      <TableCell align='right'
                      >
                        {symbol}{" "}
                        {numWithComma(row.market_cap.toString().slice(0, -6))}
                      </TableCell>

                        
                    </TableRow>
                  )
                })}

              </TableBody>
            </Table>
          )}
        </TableContainer>
        
        <Pagination className='pagination'
  count = {(handleSearch()?.length/10).toFixed(0)}

          onChange={(_, value) =>{
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
}

export default CoinTable
