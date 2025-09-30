import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Clock, User, Star, Film, Calendar, Ticket, ArrowLeft } from 'lucide-react';
import { dummyDateTimeData, dummyShowsData, dummyDashboardData, assets } from '../assets/assets';

const SeatLayout = () => {
  const { id, date } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);

  const seatPricing = {
    standard: 800,
    premium: 1200,
    wheelchair: 650
  };

  const seatLayout = [
    { row: 'A', seats: Array(12).fill('standard'), aisleAfter: [3, 8] },
    { row: 'B', seats: Array(12).fill('standard'), aisleAfter: [3, 8] },
    { row: 'C', seats: Array(12).fill('standard'), aisleAfter: [3, 8] },
    { row: 'D', seats: Array(12).fill('standard'), aisleAfter: [3, 8] },
    { row: 'E', seats: Array(12).fill('standard'), aisleAfter: [3, 8] },
    { row: 'F', seats: ['wheelchair', ...Array(10).fill('standard'), 'wheelchair'], aisleAfter: [3, 8] },
    { row: 'G', seats: Array(12).fill('standard'), aisleAfter: [3, 8] },
    { row: 'H', seats: Array(12).fill('standard'), aisleAfter: [3, 8] },
    { row: 'I', seats: Array(12).fill('premium'), aisleAfter: [3, 8] },
    { row: 'J', seats: Array(12).fill('premium'), aisleAfter: [3, 8] }
  ];

  // Enhanced showtimes - 12 shows per day
  const enhancedShowtimes = [
    '8:30 AM', '10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM',
    '5:30 PM', '7:00 PM', '8:30 PM', '10:00 PM', '11:30 PM', '1:00 AM'
  ];

  useEffect(() => {
    const fetchShow = async () => {
      setLoading(true);
      try {
        const show = dummyShowsData.find((s) => s._id === id);
        if (show) {
          // Create enhanced dateTime data for all dates
          const enhancedDateTime = {};
          Object.keys(dummyDateTimeData).forEach(dateKey => {
            enhancedDateTime[dateKey] = enhancedShowtimes.map(time => ({
              time,
              availableSeats: Array.from({ length: 120 }, (_, i) => 
                `${String.fromCharCode(65 + Math.floor(i / 12))}${(i % 12) + 1}`
              )
            }));
          });

          setShow({
            movie: show,
            dateTime: enhancedDateTime
          });
          setSelectedTime(enhancedShowtimes[0]);
        } else {
          setShow(null);
        }
      } catch (error) {
        console.error('Error fetching show:', error);
        setShow(null);
      } finally {
        setLoading(false);
      }
    };
    fetchShow();
  }, [id, date]);

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setSelectedSeats([]);
  };

  const calculateTotalPrice = () => {
    return selectedSeats.reduce((total, seat) => {
      const row = seat.match(/[A-J]/)[0];
      const seatIndex = parseInt(seat.match(/\d+/)[0]) - 1;
      const seatType = seatLayout.find(r => r.row === row).seats[seatIndex];
      return total + seatPricing[seatType];
    }, 0);
  };

  const handleSeatSelect = (seat) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seat));
    } else if (selectedSeats.length < 6) {
      setSelectedSeats([...selectedSeats, seat]);
    } else {
      alert('You can select up to 6 seats only.');
    }
  };

  const handleProceed = () => {
    if (selectedSeats.length > 0 && selectedTime) {
      // Directly navigate to MyBookings without confirmation modal
      navigate('/my-bookings', {
        state: {
          show,
          date,
          time: selectedTime,
          seats: selectedSeats,
          movieTitle: state?.movieTitle || show?.movie.title,
          totalPrice: calculateTotalPrice()
        }
      });
    } else {
      alert('Please select a time and at least one seat.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <Film className="h-16 w-16 text-red-600 animate-pulse mx-auto mb-4" />
          <div className="text-xl text-gray-300 animate-pulse">Loading theatre...</div>
        </div>
      </div>
    );
  }

  if (!show || !show.dateTime[date]) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-center px-4">
        <div>
          <Ticket className="h-16 w-16 text-red-600 mx-auto mb-4" />
          <h2 className="text-2xl text-red-500 mb-2">Show Not Available</h2>
          <p className="text-gray-400 mb-4">{show ? `No showtimes for ${date}` : `Show not found`}</p>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors mx-auto"
          >
            <ArrowLeft size={20} /> Back
          </button>
        </div>
      </div>
    );
  }

  const activeShow = dummyDashboardData.activeShows.find(
    (s) => s.movie._id === id && new Date(s.showDateTime).toISOString().split('T')[0] === date
  );
  const occupiedSeats = activeShow ? Object.keys(activeShow.occupiedSeats) : [];
  const availableSeats = show.dateTime[date].find((item) => item.time === selectedTime)?.availableSeats || [];

  return (
    <div className="min-h-screen bg-black text-gray-200 pt-16 pb-10 relative overflow-hidden">
      {/* Theatre ambiance overlay */}
      <div className="absolute inset-0 bg-gradient-radial from-red-950/10 via-black to-black pointer-events-none"></div>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors mb-6"
        >
          <ArrowLeft size={20} /> Back to Movie Details
        </button>

        {/* Movie Header */}
        <div className="mb-8 bg-gradient-to-r from-red-950/30 to-transparent border-l-4 border-red-600 p-6 rounded-r-lg">
          <div className="flex items-center gap-4 mb-2">
            <Film className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-white tracking-wide">{state?.movieTitle || show.movie.title}</h1>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400 ml-12">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-red-500" />
              <span>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-500" />
              <span>{selectedTime || 'Select showtime'}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Showtimes Sidebar */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-5 shadow-2xl lg:sticky lg:top-20">
              <div className="flex items-center gap-2 mb-5 pb-3 border-b border-red-900/30">
                <Clock className="h-5 w-5 text-red-600" />
                <h2 className="text-lg font-bold text-white tracking-wide">SHOWTIMES</h2>
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {enhancedShowtimes.map((time, index) => {
                  const isPrimeTime = ['7:00 PM', '8:30 PM', '10:00 PM'].includes(time);
                  return (
                    <button
                      key={`${time}-${index}`}
                      className={`relative group p-3 rounded-lg transition-all duration-300 font-semibold text-sm ${
                        selectedTime === time 
                          ? 'bg-gradient-to-br from-red-600 to-red-800 text-white shadow-lg shadow-red-900/50 scale-105' 
                          : 'bg-gray-900 text-gray-300 border border-gray-800 hover:border-red-600/50 hover:bg-gray-800 hover:scale-102'
                      }`}
                      onClick={() => handleTimeSelect(time)}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{time}</span>
                      </div>
                      {isPrimeTime && selectedTime !== time && (
                        <div className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[9px] px-1.5 py-0.5 rounded-full font-bold">
                          HOT
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Seat Layout */}
          <div className="lg:col-span-9">
            <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6 shadow-2xl">
              {/* Screen */}
              <div className="mb-10">
                <div className="relative mb-3">
                  <div className="absolute inset-0 bg-gradient-to-b from-red-600/20 to-transparent blur-2xl"></div>
                  <img
                    src={assets.screenImage}
                    alt="Theater Screen"
                    className="relative w-full max-w-2xl mx-auto border-t-4 border-red-600 rounded-t-3xl shadow-[0_-10px_50px_rgba(220,38,38,0.4)]"
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-b from-red-600/10 to-transparent h-20 blur-xl"></div>
                  <p className="relative text-red-500 text-center text-xs font-bold tracking-[0.3em] uppercase">
                    Cinema Screen
                  </p>
                </div>
              </div>

              {selectedTime ? (
                <div>
                  {/* Seat Grid */}
                  <div className="bg-black/40 rounded-xl p-6 mb-6 backdrop-blur-sm border border-red-900/20">
                    <div className="space-y-3">
                      {seatLayout.map((row) => (
                        <div key={row.row} className="flex items-center gap-3 justify-center">
                          <span className="w-8 text-center text-sm font-bold text-red-500 tracking-wider">{row.row}</span>
                          <div className="flex gap-1.5">
                            {row.seats.map((seatType, index) => {
                              const seatId = `${row.row}${index + 1}`;
                              const isOccupied = occupiedSeats.includes(seatId) || !availableSeats.includes(seatId);
                              const isSelected = selectedSeats.includes(seatId);
                              const isWheelchair = seatType === 'wheelchair';
                              const isPremium = seatType === 'premium';

                              return (
                                <React.Fragment key={seatId}>
                                  <div
                                    className={`relative w-8 h-8 flex items-center justify-center text-xs font-bold rounded transition-all duration-200 cursor-pointer group ${
                                      isSelected
                                        ? 'bg-gradient-to-br from-green-500 to-green-700 text-white shadow-lg shadow-green-900/50 scale-110 ring-2 ring-green-400'
                                        : isOccupied
                                        ? 'bg-gray-800 text-gray-600 cursor-not-allowed opacity-50'
                                        : isPremium
                                        ? 'bg-gradient-to-br from-amber-600 to-amber-800 text-white hover:scale-110 hover:shadow-lg hover:shadow-amber-900/50'
                                        : isWheelchair
                                        ? 'bg-gradient-to-br from-blue-600 to-blue-800 text-white hover:scale-110 hover:shadow-lg hover:shadow-blue-900/50'
                                        : 'bg-gradient-to-br from-gray-700 to-gray-800 text-gray-300 hover:scale-110 hover:from-gray-600 hover:to-gray-700 hover:shadow-lg'
                                    }`}
                                    onClick={() => !isOccupied && handleSeatSelect(seatId)}
                                  >
                                    {isWheelchair ? (
                                      <User className="h-4 w-4" />
                                    ) : isPremium ? (
                                      <Star className="h-4 w-4" />
                                    ) : (
                                      <span className="text-[10px]">{index + 1}</span>
                                    )}
                                    <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-950 text-white text-xs rounded-lg px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 border border-red-900/30 shadow-xl">
                                      <div className="font-bold mb-1">{seatId}</div>
                                      <div className="text-gray-400">
                                        {isOccupied ? 'Occupied' : isSelected ? 'Selected' : `₹${seatPricing[seatType]}`}
                                      </div>
                                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-950 border-r border-b border-red-900/30"></div>
                                    </div>
                                  </div>
                                  {row.aisleAfter.includes(index + 1) && <div className="w-6" />}
                                </React.Fragment>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Legend */}
                  <div className="flex flex-wrap justify-center gap-6 mb-6 pb-6 border-b border-red-900/30">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-gray-700 to-gray-800 rounded"></div>
                      <span className="text-sm">Standard ₹{seatPricing.standard}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-amber-600 to-amber-800 rounded flex items-center justify-center">
                        <Star className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm">Premium ₹{seatPricing.premium}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="text-sm">Wheelchair ₹{seatPricing.wheelchair}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-800 rounded opacity-50"></div>
                      <span className="text-sm">Occupied</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gradient-to-br from-green-500 to-green-700 rounded ring-2 ring-green-400"></div>
                      <span className="text-sm">Selected</span>
                    </div>
                  </div>

                  {/* Booking Summary */}
                  <div className="bg-gradient-to-br from-red-950/30 to-transparent border border-red-900/30 rounded-xl p-5">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="text-sm text-gray-400 mb-1">Selected Seats</div>
                        <div className="text-lg font-bold text-white">
                          {selectedSeats.length > 0 ? selectedSeats.join(', ') : 'No seats selected'}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <div className="flex-1 bg-gray-900 rounded-full h-2 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-red-600 to-red-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(selectedSeats.length / 6) * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs text-gray-500">{selectedSeats.length}/6</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-gray-400 mb-1">Total Amount</div>
                        <div className="text-3xl font-bold text-white">₹{calculateTotalPrice()}</div>
                      </div>
                    </div>
                    <button
                      className={`mt-5 w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 ${
                        selectedSeats.length === 0
                          ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                          : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-900/50 hover:shadow-xl hover:shadow-red-900/70 transform hover:scale-[1.02]'
                      }`}
                      onClick={handleProceed}
                      disabled={selectedSeats.length === 0}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Ticket className="h-5 w-5" />
                        <span>Book Now</span>
                      </div>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <Clock className="h-16 w-16 text-gray-700 mx-auto mb-4" />
                  <p className="text-gray-500">Please select a showtime to view available seats</p>
                </div>
              )}
            </div>
          </div>
        </div>
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

export default SeatLayout;