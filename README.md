Manage My Shifts - Angular Project
Summary:

This repository contains the frontend part of the "Manage My Shifts" web application. The project's goal is to provide a user-friendly interface for employees to track their work hours, manage shifts, and generate reports. It is designed to be responsive, making it suitable for both tablets and smartphones.

Features
Registration and login pages with error handling for inputs.
Home page showing statistics about shifts and earnings.
My Shifts page with a table displaying all shifts with various parameters and search options.
Adding a Shift page to add new shifts with validation and unique shift names.
Editing a Shift page to modify existing shift details.
Profile Editing page to update user details.
Administrator mode (Developer B) with additional features to manage shifts and workers.
Tech Stack
Angular: Frontend framework for building the client-side application.
HTML, CSS, JavaScript: Building blocks for the user interface.
Node.js: Backend server for handling requests and data storage.
REST API: Communication between Angular frontend and Node.js backend.
MongoDB: Database for storing shift and user information.
Postman: Tool for testing and verifying API requests.
Getting Started
Clone the repository to your local machine:


git clone https://github.com/your-username/manage-my-shifts.git
Set up the Angular development environment:


npm install -g @angular/cli
Install the project dependencies:


cd manage-my-shifts
npm install
Launch the application:


ng serve
Open your web browser and navigate to http://localhost:4200/ to access the app.

Developer Roles
Developer A: Worked on the Regular Worker mode, handling tasks such as registration, login, shifts management, and profile editing.
Developer B: Focused on the Administrator mode, managing shifts of all workers and user profiles.
Note: Ensure Node.js and MongoDB are installed and running on your machine for complete functionality.
