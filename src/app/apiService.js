import axios from "axios";

const httpClient = axios.create({
  baseURL: "http://localhost:8080",
});

class ApiService {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  get(url) {
    return httpClient.get(url);
  }

  post(url, object) {
    return httpClient.post(url, object);
  }
  post(url, object) {
    return httpClient.put(url, object);
  }
  delete(url) {
    return httpClient.delete(url);
  }

}

export default ApiService;
