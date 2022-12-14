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

export function fetchURL(
  url: string,
  config: AxiosRequestConfig = {},
  ...args: Array<string | number>
) {
  const queryParams = args.join('&');

  return axios.get(
    queryParams ? `${url}?${queryParams}` : url,
    generateAxiosConfig(config),
  );
}

export function putURL(url: string, data: any, headers={}) {
  return axios.put(url, data, generateAxiosConfig({ headers }));
}

export function patientSignIn(data: any): any {
  const url = '/patient/signin';
  return postURL(url, data).catch((err: AxiosError) => err.response);
}

export function patientSignUp(data: any): any {
  const url = '/patient/signup';
  return postURL(url, data).catch((err: AxiosError) => err.response);
}

export function createAppointment(data: any): any {
  const url = '/patient/create-appointment';
  return postURL(url, data).catch((err: AxiosError) => err.response);
}

export function updateAppointment(data: any): any {
  const url = '/patient/update-appointment';
  return postURL(url, data).catch((err: AxiosError) => err.response);
}

export function confirmAppointment(data: any): any {
  const url = '/doctor/confirm-appointment';
  return postURL(url, data).catch((err: AxiosError) => err.response);
}

export function doctorSignIn(data: any): any {
  const url = '/doctor/signin';
  return postURL(url, data).catch((err: AxiosError) => err.response);
}

export function doctorSignUp(data: any): any {
  const url = '/doctor/signup';
  return postURL(url, data).catch((err: AxiosError) => err.response);
}

export const getPatientProfile: any = (email: string) => {
  const url =
    `/patient/profile?PatientID=${email}`;
  return fetchURL(url);
};

export const getDoctorProfile: any = (email: string) => {
  const url =
    `/doctor/profile?DoctorID=${email}`;
  return fetchURL(url);
};

export const getDoctorAppointments: any = (email: string) => {
  const url =
      `/doctor/appointment?id=${email}`;
  return fetchURL(url);
};

export const getPatientAppointments: any = (email: string) => {
  const url =
      `/patient/appointment?PatientID=${email}`;
  return fetchURL(url);
};

export const getDoctors: any = () => {
  const url =
      `/doctor`;
  return fetchURL(url);
};

export const getAppointment: any = (id: string) => {
  const url =
      `/appointment?ID=${id}`;
  return fetchURL(url);
};

export const putFile: any = (file: File, data: any, email: string, appointmentNumber: string): any => {
  const url =
    `/files/${appointmentNumber}-${file.name}`;
  return putURL(url, data, { "Content-Type": "text/plain", "x-amz-meta-userEmail": email, "x-amz-meta-appointmentNumber": appointmentNumber});
}
