

# Connect

## Project Overview

This project is a fullstack single-page application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) that allows users to search, filter, and sort product data. It includes pagination, categorization, and authentication features.


## Functionalities

1. **Setup and Basic Structure:**
   - **MERN Stack:** MongoDB, Express.js, React.js, Node.js.
   - **APIs:** Create and structure APIs to fetch product data from the database.
   - **Dummy Data:** Insert at least 40 dummy products into the database manually or via an API.

2. **Pagination:**
   - Backend supports pagination to load products efficiently.
   - Frontend displays page numbers with navigation buttons (Next, Previous).

3. **Searching:**
   - Users can search for products based on the product name.

4. **Categorization:**
   - Products can be filtered by:
     - **Brand Name**
     - **Category Name**
     - **Price Range**
   - Filters can be used individually or in combination.

5. **Sorting:**
   - Users can sort products by:
     - **Price:** Low to High, High to Low
     - **Date Added:** Newest first

## Technology Used

- **Frontend**: React.js
  
- **Backend**: Node.js with Express.js
  
- **Database**: MongoDB.

## Cloning and Running Locally

To clone and run this project locally, follow these steps:

- **Clone the repository**:
   git clone https://github.com/azaaaaaaaaad/scic-jobtask-server.git

- **Navigate to project directory**:
    cd scic-jobtask-server
   
- **Install dependencies**:
   npm install
   
- **Set up environment variables**:
   Create a .env file with necessary configurations (database URI, API keys, etc.).
   
- **Start the server**:
   nodemon index.js

- **Open the app in your browser.**:
   Visit http://localhost:5000