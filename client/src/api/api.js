import axios from 'axios';

 export const API = axios.create({
  baseURL: 'https://zepcart.onrender.com/api/v1',
  withCredentials: true, 
    
});

