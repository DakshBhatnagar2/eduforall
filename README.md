# MERN Stack Blog Website

A modern blog website built with the MERN stack (MongoDB, Express.js, React, Node.js) using Next.js and Tailwind CSS.

## Features

- Create and view blog posts
- Modern and responsive UI
- MongoDB integration
- Optimized for Vercel deployment

## Prerequisites

- Node.js 18.x or later
- MongoDB Atlas account (for the database)
- Vercel account (for deployment)

## Getting Started

1. Clone the repository:
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your MongoDB connection string:
```
MONGODB_URI=your_mongodb_connection_string_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment to Vercel

1. Push your code to a GitHub repository.

2. Go to [Vercel](https://vercel.com) and create a new project.

3. Import your GitHub repository.

4. Add the following environment variable in your Vercel project settings:
   - `MONGODB_URI`: Your MongoDB connection string

5. Deploy your project!

## Technologies Used

- Next.js 14
- TypeScript
- Tailwind CSS
- MongoDB
- Mongoose
- Heroicons

## License

MIT
