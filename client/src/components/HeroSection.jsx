import React from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, CalendarIcon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
  const navigate = useNavigate()

  const handleExplore = () => {
    navigate('/movies')
  }

  return (
    <div className='relative flex items-center h-screen bg-[url("/backgroundImage.png")] bg-cover bg-center'>
      {/* Content */}
      <div className='flex flex-col items-start justify-center text-white px-8 lg:pl-24 max-w-lg'>
        <img src={assets.marvelLogo} alt="" className="max-h-11 lg:h-11 mb-4" />

        <h1 className="text-4xl lg:text-5xl font-bold mb-2">
          Guardians <br /> of the Galaxy
        </h1>

        <div className='text-gray-300 mb-2'>
          Action | Adventure | Sci-Fi
        </div>

        <div className='flex items-center gap-2 text-gray-300 mb-1'>
          <CalendarIcon className='w-5 h-5' /> 2018
        </div>

        <div className='flex items-center gap-2 text-gray-300 mb-4'>
          <ClockIcon className='w-5 h-5' /> 2h 1m
        </div>

        {/* Description */}
        <p className="text-gray-300 text-sm lg:text-base mb-6">
          Join Star-Lord and his ragtag team of misfits as they embark on an epic intergalactic adventure to save the universe from a powerful new threat.
        </p>

        {/* Explore Button */}
        <button
          onClick={handleExplore}
          className="flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 rounded-full text-white font-medium transition cursor-pointer"
        >
          Explore Movies
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

export default HeroSection
