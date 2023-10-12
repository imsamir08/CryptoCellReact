import React from 'react';
import { styled } from '@mui/system';
import App from '../../App';
import { Typography , Container} from '@mui/material';
import Carousel from './Carousel';

const Banner = () => {
  return (
    <div className="StyledContainer">
        {/* <Container className="StyledContainerContext"> */}
       <div className='tagline'>
        <Typography
         variant='h2' style={{
             marginBottom: 15,
             fontWeight: "bold",
             textAlign: "center",
             
         }}>
            Crypto Cell
        </Typography>
       </div>

       <div className='subtitle'>
        <Typography
          variant='h6' style={{
            marginBottom: 15,
            fontWeight: "bold",
            textAlign: "center",}}>
            Get all the info regarding your favorite bitcoin 
        </Typography>
       </div>
       <Carousel/>
       {/* </Container> */}
      </div>
  );
};

export default Banner;
