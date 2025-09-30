import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';

const DateSelect = ({ dateTime, id, selectedDate, onDateSelect, movieTitle }) => {
  const navigate = useNavigate();

  if (!dateTime || Object.keys(dateTime).length === 0) {
    return (
      <div id="date-select" className="pt-4">
       <p className="text-lg font-semibold text-white">Choose Date</p>
        <p className="text-gray-600 mt-2">No showtimes available for this movie.</p>
      </div>
    );
  }

  const formatDateForURL = (date) => {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // Converts to YYYY-MM-DD
  };

  const handleBookNow = () => {
    if (!selectedDate) {
      alert('Please select a date before booking.');
      return;
    }
    if (!id) {
      alert('Invalid movie selection.');
      return;
    }
    const formattedDate = formatDateForURL(selectedDate);
    console.log('Navigating with ID:', id, 'Date:', formattedDate);
    navigate(`/movie/${id}/${formattedDate}`, {
      state: { movieTitle },
    });
  };

  return (
    <div id="date-select" className="pt-4">
      <div className="flex flex-col md:flex-row gap-4 md:gap-10 lg:gap-20 items-center justify-center">
        <div>
          <p className="text-lg font-semibold text-white">Choose Date</p>

          <div className="flex gap-4 mt-4 items-center">
            <ChevronLeftIcon className="h-7 w-7 text-gray-600 cursor-pointer" aria-label="Previous dates" />
            <span className="flex gap-2">
              {Object.keys(dateTime).map((date) => (
                <button
  key={date}
  onClick={() => onDateSelect(date)}
  className={`px-4 py-2 rounded-lg shadow hover:shadow-lg transition-all cursor-pointer 
    ${
      selectedDate === date
        ? 'bg-blue-600 text-white border border-blue-400'
        : 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
    }`}
  aria-label={`Select date ${new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
>
  <span>{new Date(date).getDate()}</span>
  <span className="ml-1">{new Date(date).toLocaleDateString('en-US', { month: 'short' })}</span>
</button>

              ))}
            </span>
            <ChevronRightIcon className="h-7 w-7 text-gray-600 cursor-pointer" aria-label="Next dates" />
          </div>
        </div>
        <button
          onClick={handleBookNow}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition-shadow cursor-pointer"
          aria-label="Proceed to seat selection"
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default DateSelect;