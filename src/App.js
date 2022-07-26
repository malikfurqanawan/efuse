import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import Posts from "./views/Posts";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setUser } from './redux/actions';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setUser(null))
  }, [dispatch])
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
