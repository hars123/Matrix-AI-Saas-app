import React from 'react'
import Navbar from '../components/Navbar'

import Hero from '../components/Hero'
import AItools from '../components/AItools'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'
import footer  from '../components/footer'
import Footer from '../components/footer'

const Home = () => {
  return (
    <>
    <Navbar/>
    <Hero/>
    <AItools/>
    <Testimonial/>
    <Plan/>
    <Footer/>
  
    </>
  )
}

export default Home