import axios from "axios";

export class ApiService {
  baseUrl: string;
  constructor() {
    this.baseUrl =
      "http://ec2-3-122-254-0.eu-central-1.compute.amazonaws.com:5000/api";
  }

  async get(route: string) {
    const response = await axios.get(this.baseUrl + route);
    return response.data;
  }

  async post(route: string, data: any) {
    const response = await axios.post(this.baseUrl + route, data);
    return response.data;
  }

  async put(route: string, data: any) {
    const response = await axios.put(this.baseUrl + route, data);
    return response.data;
  }

  async delete(route: string) {
    const response = await axios.post(this.baseUrl + route);
    return response.data;
  }
}

export default new ApiService();
