import axios, { AxiosInstance } from "axios";

export class ApiService {
  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL:
        "http://ec2-3-122-254-0.eu-central-1.compute.amazonaws.com:5000/api",
    });
  }

  setToken(token: string) {
    this.axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
  }

  async get(route: string) {
    const response = await this.axiosInstance.get(route);
    return response.data;
  }

  async post(route: string, data: any) {
    const response = await this.axiosInstance.post(route, data);
    return response.data;
  }

  async put(route: string, data: any) {
    const response = await this.axiosInstance.put(route, data);
    return response.data;
  }

  async delete(route: string) {
    const response = await this.axiosInstance.delete(route);
    return response.data;
  }
}

export default new ApiService();
