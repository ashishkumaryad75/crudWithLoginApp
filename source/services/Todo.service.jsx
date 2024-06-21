import axios from "axios";

class TodoService {
  getData() {
    return axios.get("https://jsonplaceholder.typicode.com/todos/");
  }
  addData(data) {
    return axios.post("https://jsonplaceholder.typicode.com/todos/", data);
  }
  update(data) {
    return axios.patch("https://jsonplaceholder.typicode.com/todos/", data);
  }
}
export default new TodoService();
