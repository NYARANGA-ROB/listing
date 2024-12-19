import React from 'react'
import Testimonial from '../components/Testimonial'
import Footer from '../components/Footer'

export default function About() {
  return (
    <div className='bg-white'>
    <div className='py-20 px-4 max-w-5xl mx-auto'>
      <h1 className='text-3xl font-bold text-blue-700 mb-4'>About Urban Homes</h1>
      <p className='text-black   mb-4'>
      Urban Homes stands out as a leading real estate agency, recognized for its unwavering commitment to excellence. With a keen focus on the most desirable neighborhoods, we specialize in assisting clients to buy, sell, and rent properties with unparalleled expertise.
      </p>
      <p className='text-black mb-4'>
      Our mission is deeply rooted in helping clients achieve their unique real estate goals. We go beyond transactions, offering expert advice, personalized service, and a profound understanding of the ever-evolving local market. Whether you're embarking on the journey of buying, selling, or renting a property, Sahand Estate is your dedicated partner, guiding you through every step of the way.
      </p>
      <p className='text-black mb-4'>
      Backed by a wealth of experience and knowledge, our team of agents is committed to setting a new standard in the real estate industry. We believe that the process of buying or selling a property should be more than just a transaction; it should be an exciting and rewarding experience. At Sahand Estate, we are steadfast in our dedication to turning this vision into reality for each and every one of our valued clients.
      </p>
      <Testimonial />

    </div>
      <Footer />
      </div>
  )
}
