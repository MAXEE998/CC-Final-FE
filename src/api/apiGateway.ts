import axios, { AxiosError, AxiosRequestConfig } from 'axios';


const invokeUrl = 'https://ana84j390f.execute-api.us-east-1.amazonaws.com/test';

const generateAxiosConfig = (config: AxiosRequestConfig = {}) => ({
  baseURL: invokeUrl,
  withCredentials: false,
  ...config,
  headers: {
    ...(config.headers || {}),
    "access-control-allow-origin": "*",
  },
});

export function postURL(url: string, data: any, headers = {}) {
  return axios.post(url, data, generateAxiosConfig({ headers }));
}

export function patientSignIn(data: any): any {
  const url = '/patient/signin';
  return postURL(url, data).catch((err: AxiosError) => err.response);
}

export function doctorSignIn(data: any): any {
  const url = '/doctor/signin';
  return postURL(url, data).catch((err: AxiosError) => err.response);
}
