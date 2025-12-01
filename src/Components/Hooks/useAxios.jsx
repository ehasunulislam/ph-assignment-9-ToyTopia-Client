import axios from 'axios'
import React from 'react'

const axiosSecure = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_SERVER
})

const useAxios = () => {
  return axiosSecure
}

export default useAxios