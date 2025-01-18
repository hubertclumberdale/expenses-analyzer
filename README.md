# Project Setup Guide

## Prerequisites
Ensure you have Docker installed on your system. You can download and install Docker from the [Docker website](https://www.docker.com/products/docker-desktop).

## Configuration
1. **Create Environment Variables**  
   In the root directory of the project, create a `.env.local` file with the following content:

   ```env
   NEXT_PUBLIC_OPENAI_API_KEY=""
   MONGODB_URI=mongodb://host.docker.internal:27017
   ```
   Replace the placeholder values with your actual API key and MongoDB URI.

1. **Running the application**
   To start the application, open a terminal and run the following command:
   ```bash
   npm run start
   ```

## Seeding
To seed the data into the database, open a terminal and run the following command:
```bash
npm run seed
```
