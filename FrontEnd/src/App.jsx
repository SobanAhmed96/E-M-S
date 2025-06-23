import React from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router/router'
import axios from 'axios';
const App = () => {
  axios.defaults.withCredentials = true;
  axios.defaults.baseURL = "https://e-m-s-back-end.vercel.app/";
  <RouterProvider router={router}/>
}

export default App