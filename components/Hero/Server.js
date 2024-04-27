import axios from "axios";

const API_URL = "http://localhost:8000/";

class AuthService {
  loginstudent(data) {
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(API_URL + "login/student/", data, {
      headers,
      withCredentials: true,
    });
  }

  logincompany(data) {
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(API_URL + "login/company/", data, {
      headers,
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
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(API_URL + "signup/student/", data, {
      headers,
      withCredentials: true,
    });
  }
  signupCompany(data) {
    const headers = {
      "Content-Type": "application/json",
    };
    return axios.post(API_URL + "signup/company/", data, {
      headers,
      withCredentials: true,
    });
  }

  addCompanyDept(data, token) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    return axios.post(API_URL + "company/add-department/", data, {
      headers,
      withCredentials: true,
    });
  }
  getCompanyDept(token) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    return axios.get(API_URL + "company/get-department/", {
      headers,
      withCredentials: true,
    });
  }
  getAllDept(token) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    return axios.get(API_URL + "company/get-all-departments/", {
      headers,
      withCredentials: true,
    });
  }
  getAllInstitutes(token) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    return axios.get(API_URL + "student/get-institutions/", {
      headers,
      withCredentials: true,
    });
  }

  deleteCompanyDept(dept_id, token) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    return axios.delete(`${API_URL}company/delete-department/${dept_id}/`, {
      headers,
      withCredentials: true,
    });
  }
  updateCompanyReq(data, token) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    return axios.post(`${API_URL}company/update-requirements/`, data, {
      headers,
      withCredentials: true,
    });
  }
  deleteRequirement(req_id, token) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    return axios.delete(`${API_URL}company/delete-requirement/${req_id}/`, {
      headers,
      withCredentials: true,
    });
  }
  studentSettings(data, token) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    return axios.post(`${API_URL}student/profile/settings/`, data, {
      headers,
      withCredentials: true,
    });
  }
  getstudentSettings(token) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    };
    return axios.get(`${API_URL}student/profile/get-settings/`, {
      headers,
      withCredentials: true,
    });
  }
}

export default new AuthService();
