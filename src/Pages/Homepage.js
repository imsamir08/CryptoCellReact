import React from 'react'
import Banner from '../Component/Banner/Banner'
import { CoinList } from '../Config/Api'
import CoinTable from '../Component/CoinTable'

const Homepage = () => {
  return (
    <div>
      <Banner/>
      <CoinTable/>
    </div>
  )
}

export default Homepage
