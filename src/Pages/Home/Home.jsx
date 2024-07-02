import React from 'react'
import ScholarShipItems from './ScholarShipItems'
import Slider from './Slider'

const Home = () => {
  return (
    <div>
<div>
        <Slider></Slider>
      </div>
    <h1 className='text-center text-4xl mt-8  '> AvailAble Scholarship</h1>
      <ScholarShipItems></ScholarShipItems>
      
    </div>
  )
}

export default Home