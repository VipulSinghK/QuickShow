QuickShow – Movie Ticket Booking Application

QuickShow is a full-stack web application designed to provide users with a seamless movie ticket booking experience. It allows users to browse currently available movies, view theatre listings, select show timings, choose their preferred seats, and complete their booking through a secure payment gateway.

The application is built with a modern technology stack, featuring React + Vite for the frontend, Node.js + Express for the backend, and PostgreSQL for the database. It also includes Razorpay integration for handling real-time payments, and a secure authentication system using both JWT and OAuth.

Technology Stack-

Frontend-
React + Vite: Provides a fast development environment with efficient build times and optimized production output.

React Router: Enables client-side routing for smooth navigation between pages without full page reloads.

API State Management: Handles data fetching, caching, and synchronization between the frontend and backend efficiently.

Tailwind CSS: Used for building responsive and modern user interfaces with a utility-first approach.

Backend-

Node.js + Express: Handles server-side operations and exposes REST APIs for various functionalities including authentication, movie listings, theatre data, and ticket bookings.

JWT Authentication: Secures API routes and enables stateless, token-based user sessions.

OAuth: Supports third-party logins (e.g., Google), allowing users to sign up and log in using multiple methods.

PostgreSQL: A robust relational database that stores user information, movie data, theatre details, bookings, and payment records.

Razorpay Payment Gateway: Integrated to securely process payments and generate booking confirmations.

Key Features-

1. User Authentication

Users can register and log in using either traditional email-password authentication (secured with JWT) or through third-party OAuth providers.

Multiple sessions are supported, allowing users to stay logged in across devices.

Authentication tokens are securely managed to protect user data and API access.

2. Movie Discovery and Booking

Users can browse available movies, view detailed information, and see which theatres are showing each movie.

Theatre pages display show timings and seat layouts for users to select their preferred seats.

The application provides a responsive seat selection interface that adapts to different screen sizes, ensuring a smooth booking flow on both mobile and desktop devices.

3. Payment Integration

Razorpay is integrated for real-time payment processing.

Once the user selects their seats and proceeds to checkout, they are directed to the Razorpay interface to complete the transaction.

Upon successful payment, booking details are stored in the database, and a confirmation email is sent to the user.

4. Responsive Design

The entire application is designed to work seamlessly across devices including desktops, tablets, and smartphones.

Tailwind CSS ensures a consistent, clean, and adaptive user interface.

5. Deployment

The frontend is deployed on Netlify, ensuring fast content delivery through CDN and easy continuous deployment.

The backend is hosted on Render or Vercel, making it accessible through public API endpoints.

The PostgreSQL database is hosted in a secure and scalable environment.

QuickShow/
├── client/                     # React + Vite frontend
│   ├── src/
│   ├── public/
│   └── ...
├── server/                     # Node.js + Express backend
│   ├── routes/                 # API route definitions
│   ├── controllers/            # Business logic for different features
│   ├── middleware/             # Authentication and error handling
│   ├── prisma/ or models/      # Database schema and ORM files
│   └── ...
└── README.md


Future Enhancements- 

Admin Panel: A dashboard for theatre owners and admins to add movies, manage show timings, and view booking reports.

Real-Time Notifications: Push notifications or email alerts for booking updates and cancellations.

Ticket Cancellation: Allow users to cancel bookings and process refunds through Razorpay.

Internationalization: Multi-language support to reach a wider audience.

Analytics Dashboard: Provide insights into sales, popular movies, and user activity.