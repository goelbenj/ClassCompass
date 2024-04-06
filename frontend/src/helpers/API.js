import axios from "axios";
// import * as SecureStore from "expo-secure-store";

export class Api {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.url = process.env.REACT_APP_BASE_API_URL;
  }

  async makeRequest(endpoint, data, method, params) {
    const result = {
      result: null,
      data: null,
    };

    const response = await axios({
      method: method,
      url: `${this.url}/${endpoint}`,
      data: data,
      params: params,
    }).catch((err) => ({ err }));

    if (!response || response.err) {
      // error
      result.result = "ERROR";
      result.data = response.err;
    } else {
      // successful
      result.result = "SUCCESSFUL";
      result.data = response.data;
    }

    return result;
  }
  s;

  async getAllCourses() {
    return this.makeRequest(`course-card-service/get-all`, null, "GET");
  }

  async getCourseCard(course_code) {
    return this.makeRequest(`course-card-service/${course_code}`, null, "GET");
  }

  async getUserProfile(uid) {
    return this.makeRequest(`user-service/${uid}`, null, "GET");
  }

  async createUserProfile(data) {
    return this.makeRequest(`user-service/create-profile`, data, "POST");
  }

  async editUserProfile(data) {
    return this.makeRequest(`user-service/edit-profile`, data, "PUT");
  }

  async addCourseToProfile(data) {
    return this.makeRequest(`user-service/add-course`, data, "PUT");
  }

  async filterCourses(data) {
    return this.makeRequest(`course-card-service/filter`, data, "POST");
  }
}

const api = new Api("apiKey");

export default api;
