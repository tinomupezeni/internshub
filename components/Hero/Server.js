import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const API_URL = "http://localhost:8000/";

class AuthService {
  get token() {
    return secureLocalStorage.getItem("loggedInData")?.token;
  }
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
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.post(
      API_URL + "user/logout/",
      {},
      {
        headers,
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

  addCompanyDept(data) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.post(API_URL + "company/add-department/", data, {
      headers,
      withCredentials: true,
    });
  }
  getCompanyDept() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.get(API_URL + "company/get-department/", {
      headers,
      withCredentials: true,
    });
  }
  getCompInterns() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.get(API_URL + "company/department/interns/", {
      headers,
      withCredentials: true,
    });
  }
  getAllDept() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.get(API_URL + "company/get-all-departments/", {
      headers,
      withCredentials: true,
    });
  }
  getAllInstitutes() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.get(API_URL + "student/get-institutions/", {
      headers,
      withCredentials: true,
    });
  }

  deleteCompanyDept(dept_id) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.delete(`${API_URL}company/delete-department/${dept_id}/`, {
      headers,
      withCredentials: true,
    });
  }
  getInternPotfolio(studentId) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.get(`${API_URL}company/intern-potfolio/${studentId}/`, {
      headers,
      withCredentials: true,
    });
  }
  updateCompanyReq(data) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.post(`${API_URL}company/update-requirements/`, data, {
      headers,
      withCredentials: true,
    });
  }
  deleteRequirement(req_id) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.delete(`${API_URL}company/delete-requirement/${req_id}/`, {
      headers,
      withCredentials: true,
    });
  }
  studentSettings(data) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.post(`${API_URL}student/profile/settings/`, data, {
      headers,
      withCredentials: true,
    });
  }
  getstudentSettings() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.get(`${API_URL}student/profile/get-settings/`, {
      headers,
      withCredentials: true,
    });
  }
  getstudentVideos() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.get(`${API_URL}student/get-projects/`, {
      headers,
      withCredentials: true,
    });
  }
  upLoadProject(data) {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.post(`${API_URL}student/upload-project/`, data, {
      headers,
      withCredentials: true,
    });
  }
  getstudentComps() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.get(`${API_URL}student/get-companies/`, {
      headers,
      withCredentials: true,
    });
  }
  // Ai---------------
  getstudentAiProjects() {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Token ${this.token}`,
    };
    return axios.get(`${API_URL}student/get-ai-projects/`, {
      headers,
      withCredentials: true,
    });
  }
}

export default new AuthService();
