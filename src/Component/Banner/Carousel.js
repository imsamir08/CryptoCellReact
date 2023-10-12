import React, { useEffect, useState } from 'react'
import { CryptoState } from '../../CryptoContext';
import '../../App.css';
import axios from 'axios'

import { TrendingCoins } from '../../Config/Api';
import { Link } from 'react-router-dom';
import AliceCarousel from "react-alice-carousel";
import { numWithComma } from '../CoinTable';
const Carousel = () => {
    const [trending, setTrending]=useState([]);
    const { currency, symbol } = CryptoState();

    const fetchTrendingCoins = async () => {
        const { data} = await axios.get(TrendingCoins(currency));
        setTrending(data);
    };
    console.log(trending);

    useEffect(()=>{
        fetchTrendingCoins();
    }, [currency])

    const responsive = {
        0:{
            items:2,
        },
        512:{
            items:4,
        }
    }
    // function numWithComma(x){
    //     return x.toString().replace(/\B(?=(\d{3}))+(?!\d)/g, ",");
    // }
    const items = trending.map((coin) => {
        let profit = coin.price_change_percentage_24h >= 0;
        return(
            <Link className='carouselItem' to={`/coins/${coin.id}`}>
            <img
            src={coin?.image}
            alt={coin.name}
            height='80' 
            style={{marginBottom:10}} 
            ></img>

            <p className='carousel-content'><span>{coin?.symbol}</span>
            &nbsp;
            <span style={{
                color: profit>0? 'green':"red"
            }}>
                {profit && "+"} {coin?.price_change_percentage_24h?.toFixed(2)}
            </span>
            </p>
            <span>
                <p className='carousel-content'>{symbol} {numWithComma(coin?.current_price.toFixed(2))}</p>
            </span>
            </Link>
        );
    })
    return (
        <div className='carousel'>
            <AliceCarousel className='items'
                mouseTrackingEnabled
                infinite
                autoPlayInterval={2000}
                animationDuration = {1500}
                disableDotsControls
                disableButtonsControls
                responsive={responsive}
                items={items}
                autoPlay
            />
        </div>
    )
}

export default Carousel
