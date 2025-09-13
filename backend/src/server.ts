import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = 5001; // The port your frontend will call

// --- Middleware ---
// Enable CORS so your frontend (running on a different port) can make requests
app.use(cors());
// Enable the server to understand incoming JSON data
app.use(express.json());

// --- API Routes ---
// A simple "health check" route to confirm the server is running
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'API is running! 🚀' });
});

// The main endpoint for generating the timetable
app.post('/api/generate-timetable', (req: Request, res: Response) => {
  // 1. Log the data we receive from the frontend
  console.log('Received request from frontend with this data:');
  console.log(req.body);

  // 2. For now, return a hardcoded "mock" timetable
  const mockTimetable = {
    monday: [
      { time: '9:00 AM', subject: 'Math', teacher: 'Mr. Smith' },
      { time: '10:00 AM', subject: 'Science', teacher: 'Ms. Jones' },
    ],
    tuesday: [
      { time: '9:00 AM', subject: 'History', teacher: 'Mr. Doe' },
    ],
    // ...etc for other days
  };

  // 3. Send the mock data back to the frontend
  res.status(200).json(mockTimetable);
});


// --- Start the server ---
app.listen(PORT, () => {
  console.log(`Backend server is listening on http://localhost:${PORT}`);
});