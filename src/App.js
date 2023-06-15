import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <div className="w-screen h-screen overflow-x-hidden bg-yellow-100">
            <Header />
            <div className="container mx-auto h-full">
                <Routes>
                    {/* navigate를 이용한 강제이동 */}
                    <Route path="/" element={<Navigate to="/home" />} />

                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/todo" element={<Todo />} />
                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
