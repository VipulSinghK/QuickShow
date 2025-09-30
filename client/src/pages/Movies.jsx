import { ArrowRight } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const featuredMovies = [
  {
    id: '1',
    title: 'The Hangover',
    description: 'A wild comedy about a bachelor party gone wrong.',
    rating: 4.5,
    image: 'https://ntvb.tmsimg.com/assets/p192248_v_h10_am.jpg?w=1280&h=720',
    vote_average: 4.5,
    poster_path: 'https://images.sr.roku.com/idType/roku/context/global/id/8461df9ce27e570faf08e6fd20e65085/images/gracenote/assets/p192248_d_v8_aa.jpg/magic/396x0/filters:quality(70)',
    runtime: 120,
    genres: [{ name: 'Comedy' }],
    release_date: '2023-05-15',
    overview: 'The Hangover is a wild comedy about a bachelor party gone completely off the rails. Four friends — Phil, Stu, Alan, and Doug — head to Las Vegas for Doug’s bachelor celebration. The next morning, they wake up in their trashed hotel suite with no memory of the previous night, a tiger in the bathroom, a baby in the closet, and the groom missing.',
    cast: ['Phil Wenneck', 'Stu Price', 'Alan Garner', 'Doug Billings'],
    trailer: 'https://youtu.be/tcdUhdOlz9M?si=8XvG8wx-a8Oob1de'
  },
  {
    id: '2',
    title: 'Love in Time',
    description: 'A romantic tale blending love and time travel.',
    rating: 4.0,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPdRr6-f2VqqOpgfxgrX05PgSWx7KkofFTZw&s',
    vote_average: 4.0,
    poster_path: 'https://m.media-amazon.com/images/M/MV5BYTFjN2FmZWItYTk4YS00Y2U1LTkwZGUtODAwNGE5NDE0OGNiXkEyXkFqcGc@._V1_.jpg',
    runtime: 105,
    genres: [{ name: 'Romance' }, { name: 'Drama' }],
    release_date: '2022-11-20',
    overview: 'Love in Time is a romantic fantasy drama that blends love with the mystery of time. The story follows Xu Jia Shu, a rational and successful CEO, and Su Jia Nan, a warm and optimistic writer. When a strange twist of fate connects them through time, their lives intertwine in unexpected ways.',
    cast: ['Xu Jia Shu', 'Su Jia Nan'],
    trailer: 'https://youtu.be/yNJGzNhCjvA?si=kKFGSwa39WySKaon'
  },
  {
    id: '3',
    title: 'The Avengers',
    description: 'A superhero epic uniting Marvel’s greatest heroes.',
    rating: 4.2,
    image: 'https://s1.dmcdn.net/v/U03521YgC10y9V8jI/x720',
    vote_average: 4.2,
    poster_path: 'https://imageio.forbes.com/blogs-images/markhughes/files/2019/04/AVENGERS-ENDGAME-poster-DOLBY-CINEMA.jpg?height=1039&width=711&fit=bounds',
    runtime: 130,
    genres: [{ name: 'Action' }, { name: 'Adventure' }],
    release_date: '2023-08-10',
    overview: 'The Avengers is the epic superhero team-up that brought Marvel’s greatest heroes together for the first time. When Loki, the God of Mischief, arrives on Earth with plans to enslave humanity using the power of the Tesseract, Nick Fury of S.H.I.E.L.D. assembles a team of extraordinary individuals to save the world.',
    cast: ['Tony Stark', 'Steve Rogers', 'Natasha Romanoff', 'Thor'],
    trailer: 'https://youtu.be/eOrNdBpGMv8?si=mOeJMOQspFqQYmca'
  },
  {
    id: '4',
    title: 'Titanic',
    description: 'A tragic love story set on a doomed ship.',
    rating: 4.8,
    image: 'https://i.ytimg.com/vi/A1FtRovJMxk/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDSDRGU7c9EGMuHNqhR9nbWEfFrrg',
    vote_average: 4.8,
    poster_path: 'https://play-lh.googleusercontent.com/8PmJGVmFtEYVrnjcEvHr2Zl0bMYtjufSxmTBXb87NN7VF16lBr4bD4mUFV5Ae0uQ52-yLp1pdBF7NuOUtm4',
    runtime: 195,
    genres: [{ name: 'Romance' }, { name: 'Drama' }],
    release_date: '1997-12-19',
    overview: 'Titanic is an epic romantic drama set against the real-life tragedy of the RMS Titanic, the luxury British passenger liner that sank on its maiden voyage in 1912. The story follows Jack Dawson, a free-spirited artist, and Rose DeWitt Bukater, a young woman from an aristocratic family who feels trapped by societal expectations.',
    cast: ['Jack Dawson', 'Rose DeWitt Bukater'],
    trailer: 'https://youtu.be/kVrqfYjkTdQ?si=fA9N9wtNnBPmSAAP'
  },
  {
    id: '5',
    title: 'Annabelle: Creation',
    description: 'A chilling horror prequel about a haunted doll.',
    rating: 4.8,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvovrAD0F0CPsE2d821dtYMNKyhUvxpAYeRQ&s',
    vote_average: 4.8,
    poster_path: 'https://m.media-amazon.com/images/S/pv-target-images/e1a4650e612a7ab6f53bed87b35a18da6212b26b176ca60af2c51a855d56b8b2.jpg',
    runtime: 109,
    genres: [{ name: 'Horror' }, { name: 'Thriller' }],
    release_date: '2017-08-11',
    overview: 'Annabelle: Creation is a prequel to Annabelle and part of The Conjuring Universe. The film reveals the origin story of the infamous Annabelle doll. It follows a dollmaker and his wife, who are mourning the tragic death of their young daughter, Bee. Years later, they open their home to a group of orphaned girls and a nun. Soon, the children begin to experience terrifying supernatural occurrences, as a malevolent force connected to the doll targets them.',
    cast: ['Samuel Mullins', 'Esther Mullins'],
    trailer: 'https://youtu.be/KisPhy7T__Q?si=269kvxt0OnpHjFWi'
  },
  {
    id: '7',
    title: 'Inception',
    description: 'A sci-fi thriller exploring dreams and reality.',
    rating: 4.9,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXzBArbJlViN1A3SaBDx_S7jp27n5JhXSVPQ&s',
    vote_average: 4.9,
    poster_path: 'https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg',
    runtime: 148,
    genres: [{ name: 'Sci-Fi' }, { name: 'Thriller' }],
    release_date: '2010-07-16',
    overview: 'Inception is a mind-bending sci-fi thriller that explores the power of dreams and the subconscious. The story follows Dom Cobb, a skilled thief who specializes in extracting secrets from people’s minds by entering their dreams. Cobb is offered a chance to have his criminal record erased if he can accomplish the impossible: inception — planting an idea into someone’s mind without them realizing it.',
    cast: ['Dom Cobb', 'Ariadne'],
    trailer: 'https://youtu.be/YoHD9XEInc0?si=m_Q5LxXlSMZ7hj4m'
  },
  {
    id: '8',
    title: 'Interstellar',
    description: 'A sci-fi epic about space exploration and survival.',
    rating: 4.9,
    image: 'https://m.media-amazon.com/images/M/MV5BNjM5OTQzMTg4N15BMl5BanBnXkFtZTgwOTgyMjM0NTE@._V1_QL75_UX500_CR0,46,500,281_.jpg',
    vote_average: 4.9,
    poster_path: 'https://m.media-amazon.com/images/I/91UMpWgj05L._UF1000,1000_QL80_.jpg',
    runtime: 169,
    genres: [{ name: 'Sci-Fi' }, { name: 'Adventure' }],
    release_date: '2014-11-07',
    overview: 'Interstellar is an epic sci-fi drama set in a future where Earth is slowly becoming uninhabitable due to climate change and crop failures. The story follows Cooper, a former NASA pilot turned farmer, who is recruited for a daring mission through a wormhole near Saturn to find a new habitable planet for humanity.',
    cast: ['Joseph Cooper', 'Amelia Brand'],
    trailer: 'https://youtu.be/zSWdZVtXT7E?si=3fmuNBiDHBzSpVQl'
  },
  {
    id: '9',
    title: 'The Conjuring',
    description: 'A horror tale of paranormal investigation.',
    rating: 4.9,
    image: 'https://static0.colliderimages.com/wordpress/wp-content/uploads/2020/10/the-conjuring-universe-explained-social.jpg',
    vote_average: 4.9,
    poster_path: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_FMjpg_UX1000_.jpg',
    runtime: 112,
    genres: [{ name: 'Horror' }, { name: 'Thriller' }],
    release_date: '2013-07-19',
    overview: 'The Conjuring is a chilling supernatural horror film based on the real-life investigations of Ed and Lorraine Warren, renowned paranormal investigators. The story follows the Perron family, who move into an old farmhouse in Rhode Island in 1971. Shortly after settling in, they begin to experience increasingly disturbing events — strange noises, ghostly figures, and violent paranormal attacks. The Warrens uncover the horrifying truth: the house is haunted by a malevolent spirit with a dark history.',
    cast: ['Ed Warren', 'Lorraine Warren'],
    trailer: 'https://youtu.be/k10ETZ41q5o?si=3fmuNBiDHBzSpVQl'
  }
]

const Movies = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('All')

  const genres = ['All', ...new Set(featuredMovies.flatMap(movie => movie.genres.map(g => g.name)))]

  const filteredMovies = featuredMovies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedGenre === 'All' || movie.genres.some(g => g.name === selectedGenre))
  )

  const handleNavigate = (movie) => {
    navigate(`/movie/${movie.id}`, { state: { movie } })
  }

  return (
    <section className="pt-16 py-12 px-4 bg-black min-h-screen text-white">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold text-white">Now Showing</h2>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 placeholder-gray-400"
            />
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {genres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                onClick={() => handleNavigate(movie)}
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1 truncate">
                    {movie.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">
                    {movie.description}
                  </p>
                  <div className="flex items-center mb-3">
                    <span className="text-yellow-400">
                      {'★'.repeat(Math.floor(movie.rating))}
                    </span>
                    <span className="text-gray-400 text-sm ml-1">
                      {movie.rating.toFixed(1)}/5
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      handleNavigate(movie)
                    }}
                    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Book Now
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">No movies found.</p>
          )}
        </div>
      </div>
    </section>
  )
}

export default Movies