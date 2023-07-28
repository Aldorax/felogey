import axios from 'axios';

// Create a new instance of axios with custom configurations
const httpClient = axios.create({
  withCredentials: true, // Include cookies in the request (if needed)
});

export default httpClient;
