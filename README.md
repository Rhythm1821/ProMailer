# ProMailer

ProMailer is an innovative Email Marketing Automation tool designed to help businesses convert leads into clients efficiently. With ProMailer, you can create, manage, and automate email campaigns, ensuring that your leads are nurtured and engaged throughout their journey. Built with the MERN stack (MongoDB, Express, React, Node.js) and ReactFlow React library for building node-based editors and interactive flow charts. ProMailer offers a robust and scalable solution for all your email marketing needs. More features arriving soon.

## Features

- Create and manage email templates
- Automate email workflows with customizable delays
- Seamless integration with your existing lead sources
- User-friendly interface for designing workflows

## Installation

Follow these steps to install and run ProMailer on your local computer:

### Prerequisites

Make sure you have the following:

- Node.js 
- npm 
- MongoDB URI
- Email credentials -: `EMAIL_USER` and `EMAIL_PASS`

### Backend Setup

1. Clone the repository:

    ```sh
    git clone https://github.com/Rhythm1821/ProMailer.git
    cd ProMailer/backend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the backend directory and add the following environment variables:

    ```env
    MONGODB_URI=
    EMAIL_USER=
    EMAIL_PASS=
    ```

4. Start the backend server:

    ```sh
    npm start
    ```

### Frontend Setup

1. Navigate to the frontend directory:

    ```sh
    cd ../frontend
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Create a `.env` file in the frontend directory and add the following environment variables:

    ```env
    VITE_API_URL=http://localhost:3000/api
    ```

4. Start the frontend development server:

    ```sh
    npm run dev
    ```

### Access the Application

Open your browser and navigate to `http://localhost:5173` to access the ProMailer application.

## Contributing

We welcome contributions to ProMailer! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.
