import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../Config/Api';
import { LinearProgress, Typography } from '@mui/material';
import { CryptoState } from '../CryptoContext';
import { numWithComma } from '../Component/CoinTable';
import CoinInfo from './CoinInfo';
const CoinPage = () => {
  const {id} = useParams();
  const [coin, setCoin] = useState();
  const {symbol, currency} =  CryptoState();
  const fetchCoin = async() =>{
    const {data} = await axios.get(SingleCoin(id))
    setCoin(data);
  }
  console.log(coin);

  useEffect(()=>{
    fetchCoin();
  }, [])
  console.log("coin", coin);
if(!coin) return <LinearProgress style={{backgroundColor: 'gold'}}/>

  return (
    <>
    <div className='containerSlider'>
      <div className="sidebar">
        <div className='img'>
        <img src={coin?.image.large} 
        alt={coin?.name} 
        height="200"
        style={{marginBottom: 10}} />
        </div>
        
     <div className='content'>
     <Typography variant="h3" className="coinInfo">
        {coin?.name}
      </Typography>

      <Typography variant="subtitle1" className="desc"
      style={{textAlign: "justify"}}>
        {coin?.description.en.split(".")[0]}
      </Typography>

      <div className='marketData'>
        <span style={{display: 'flex'}}>

        <Typography variant='h5' style={{
          fontFamily:"Montserrat"
        }}
        >
          Rank:{" "}{coin?.market_cap_rank}
          
          
        </Typography>
        </span>

        <span style={{display: 'flex'}}>

        <Typography variant='h5' style={{
          fontFamily:"Montserrat"
        }}
        >
            CurrentPrice:{" "}{symbol}{numWithComma(coin?.market_data.current_price[currency.toLowerCase()])}
        </Typography>
        </span>

        <span style={{display: 'flex'}}>

        <Typography variant='h5' style={{
          fontFamily:"Montserrat", color: "white"
        }}
        >
          Market Cap:{" "}{symbol}{numWithComma(coin?.market_data.market_cap[currency.toLowerCase()]?.toString().slice(0, -6))}M
        </Typography>
        </span>
      </div>
     </div>
      

      </div>
        <CoinInfo/>
    </div>
    </>
  )
}

export default CoinPage
