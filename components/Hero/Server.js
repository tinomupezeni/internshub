import axios from "axios";

const API_URL = "http://localhost:8000/";

class AuthService {
  loginstudent(data) {
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(API_URL + "login/student/", data, {
      headers,
      // withCredentials: true,
    });
  }
  
  logincompany(data) {
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(API_URL + "login/company/", data, {
      headers,
      // withCredentials: true,
    });
  }

  logout() {
    return axios.post(
      API_URL + "logout",
      {},
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
  }

  signupStudent(data) {
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(API_URL + "signup/student/", data, {
      headers,
      // withCredentials: true,
    });
  }
  signupCompany(data) {
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(API_URL + "signup/company/", data, {
      headers,
      // withCredentials: true,
    });
  }
}

export default new AuthService();
