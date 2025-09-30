import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, MapPin, Ticket, User, Download, Trash2, Film } from 'lucide-react';

const MyBookings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const getMyBookings = async () => {
    const existingBookings = JSON.parse(localStorage.getItem('movieBookings') || '[]');
    
    if (location.state) {
      const newBooking = {
        id: `BK${Date.now()}`,
        movieTitle: location.state.movieTitle,
        // Use the image from the movie data instead of poster_path
        poster_path: location.state.show?.movie?.image || location.state.show?.movie?.poster_path || 'https://via.placeholder.com/300x400?text=Movie+Poster',
        date: location.state.date,
        time: location.state.time,
        seats: location.state.seats,
        totalPrice: location.state.totalPrice,
        screen: 'A',
        bookingDate: new Date().toISOString()
      };
      
      const updatedBookings = [newBooking, ...existingBookings];
      localStorage.setItem('movieBookings', JSON.stringify(updatedBookings));
      setBookings(updatedBookings);
      window.history.replaceState({}, document.title);
    } else {
      setBookings(existingBookings);
    }
    
    setTimeout(() => setLoading(false), 800);
  };

  useEffect(() => {
    getMyBookings();
  }, [location]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getBookingStatus = (showDate, showTime) => {
    const showDateTime = new Date(`${showDate} ${showTime}`);
    const now = new Date();
    return showDateTime > now ? 'upcoming' : 'past';
  };

  const filteredBookings = bookings.filter((booking) => {
    if (filter === 'all') return true;
    const status = getBookingStatus(booking.date, booking.time);
    return status === filter;
  });

  const handleDownloadTicket = (booking) => {
    alert(`Downloading ticket for ${booking.movieTitle}`);
  };

  const handleCancelBooking = (booking) => {
    if (window.confirm(`Are you sure you want to cancel your booking for ${booking.movieTitle}?`)) {
      const updatedBookings = bookings.filter((b) => b.id !== booking.id);
      setBookings(updatedBookings);
      localStorage.setItem('movieBookings', JSON.stringify(updatedBookings));
      alert('Booking cancelled successfully');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Film className="h-16 w-16 text-red-600 animate-pulse mx-auto mb-4" />
          <div className="text-xl text-gray-300 animate-pulse">Loading your bookings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-gray-200 pt-16 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-red-950/10 via-black to-black pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 bg-gradient-to-r from-red-950/30 to-transparent border-l-4 border-red-600 p-6 rounded-r-lg">
          <div className="flex items-center gap-4 mb-2">
            <Ticket className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-white tracking-wide">My Bookings</h1>
          </div>
          <p className="text-sm text-gray-400 ml-12">Manage your movie tickets and upcoming cinematic experiences</p>
        </div>

        <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6 mb-8 shadow-2xl">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{bookings.length}</div>
                <div className="text-sm text-gray-400">Total Bookings</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-500">
                  {bookings.filter((b) => getBookingStatus(b.date, b.time) === 'upcoming').length}
                </div>
                <div className="text-sm text-gray-400">Upcoming</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-500">
                  {bookings.filter((b) => getBookingStatus(b.date, b.time) === 'past').length}
                </div>
                <div className="text-sm text-gray-400">Past</div>
              </div>
            </div>

            <div className="flex gap-2">
              {[
                { key: 'all', label: 'All Bookings' },
                { key: 'upcoming', label: 'Upcoming' },
                { key: 'past', label: 'Past' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setFilter(key)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    filter === key
                      ? 'bg-gradient-to-br from-red-600 to-red-800 text-white shadow-lg shadow-red-900/50'
                      : 'bg-gray-900 text-gray-300 border border-gray-800 hover:border-red-600/50 hover:bg-gray-800'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => {
              const status = getBookingStatus(booking.date, booking.time);
              const isUpcoming = status === 'upcoming';

              return (
                <div
                  key={booking.id}
                  className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl shadow-2xl overflow-hidden transition-all duration-300"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-1/4 relative">
                      <img
                        src={booking.poster_path}
                        alt={booking.movieTitle}
                        className="w-full h-64 lg:h-full object-cover"
                      />
                      <div className="absolute top-3 right-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm ${
                            isUpcoming ? 'bg-red-600/90 text-white' : 'bg-gray-600/90 text-white'
                          }`}
                        >
                          {isUpcoming ? 'Upcoming' : 'Completed'}
                        </span>
                      </div>
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold text-white mb-4">{booking.movieTitle}</h3>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div className="flex items-center gap-3 text-gray-300">
                              <Calendar className="h-5 w-5 text-red-500" />
                              <span>{formatDate(booking.date)}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                              <Clock className="h-5 w-5 text-red-500" />
                              <span>{booking.time}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                              <MapPin className="h-5 w-5 text-red-500" />
                              <span>Screen {booking.screen}</span>
                            </div>
                            <div className="flex items-center gap-3 text-gray-300">
                              <User className="h-5 w-5 text-red-500" />
                              <span>{booking.seats.length} {booking.seats.length === 1 ? 'Seat' : 'Seats'}</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-4 mb-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400">Seats:</span>
                              <div className="flex gap-1 flex-wrap">
                                {booking.seats.map((seat, index) => (
                                  <span
                                    key={index}
                                    className="bg-red-600/20 text-red-300 px-2 py-1 rounded text-sm font-medium border border-red-500/30"
                                  >
                                    {seat}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-400">Total:</span>
                              <span className="text-xl font-bold text-white">
                                ₹{booking.totalPrice.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>

                          <div className="text-sm text-gray-500">
                            Booking ID: <span className="font-mono text-gray-400">{booking.id}</span>
                          </div>
                        </div>

                        <div className="flex lg:flex-col gap-2">
                          <button
                            onClick={() => handleDownloadTicket(booking)}
                            className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold text-sm shadow-lg shadow-red-900/50"
                          >
                            <Download size={16} />
                            Download
                          </button>
                          {isUpcoming && (
                            <button
                              onClick={() => handleCancelBooking(booking)}
                              className="flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 font-semibold text-sm border border-gray-700"
                            >
                              <Trash2 size={16} />
                              Cancel
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16">
              <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-12 shadow-2xl">
                <Ticket className="h-20 w-20 text-gray-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                  {filter === 'all' ? 'No Bookings Yet' : `No ${filter} bookings`}
                </h3>
                <p className="text-gray-500 mb-6 max-w-md mx-auto">
                  {filter === 'all'
                    ? "You haven't made any bookings yet. Explore our movies and book your first cinematic experience!"
                    : `You don't have any ${filter} bookings at the moment.`}
                </p>
                {filter === 'all' && (
                  <button
                    onClick={() => navigate('/movies')}
                    className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 font-semibold shadow-lg shadow-red-900/50 mx-auto"
                  >
                    <Film size={20} />
                    Browse Movies
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {filteredBookings.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              Need help with your bookings? Contact our support team.
            </p>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(220, 38, 38, 0.5);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(220, 38, 38, 0.7);
        }
      `}</style>
    </div>
  );
};

export default MyBookings;