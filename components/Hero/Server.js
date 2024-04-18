import axios from "axios";

const API_URL = "http://localhost:8000/";

class AuthService {
  async login(data) {
    console.log(data);
    return axios.post(API_URL + "login", data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
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
    data = JSON.stringify(data);
    console.log("sent", data);
    return axios.post(API_URL + "signup/studen/", data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  }
  signupCompany(data) {
   //  data = JSON.stringify(data);
    console.log("sent", data);
    //  console.log(data);
    return axios.post(API_URL + "signup/compan/", data, {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    });
  }
}

export default new AuthService();
