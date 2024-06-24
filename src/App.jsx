import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./container/header/Header";
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/signup/Signup";
import TodoList from "./components/dashboard/TodoList";

function App() {
  return (
    <>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/todos" element={<TodoList />}></Route>
          <Route path="/" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
