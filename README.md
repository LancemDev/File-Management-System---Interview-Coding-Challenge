# File Mosaic Project

## Overview

File Mosaic is a web-based file management application that allows users to organize, upload, download, and manage files and directories. The application features a user-friendly interface with a grid and list view, breadcrumb navigation, and a responsive design. Built with React, TypeScript, and Tailwind CSS for the frontend, and Laravel for the backend, it provides a seamless experience for managing files in a structured manner.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Frontend Structure](#frontend-structure)
- [Backend Structure](#backend-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- **File and Directory Management**: Create, delete, and rename files and directories.
- **File Upload**: Upload files to specific directories.
- **File Download**: Download files directly from the interface.
- **Responsive Design**: Works seamlessly on both desktop and mobile devices.
- **Breadcrumb Navigation**: Easily navigate through directories.
- **View Modes**: Switch between grid and list views for file display.
- **Loading Indicators**: Visual feedback during file operations.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **TypeScript**: For type safety and better development experience.
- **Vite**: For fast development and build tooling.
- **Tailwind CSS**: For styling and responsive design.
- **Framer Motion**: For animations.
- **Lucide React**: For icons.

### Backend
- **Laravel**: PHP framework for building the server-side application.
- **MySQL**: Database for storing file and directory information.
- **Multer**: Middleware for handling file uploads (if applicable).
- **Axios**: For making HTTP requests from the frontend.

## Installation

### Frontend

1. **Clone the repository**:
   ```bash
   git clone github.com/LancemDev/File-Management-System---Interview-Coding-Challenge.git
   ```

2. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```

3. **Install the necessary dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

### Backend

1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```

2. **Install Composer dependencies**:
   Make sure you have Composer installed, then run:
   ```bash
   composer install
   ```

3. **Set up your environment**:
   Copy the `.env.example` file to `.env` and configure your database settings:
   ```bash
   cp .env.example .env
   ```

4. **Generate the application key**:
   ```bash
   php artisan key:generate
   ```

5. **Run migrations**:
   ```bash
   php artisan migrate
   ```

6. **Start the backend server**:
   ```bash
   php artisan serve
   ```

7. **Ensure MySQL is running**: Make sure your MySQL server is running locally or update the connection string in your `.env` file.

## Usage

- **Navigating Directories**: Click on a directory to navigate into it. Use the breadcrumb navigation to go back to previous directories.
- **Creating a New Directory**: Click the "New Folder" button to create a new directory in the current location.
- **Uploading Files**: Click the "Upload" button to upload files to the current directory.
- **Downloading Files**: Click the "Download" button next to a file to download it.
- **Renaming and Deleting**: Select a file or directory to view its details, where you can rename or delete it.

## API Endpoints

### File Management

- **GET /api/files**: Retrieve a list of all files.
- **GET /api/files/:id**: Retrieve details of a specific file.
- **POST /api/files**: Upload a new file.
- **PUT /api/files/:id**: Update a file's details (e.g., rename).
- **DELETE /api/files/:id**: Delete a specific file.
- **GET /api/files/:id/download**: Download a specific file.

### Directory Management

- **GET /api/directories**: Retrieve a list of all directories.
- **GET /api/directories/:id**: Retrieve details of a specific directory.
- **POST /api/directories**: Create a new directory.
- **PUT /api/directories/:id**: Update a directory's details (e.g., rename).
- **DELETE /api/directories/:id**: Delete a specific directory.
- **GET /api/directories/:id/files**: Retrieve files within a specific directory.

## Frontend Structure

- **src/pages/Index.tsx**: Main page that displays files and directories.
- **src/components/FileExplorer/Breadcrumb.tsx**: Breadcrumb navigation component.
- **src/components/FileExplorer/FileGrid.tsx**: Displays files and directories in a grid layout.
- **src/components/FileExplorer/FileDetails.tsx**: Displays details of a selected file or directory.
- **src/components/FileExplorer/UploadDialog.tsx**: Dialog for uploading files.
- **src/services/api.ts**: API service for making requests to the backend.

## Backend Structure

- **app/Http/Controllers**: Contains controllers for handling requests related to files and directories.
- **app/Models**: Defines the data models for files and directories.
- **app/Http/Requests**: Contains request validation logic.
- **routes/api.php**: Defines API routes for file and directory management.
- **database/migrations**: Contains migration files for setting up the database schema.
- **.env**: Environment configuration file for database and application settings.

## Contributing

Contributions are welcome! If you would like to contribute to the project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Create a pull request describing your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


