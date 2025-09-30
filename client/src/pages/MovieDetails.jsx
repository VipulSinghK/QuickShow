import React, { useState } from 'react'
import { useLocation, useParams, useNavigate } from 'react-router-dom'
import { StarIcon, ArrowLeft, PlayCircle } from 'lucide-react'
import DateSelect from '../components/DateSelect'

const timeFormat = (minutes) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours}h ${mins}m`
}

// Generate 6 dates starting from September 30, 2025
const generateDates = () => {
  const dates = {}
  const startDate = new Date('2025-09-30')
  for (let i = 0; i < 6; i++) {
    const date = new Date(startDate)
    date.setDate(startDate.getDate() + i)
    const dateString = date.toISOString().split('T')[0]
    dates[dateString] = ['10:00 AM', '2:00 PM', '6:00 PM']
  }
  return dates
}

// Sample related movies data with dynamic dateTime and description
const relatedMovies = [
  {
    id: '4',
    title: 'Cosmic Voyage',
    description: 'An epic journey through uncharted galaxies.',
    poster_path: 'https://via.placeholder.com/200x300?text=Cosmic+Voyage',
    vote_average: 4.3,
    genres: [{ name: 'Sci-Fi' }],
    runtime: 115,
    release_date: '2023-03-10',
    overview: 'An epic journey through uncharted galaxies.',
    cast: ['Alice Nova', 'Bob Comet'],
    trailer: 'https://www.youtube.com/watch?v=example4',
    dateTime: generateDates(),
  },
  {
    id: '5',
    title: 'Timeless Hearts',
    description: 'A love story that transcends eras.',
    poster_path: 'https://via.placeholder.com/200x300?text=Timeless+Hearts',
    vote_average: 4.1,
    genres: [{ name: 'Romance' }],
    runtime: 110,
    release_date: '2022-09-15',
    overview: 'A love story that transcends eras.',
    cast: ['Emma Rose', 'Liam Hart'],
    trailer: 'https://www.youtube.com/watch?v=example5',
    dateTime: generateDates(),
  },
  {
    id: '6',
    title: 'Night Ops',
    description: 'A high-stakes covert operation.',
    poster_path: 'https://via.placeholder.com/200x300?text=Night+Ops',
    vote_average: 4.4,
    genres: [{ name: 'Action' }],
    runtime: 125,
    release_date: '2023-12-01',
    overview: 'A high-stakes covert operation.',
    cast: ['Tom Strike', 'Lisa Shadow'],
    trailer: 'https://www.youtube.com/watch?v=example6',
    dateTime: generateDates(),
  },
]

// Default dateTime data for movies without showtimes
const defaultDateTime = generateDates()

const MovieDetails = () => {
  const { state } = useLocation()
  const { id } = useParams()
  const navigate = useNavigate()
  const movie = state?.movie
  const [selectedDate, setSelectedDate] = useState(null)

  if (!movie) {
    return (
      <div className="pt-16 text-center text-red-500 min-h-screen bg-gray-900 text-white">
        Movie not found
      </div>
    )
  }

  // Use defaultDateTime if movie.dateTime is undefined or null
  const movieWithDateTime = {
    ...movie,
    dateTime: movie.dateTime || defaultDateTime,
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
  }

  return (
    <div className="min-h-screen bg-black-900 text-white">
      {/* Main Content */}
      <div className="px-6 md:px-12 lg:px-24 py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors mb-8"
        >
          <ArrowLeft size={20} /> Back to Movies
        </button>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Poster */}
          <div className="w-full lg:w-1/3">
            <img
              src={movie.poster_path}
              alt={movie.title}
              className="w-full rounded-lg shadow-lg"
            />
          </div>

          {/* Movie Details */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <StarIcon className="w-6 h-6 text-yellow-400" />
                <span className="text-gray-200 font-medium text-lg">
                  {movie.vote_average.toFixed(1)} / 10 User Rating
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed text-base">{movie.overview}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 font-semibold">Duration</p>
                <p className="text-gray-300">{timeFormat(movie.runtime)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">Release Year</p>
                <p className="text-gray-300">{movie.release_date.split('-')[0]}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-semibold">Language</p>
                <p className="text-gray-300">English</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {movie.trailer && (
                <a
                  href={movie.trailer}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-sm cursor-pointer mb-2 sm:mb-0"
                >
                  <PlayCircle size={18} /> Watch Trailer
                </a>
              )}
              
            </div>
            <p className="text-gray-400 text-sm line-clamp-2">{movie.description}</p>
          </div>
        </div>

        {/* Date Selection Section */}
        <div className="mt-12">
          <DateSelect
            dateTime={movieWithDateTime.dateTime}
            id={movie.id}
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            movieTitle={movie.title}
          />
        </div>

        {/* Movie Cast Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Movie Cast</h2>
          {movie.cast && movie.cast.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {movie.cast.map((actor, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center">
                      <span className="text-gray-300 font-semibold">{actor[0]}</span>
                    </div>
                    <div>
                      <p className="font-semibold text-white">{actor}</p>
                      <p className="text-sm text-gray-500">Actor</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No cast information available.</p>
          )}
        </div>

        {/* Related Movies Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-white mb-6">Related Movies</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedMovies.map(relatedMovie => (
              <div
                key={relatedMovie.id}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/movie/${relatedMovie.id}`, { state: { movie: relatedMovie } })}
              >
                <img
                  src={relatedMovie.poster_path}
                  alt={relatedMovie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white truncate">{relatedMovie.title}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{relatedMovie.description}</p>
                  <div className="flex items-center mt-2">
                    <span className="text-yellow-400">{'★'.repeat(Math.floor(relatedMovie.vote_average))}</span>
                    <span className="text-gray-400 text-sm ml-1">{relatedMovie.vote_average.toFixed(1)}/10</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieDetails