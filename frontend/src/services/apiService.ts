/**
 * The data structure for the timetable generation request.
 * This should match what the backend expects.
 */
export interface TimetableRequest {
  department: string;
  semester: string;
  priority: string;
}

// The backend server's base URL
const API_URL = 'http://localhost:5001/api';

/**
 * Sends the timetable generation request to the backend.
 * @param data The user's input from the form.
 * @returns The generated timetable data from the backend.
 */
export const generateTimetable = async (data: TimetableRequest) => {
  try {
    const response = await fetch(`${API_URL}/generate-timetable`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // If the server responds with an error, we throw it to be caught by the component
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    // Parse the JSON response from the server
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    // Re-throw the error so the calling component can handle it
    throw error;
  }
};
