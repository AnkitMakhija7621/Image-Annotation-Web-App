# Image Annotation App

## Overview
This app allows users to upload and annotate images for various uses like training machine learning models or organizing databases. It's implemented using MERN stack designed to be intuitive and user-friendly for both technical and non-technical users.

## Features

- **Image Upload:** Supports uploading multiple images in various formats.
- **Image Annotation:** Users can annotate images using a dropdown menu of predefined classes (e.g., 'Dog', 'Car', 'Tree').
- **Data Management:** Efficient storage and management of images and annotations with considerations for scalability.
- **User Interface:** Features drag-and-drop uploads, batch annotation, and displays the status of each image.

## Additional Features

- **Advanced Image Processing:** Image resizing and simple filters(grayscale) using sharp library.
- **Search Functionality:** Search images by annotations.

## Setup Instructions

```bash
# Start the Server
cd server
npm install
npm start

# Start the Client
cd client
npm install
npm start
