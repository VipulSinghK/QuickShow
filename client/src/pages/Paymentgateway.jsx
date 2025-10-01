import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Lock, AlertCircle, Clock, Shield, ArrowLeft, Ticket, Phone, Download } from 'lucide-react';
import QRCodeImage from '../assets/WhatsApp Image 2025-10-01 at 23.45.06_67c64ea0.jpg'; // Import the QR code image

const PaymentGateway = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);
  const [countdown, setCountdown] = useState(600);
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    email: '' // Added email field for UPI
  });
  const [errors, setErrors] = useState({});

  const bookingData = location.state;

  useEffect(() => {
    if (!bookingData) {
      navigate('/movies');
      return;
    }

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          alert('Session expired. Please try again.');
          navigate(-1);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [bookingData, navigate]);

  if (!bookingData) return null;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
      if (formattedValue.length > 19) return;
    }

    if (name === 'expiryDate') {
      formattedValue = value.replace(/\D/g, '');
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.slice(0, 2) + '/' + formattedValue.slice(2, 4);
      }
      if (formattedValue.length > 5) return;
    }

    if (name === 'cvv' && value.length > 3) return;

    setFormData({ ...formData, [name]: formattedValue });
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (paymentMethod === 'card') {
      if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!formData.cardHolder || formData.cardHolder.length < 3) {
        newErrors.cardHolder = 'Please enter card holder name';
      }
      if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please enter valid expiry date (MM/YY)';
      }
      if (!formData.cvv || formData.cvv.length !== 3) {
        newErrors.cvv = 'Please enter 3-digit CVV';
      }
    } else if (paymentMethod === 'upi') {
      if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    } else if (paymentMethod === 'wallet') {
      // Add wallet-specific validation if needed in the future
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Function to generate and download ticket
  const generateTicket = (bookingInfo) => {
    const ticketContent = `
🎬 CINEMAHUB - MOVIE TICKET
=============================

MOVIE: ${bookingInfo.movieTitle}
DATE: ${new Date(bookingInfo.date).toLocaleDateString('en-US', { 
  weekday: 'long', 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}
TIME: ${bookingInfo.time}
SCREEN: ${bookingInfo.screen || 'Screen 1'}

SEATS: ${bookingInfo.seats.join(', ')}
TOTAL SEATS: ${bookingInfo.seats.length}

💺 SEAT DETAILS:
${bookingInfo.seats.map(seat => `      ${seat}`).join('\n')}

PAYMENT DETAILS:
- Transaction ID: ${bookingInfo.transactionId}
- Payment Method: ${bookingInfo.paymentMethod}
- Total Amount: ₹${bookingInfo.finalAmount}
- Payment Status: ✅ CONFIRMED

🎫 TICKET ID: ${bookingInfo.ticketId}
📧 BOOKING EMAIL: ${bookingInfo.userEmail}

=============================
🎭 IMPORTANT INFORMATION:
• Please arrive at least 30 minutes before showtime
• Present this ticket at the entrance
• Valid ID proof required for entry
• No refunds or exchanges allowed

Thank you for choosing CinemaHub!
Enjoy your movie! 🍿

Generated on: ${new Date().toLocaleString()}
    `;

    const blob = new Blob([ticketContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `CinemaHub-Ticket-${bookingInfo.movieTitle.replace(/\s+/g, '-')}-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    // Simulate sending ticket to email (in a real app, this would call an email service)
    console.log(`Simulating email sent to ${bookingInfo.userEmail} with ticket details:`, ticketContent);
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setProcessing(true);

    const transactionId = `TXN${Date.now()}`;
    const convenienceFee = Math.round(bookingData.totalPrice * 0.02);
    const gst = Math.round((bookingData.totalPrice + convenienceFee) * 0.18);
    const finalAmount = bookingData.totalPrice + convenienceFee + gst;

    // Update booking in localStorage
    const existingBookings = JSON.parse(localStorage.getItem('movieBookings') || '[]');
    const updatedBookings = existingBookings.map((booking) =>
      booking.id === bookingData.bookingId
        ? { 
            ...booking, 
            paymentStatus: 'success', 
            transactionId,
            paymentMethod,
            finalAmount,
            convenienceFee,
            gst,
            bookingDate: new Date().toISOString(),
            ticketId: `TKT-${Date.now()}`,
            screen: bookingData.screen || 'Screen 1',
            userEmail: paymentMethod === 'upi' ? formData.email : (bookingData.userEmail || 'customer@cinemahub.com')
          }
        : booking
    );
    localStorage.setItem('movieBookings', JSON.stringify(updatedBookings));

    // Generate ticket data
    const ticketData = {
      ...bookingData,
      transactionId,
      paymentMethod,
      finalAmount,
      convenienceFee,
      gst,
      bookingDate: new Date().toISOString(),
      ticketId: `TKT-${Date.now()}`,
      screen: bookingData.screen || 'Screen 1',
      userEmail: paymentMethod === 'upi' ? formData.email : (bookingData.userEmail || 'customer@cinemahub.com')
    };

    setTimeout(() => {
      // Generate and download ticket automatically after payment
      generateTicket(ticketData);
      
      // Navigate to my-bookings with success data
      navigate('/my-bookings', {
        state: {
          ...ticketData,
          paymentStatus: 'success',
          showSuccess: true
        }
      });
    }, 2000);
  };

  const convenienceFee = Math.round(bookingData.totalPrice * 0.02);
  const gst = Math.round((bookingData.totalPrice + convenienceFee) * 0.18);
  const finalAmount = bookingData.totalPrice + convenienceFee + gst;

  return (
    <div className="min-h-screen bg-black text-gray-200 pt-16 pb-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-red-950/10 via-black to-black pointer-events-none"></div>
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-blue-400 font-semibold hover:text-blue-300 transition-colors mb-6">
          <ArrowLeft size={20} /> Back
        </button>

        <div className="mb-8 bg-gradient-to-r from-red-950/30 to-transparent border-l-4 border-red-600 p-6 rounded-r-lg">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Lock className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-3xl font-bold text-white tracking-wide">Secure Payment</h1>
                <p className="text-sm text-gray-400 mt-1">Complete your booking for {bookingData.movieTitle}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-yellow-500 mb-1">
                <Clock className="h-5 w-5" />
                <span className="text-2xl font-bold">{formatTime(countdown)}</span>
              </div>
              <p className="text-xs text-gray-500">Session expires in</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {/* Payment Method Selection */}
            <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4">Select Payment Method</h2>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'card', label: 'Card', icon: CreditCard },
                  { id: 'upi', label: 'UPI', icon: Phone },
                  { id: 'wallet', label: 'Wallet', icon: Shield }
                ].map(method => (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 rounded-lg transition-all duration-300 ${
                      paymentMethod === method.id
                        ? 'bg-gradient-to-br from-red-600 to-red-800 text-white shadow-lg shadow-red-900/50'
                        : 'bg-gray-800 text-gray-300 border border-gray-700 hover:border-red-600/50'
                    }`}
                  >
                    <method.icon className="h-6 w-6 mx-auto mb-2" />
                    <span className="text-sm font-semibold">{method.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-4">Payment Details</h2>
              
              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.cardNumber ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:border-red-600 font-mono`}
                      placeholder="1234 5678 9012 3456"
                    />
                    {errors.cardNumber && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.cardNumber}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Card Holder Name</label>
                    <input
                      type="text"
                      name="cardHolder"
                      value={formData.cardHolder}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.cardHolder ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:border-red-600`}
                      placeholder="JOHN DOE"
                    />
                    {errors.cardHolder && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.cardHolder}</p>}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.expiryDate ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:border-red-600 font-mono`}
                        placeholder="MM/YY"
                      />
                      {errors.expiryDate && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.expiryDate}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-400 mb-2">CVV</label>
                      <input
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.cvv ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:border-red-600 font-mono`}
                        placeholder="123"
                        maxLength="3"
                      />
                      {errors.cvv && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.cvv}</p>}
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="space-y-4 py-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-400 mb-2">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg bg-gray-800 border ${errors.email ? 'border-red-500' : 'border-gray-700'} text-white focus:outline-none focus:border-red-600`}
                      placeholder="your.email@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle size={12} /> {errors.email}</p>}
                    <p className="text-xs text-gray-400 mt-1">Your ticket will be sent to this email address</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-400 mb-4">Scan the QR code below to make the payment</p>
                    <img
                      src={QRCodeImage}
                      alt="UPI Payment QR Code"
                      className="w-48 h-48 mx-auto rounded-lg border border-red-600/50 shadow-lg shadow-red-900/30"
                    />
                    <p className="text-sm text-gray-400 mt-4">Use your UPI app to scan this QR code and pay ₹{finalAmount}</p>
                    <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                      <p className="text-sm text-gray-400">Popular UPI Apps:</p>
                      <div className="flex gap-2 mt-2 flex-wrap justify-center">
                        {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                          <span key={app} className="px-3 py-1 bg-gray-700 text-gray-300 text-xs rounded-full">{app}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'wallet' && (
                <div className="text-center py-8">
                  <Shield className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">Select your preferred wallet</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Paytm Wallet', 'Mobikwik', 'Freecharge', 'Amazon Pay'].map(wallet => (
                      <button key={wallet} className="px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg hover:border-red-600/50 transition-colors text-sm">
                        {wallet}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Security Notice */}
            <div className="bg-green-950/30 border border-green-900/50 rounded-lg p-4 flex items-start gap-3">
              <Shield className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-green-400 font-semibold mb-1">Secure Payment</p>
                <p className="text-xs text-gray-400">Your payment information is encrypted and secure. We never store your card details.</p>
              </div>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-b from-gray-900 to-black border border-red-900/30 rounded-xl p-6 shadow-2xl sticky top-20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Ticket className="h-5 w-5 text-red-600" />
                Booking Summary
              </h2>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-800">
                <div>
                  <p className="text-sm text-gray-400">Movie</p>
                  <p className="font-semibold text-white">{bookingData.movieTitle}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-sm text-gray-400">Date</p>
                    <p className="text-white font-medium text-sm">
                      {new Date(bookingData.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Time</p>
                    <p className="text-white font-medium text-sm">{bookingData.time}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Seats</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {bookingData.seats.map((seat, index) => (
                      <span key={index} className="bg-red-600/20 text-red-300 px-2 py-1 rounded text-xs border border-red-500/30">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-800">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Ticket Price ({bookingData.seats.length} seats)</span>
                  <span className="text-white">₹{bookingData.totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Convenience Fee</span>
                  <span className="text-white">₹{convenienceFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">GST (18%)</span>
                  <span className="text-white">₹{gst}</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="text-lg font-bold text-white">Total Amount</span>
                <span className="text-2xl font-bold text-white">₹{finalAmount}</span>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className={`w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 ${
                  processing
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800 shadow-lg shadow-red-900/50 hover:shadow-xl'
                }`}
              >
                {processing ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
                    Processing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Lock className="h-5 w-5" />
                    Pay ₹{finalAmount}
                  </div>
                )}
              </button>

              {/* Download Notice */}
              <div className="mt-4 p-3 bg-blue-950/30 border border-blue-700/50 rounded-lg">
                <div className="flex items-center gap-2 text-blue-400 text-sm">
                  <Download className="h-4 w-4" />
                  <span className="font-semibold">Ticket Download</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">
                  Your ticket will be automatically downloaded and emailed after successful payment
                </p>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">By proceeding, you agree to our Terms & Conditions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentGateway;