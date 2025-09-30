import logo from './logo.svg'
import marvelLogo from './marvelLogo.svg'
import googlePlay from './googlePlay.svg'
import appStore from './appStore.svg'
import screenImage from './screenImage.svg'
import profile from './profile.png'

export const assets = {
    logo,
    marvelLogo,
    googlePlay,
    appStore,
    screenImage,
    profile
}

export const dummyTrailers = [
    {
        image: "https://img.youtube.com/vi/WpW36ldAqnM/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=WpW36ldAqnM'
    },
    {
        image: "https://img.youtube.com/vi/-sAOWhvheK8/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=-sAOWhvheK8'
    },
    {
        image: "https://img.youtube.com/vi/1pHDWnXmK7Y/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=1pHDWnXmK7Y'
    },
    {
        image: "https://img.youtube.com/vi/umiKiW4En9g/maxresdefault.jpg",
        videoUrl: 'https://www.youtube.com/watch?v=umiKiW4En9g'
    },
]

const dummyCastsData = [
    { "name": "Milla Jovovich", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg", },
    { "name": "Dave Bautista", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg", },
    { "name": "Arly Jover", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg", },
    { "name": "Amara Okereke", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg", },
    { "name": "Fraser James", "profile_path": "https://image.tmdb.org/t/p/original/mGAPQG2OKTgdKFkp9YpvCSqcbgY.jpg", },
    { "name": "Deirdre Mullins", "profile_path": "https://image.tmdb.org/t/p/original/lJm89neuiVlYISEqNpGZA5kTAnP.jpg", },
    { "name": "Sebastian Stankiewicz", "profile_path": "https://image.tmdb.org/t/p/original/hLN0Ca09KwQOFLZLPIEzgTIbqqg.jpg", },
    { "name": "Tue Lunding", "profile_path": "https://image.tmdb.org/t/p/original/qY4W4O4Kw4W4j4W4Y4j4W4j4W4j.jpg", },
    { "name": "Jacek Dzisiewicz", "profile_path": "https://image.tmdb.org/t/p/original/6Ksb8ANhhoWWGnlM6O1qrySd7e1.jpg", },
    { "name": "Ian Hanmore", "profile_path": "https://image.tmdb.org/t/p/original/yhI4MK5atavKBD9wiJtaO1say1p.jpg", },
    { "name": "Eveline Hall", "profile_path": "https://image.tmdb.org/t/p/original/uPq4xUPiJIMW5rXF9AT0GrRqgJY.jpg", },
    { "name": "Kamila Klamut", "profile_path": "https://image.tmdb.org/t/p/original/usWnHCzbADijULREZYSJ0qfM00y.jpg", },
    { "name": "Caoilinn Springall", "profile_path": "https://image.tmdb.org/t/p/original/uZNtbPHowlBYo74U1qlTaRlrdiY.jpg", },
    { "name": "Jan Kowalewski", "profile_path": "https://image.tmdb.org/t/p/original/snk6JiXOOoRjPtHU5VMoy6qbd32.jpg", },
    { "name": "Pawel Wysocki", "profile_path": "https://image.tmdb.org/t/p/original/zmznPrQ9GSZwcOIUT0c3GyETwrP.jpg", },
    { "name": "Simon Lööf", "profile_path": "https://image.tmdb.org/t/p/original/cbZrB8crWlLEDjVUoak8Liak6s.jpg", },
    { "name": "Tomasz Cymerman", "profile_path": "https://image.tmdb.org/t/p/original/nTSPtzWu6deZTJtWXHUpACVznY4.jpg", }
]

export const dummyShowsData = [
    {
        "_id": "1",
        "id": 1,
        "title": "Galactic Quest",
        "overview": "A thrilling sci-fi adventure across the cosmos.",
        "poster_path": "https://m.media-amazon.com/images/M/MV5jZjZjZjZjZjZjZjZjZjZjZjZjZj.jpg",
        "backdrop_path": "https://m.media-amazon.com/images/M/MV5jZjZjZjZjZjZjZjZjZjZjZjZjZj.jpg",
        "genres": [
            { "id": 878, "name": "Sci-Fi" },
            { "id": 12, "name": "Adventure" }
        ],
        "casts": dummyCastsData,
        "release_date": "2023-05-15",
        "original_language": "en",
        "tagline": "",
        "vote_average": 4.5,
        "vote_count": 0,
        "runtime": 120,
    },
    {
        "_id": "2",
        "id": 2,
        "title": "Love in Time",
        "overview": "A romantic tale of love defying time.",
        "poster_path": "https://m.media-amazon.com/images/M/MV5jZjZjZjZjZjZjZjZjZjZjZjZjZj.jpg",
        "backdrop_path": "https://m.media-amazon.com/images/M/MV5jZjZjZjZjZjZjZjZjZjZjZjZjZj.jpg",
        "genres": [
            { "id": 10749, "name": "Romance" },
            { "id": 18, "name": "Drama" }
        ],
        "casts": dummyCastsData,
        "release_date": "2022-11-20",
        "original_language": "en",
        "tagline": "",
        "vote_average": 4.0,
        "vote_count": 0,
        "runtime": 105,
    },
    {
        "_id": "3",
        "id": 3,
        "title": "Avengers",
        "overview": "An action-packed spy thriller.",
        "poster_path": "https://m.media-amazon.com/images/M/MV5jZjZjZjZjZjZjZjZjZjZjZjZjZj.jpg",
        "backdrop_path": "https://m.media-amazon.com/images/M/MV5jZjZjZjZjZjZjZjZjZjZjZjZjZj.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 53, "name": "Thriller" }
        ],
        "casts": dummyCastsData,
        "release_date": "2023-08-10",
        "original_language": "en",
        "tagline": "",
        "vote_average": 4.2,
        "vote_count": 0,
        "runtime": 130,
    },
    {
        "_id": "4",
        "id": 4,
        "title": "Titanic",
        "overview": "An epic love story aboard the ill-fated ship.",
        "poster_path": "https://m.media-amazon.com/images/M/MV5jZjZjZjZjZjZjZjZjZjZjZjZjZj.jpg",
        "backdrop_path": "https://m.media-amazon.com/images/M/MV5jZjZjZjZjZjZjZjZjZjZjZjZjZj.jpg",
        "genres": [
            { "id": 10749, "name": "Romance" },
            { "id": 18, "name": "Drama" }
        ],
        "casts": dummyCastsData,
        "release_date": "1997-12-19",
        "original_language": "en",
        "tagline": "",
        "vote_average": 7.8,
        "vote_count": 0,
        "runtime": 194,
    },
    {
        "_id": "5",
        "id": 5,
        "title": "Annabelle Creation",
        "overview": "The origin story of the possessed doll.",
        "poster_path": "https://m.media-amazon.com/images/M/MV5jZjZjZjZjZjZjZjZjZjZjZjZjZj.jpg",
        "backdrop_path": "https://m.media-amazon.com/images/M/MV5jZjZjZjZjZjZjZjZjZjZjZjZjZj.jpg",
        "genres": [
            { "id": 27, "name": "Horror" }
        ],
        "casts": dummyCastsData,
        "release_date": "2017-08-11",
        "original_language": "en",
        "tagline": "",
        "vote_average": 6.5,
        "vote_count": 0,
        "runtime": 109,
    },
    {
        "_id": "7",
        "id": 7,
        "title": "Inception",
        "overview": "A mind-bending thriller about dream infiltration.",
        "poster_path": "https://m.media-amazon.com/images/M/MV5jZjZjZjZjZjZjZjZjZjZjZjZjZj.jpg",
        "backdrop_path": "https://m.media-amazon.com/images/M/MV5jZjZjZjZjZjZjZjZjZjZjZjZjZj.jpg",
        "genres": [
            { "id": 28, "name": "Action" },
            { "id": 53, "name": "Thriller" },
            { "id": 878, "name": "Science Fiction" }
        ],
        "casts": dummyCastsData,
        "release_date": "2010-07-16",
        "original_language": "en",
        "tagline": "",
        "vote_average": 8.8,
        "vote_count": 0,
        "runtime": 148,
    },
    {
        "_id": "8",
        "id": 8,
        "title": "Interstellar",
        "overview": "A journey through space and time to save humanity.",
        "poster_path": "https://m.media-amazon.com/images/M/MV5jZjZjZjZjZjZjZjZjZjZjZjZjZj.jpg",
        "backdrop_path": "https://m.media-amazon.com/images/M/MV5jZjZjZjZjZjZjZjZjZjZjZjZjZj.jpg",
        "genres": [
            { "id": 12, "name": "Adventure" },
            { "id": 18, "name": "Drama" },
            { "id": 878, "name": "Science Fiction" }
        ],
        "casts": dummyCastsData,
        "release_date": "2014-11-07",
        "original_language": "en",
        "tagline": "",
        "vote_average": 8.6,
        "vote_count": 0,
        "runtime": 169,
    },
    {
        "_id": "9",
        "id": 9,
        "title": "Cosmic Voyage",
        "overview": "An epic journey through uncharted galaxies.",
        "poster_path": "https://via.placeholder.com/200x300?text=Cosmic+Voyage",
        "backdrop_path": "https://via.placeholder.com/1280x720?text=Cosmic+Voyage+Backdrop",
        "genres": [
            { "id": 878, "name": "Sci-Fi" }
        ],
        "casts": dummyCastsData,
        "release_date": "2023-03-10",
        "original_language": "en",
        "tagline": "",
        "vote_average": 4.3,
        "vote_count": 0,
        "runtime": 115,
    },
    {
        "_id": "10",
        "id": 10,
        "title": "Timeless Hearts",
        "overview": "A love story that transcends eras.",
        "poster_path": "https://via.placeholder.com/200x300?text=Timeless+Hearts",
        "backdrop_path": "https://via.placeholder.com/1280x720?text=Timeless+Hearts+Backdrop",
        "genres": [
            { "id": 10749, "name": "Romance" }
        ],
        "casts": dummyCastsData,
        "release_date": "2022-09-15",
        "original_language": "en",
        "tagline": "",
        "vote_average": 4.1,
        "vote_count": 0,
        "runtime": 110,
    },
    {
        "_id": "11",
        "id": 11,
        "title": "Night Ops",
        "overview": "A high-stakes covert operation.",
        "poster_path": "https://via.placeholder.com/200x300?text=Night+Ops",
        "backdrop_path": "https://via.placeholder.com/1280x720?text=Night+Ops+Backdrop",
        "genres": [
            { "id": 28, "name": "Action" }
        ],
        "casts": dummyCastsData,
        "release_date": "2023-12-01",
        "original_language": "en",
        "tagline": "",
        "vote_average": 4.4,
        "vote_count": 0,
        "runtime": 125,
    }
]

export const dummyDateTimeData = {
    "2025-09-30": [
        { "time": "10:00 AM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] },
        { "time": "2:00 PM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] },
        { "time": "6:00 PM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] }
    ],
    "2025-10-01": [
        { "time": "10:00 AM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] },
        { "time": "2:00 PM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] },
        { "time": "6:00 PM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] }
    ],
    "2025-10-02": [
        { "time": "10:00 AM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] },
        { "time": "2:00 PM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] },
        { "time": "6:00 PM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] }
    ],
    "2025-10-03": [
        { "time": "10:00 AM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] },
        { "time": "2:00 PM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] },
        { "time": "6:00 PM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] }
    ],
    "2025-10-04": [
        { "time": "10:00 AM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] },
        { "time": "2:00 PM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] },
        { "time": "6:00 PM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] }
    ],
    "2025-10-05": [
        { "time": "10:00 AM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] },
        { "time": "2:00 PM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] },
        { "time": "6:00 PM", "availableSeats": ["A1","A2","A3","A4","A5","A6","A7","A8","A9","A10","B1","B2","B3","B4","B5","B6","B7","B8","B9","B10","C1","C2","C3","C4","C5","C6","C7","C8","C9","C10","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","E1","E2","E3","E4","E5","E6","E7","E8","E9","E10","F1","F2","F3","F4","F5","F6","F7","F8","F9","F10"] }
    ]
}

export const dummyDashboardData = {
    "totalBookings": 14,
    "totalRevenue": 1517,
    "totalUser": 5,
    "activeShows": [
        {
            "_id": "68352363e96d99513e4221a4",
            "movie": dummyShowsData[0],
            "showDateTime": "2025-09-30T02:30:00.000Z",
            "showPrice": 59,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "C1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
        },
        {
            "_id": "6835238fe96d99513e4221a8",
            "movie": dummyShowsData[1],
            "showDateTime": "2025-09-30T15:30:00.000Z",
            "showPrice": 81,
            "occupiedSeats": {},
        },
        {
            "_id": "6835238fe96d99513e4221a9",
            "movie": dummyShowsData[2],
            "showDateTime": "2025-09-30T03:30:00.000Z",
            "showPrice": 81,
            "occupiedSeats": {},
        },
        {
            "_id": "6835238fe96d99513e4221aa",
            "movie": dummyShowsData[3],
            "showDateTime": "2025-10-01T16:30:00.000Z",
            "showPrice": 81,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A4": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
        },
        {
            "_id": "683682072b5989c29fc6dc0d",
            "movie": dummyShowsData[4],
            "showDateTime": "2025-10-02T15:30:00.000Z",
            "showPrice": 49,
            "occupiedSeats": {
                "A1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "A3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B1": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B2": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok",
                "B3": "user_2xO4XPCgWWwWq9EHuQxc5UWqIok"
            },
            "__v": 0
        },
        {
            "_id": "68380044686d454f2116b39a",
            "movie": dummyShowsData[5],
            "showDateTime": "2025-10-03T16:00:00.000Z",
            "showPrice": 79,
            "occupiedSeats": {
                "A1": "user_2xl7eCSUHddibk5lRxfOtw9RMwX",
                "A2": "user_2xl7eCSUHddibk5lRxfOtw9RMwX"
            }
        }
    ]
}

export const dummyBookingData = [
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-09-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 98,
        "bookedSeats": ["D1", "D2"],
        "isPaid": false,
    },
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-09-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 49,
        "bookedSeats": ["A1"],
        "isPaid": true,
    },
    {
        "_id": "68396334fb83252d82e17295",
        "user": { "name": "GreatStack", },
        "show": {
            _id: "68352363e96d99513e4221a4",
            movie: dummyShowsData[0],
            showDateTime: "2025-09-30T02:30:00.000Z",
            showPrice: 59,
        },
        "amount": 147,
        "bookedSeats": ["A1", "A2","A3"],
        "isPaid": true,
    },
]