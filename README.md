# E-Commerce Website

## Introduction
This is a full-featured **E-Commerce Website** built using the MERN stack (MongoDB, Express, React, Node.js). The application allows users to browse products, add them to the cart, and complete purchases through a secure payment gateway. It also features an admin interface for managing products, orders, and users.

## Features
- **User Authentication**: Register, login, and logout functionality for customers.
- **Product Management**: Users can browse products by category, search for items, and view product details.
- **Shopping Cart**: Add/remove items from the cart and update quantities.
- **Order Management**: Place orders, view order history, and track shipping status.
- **Payment Integration**: Secure payment gateway integration (sing Stripe).
- **Admin Dashboard**: Admin users can manage products, orders, and users.
- **Responsive Design**: Optimized for both desktop and mobile devices.

## Technologies Used
- **Frontend**:
  - React.js
  - Redux for state management
  - Axios for HTTP requests
  - React Router for navigation
  - tailwindCss for styling

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB with Mongoose for database management
  - JWT for authentication
  - Bcrypt.js for password hashing
  - Multer for images uploading

- **Payment Gateway**:
  - Stripe Api

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js
- npm (Node Package Manager)
- MongoDB (or use a cloud-hosted MongoDB service like MongoDB Atlas)

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/e-commerce-web-app.git
   cd e-commerce-mern

2. Install backend dependencies:
    ```bash:
    cd backend
    npm install

3. Install frontend dependencies:
    ```bash:
    cd my-app
    npm install

3. Set up environment variables: Create a .env file in the backend directory and add the following:
    ```bash:
    MONGO_URI=your_mongodb_connection_string
    SECRET_TOKEN= your-secret-key

4. Start the backend server::
    cd backend
    npm run dev

5. Start the frontend development server:
    cd my-app
    npm run dev

### Usage
- Home Page: Users can browse featured products and categories.
- Product Search: Use the search bar to find specific products.
- Add to Cart: Click on any product to view details and add it to the cart.
- Checkout: Proceed to checkout and complete payment securely using Stripe.
- Admin Dashboard: Admin users can log in and manage the platform via the dashboard.