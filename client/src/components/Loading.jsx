import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Loading from '../components/Loading'

const MovieDetails = () => {
  const { state } = useLocation()
  const movie = state?.movie

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // ⏳ Show loader for 2 seconds
    const timer = setTimeout(() => setLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (loading) return <Loading />

  return (
    <div className="pt-16">
      {/* Your actual Movie Details content goes here */}
      <h1 className="text-white text-3xl font-bold text-center">{movie.title}</h1>
    </div>
  )
}

export default MovieDetails
