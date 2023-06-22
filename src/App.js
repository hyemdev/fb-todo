import "./App.css";

import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";
import { useState } from "react";
import MyPage from "./pages/MyPage";
import Schedule from "./pages/Schedule";
import Upload from "./pages/Upload";

function App() {
    // 추후에 Redux/Recoil state로 관리 필요
    const [fbUid, setFBUid] = useState();
    const [fbName, setFBName] = useState();
    const [fbEmail, setFBEmail] = useState();
    return (
        <div className="w-screen h-screen overflow-x-hidden bg-yellow-100">
            <Header
                fbName={fbName}
                fbUid={fbUid}
                fbEmail={fbEmail}
                setFBName={setFBName}
                setFBEmail={setFBEmail}
                setFBUid={setFBUid}
            />
            <div className="container mx-auto h-full">
                <Routes>
                    {/* navigate를 이용한 강제이동 */}
                    <Route path="/" element={<Navigate to="/home" />} />

                    <Route path="/home" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route
                        path="/login"
                        element={
                            <Login
                                setFBUid={setFBUid}
                                setFBName={setFBName}
                                setFBEmail={setFBEmail}
                            />
                        }
                    />
                    <Route path="/signup" element={<SignUp />} />
                    <Route
                        path="/todo"
                        element={
                            <Todo
                                fbName={fbName}
                                fbUid={fbUid}
                                fbEmail={fbEmail}
                            />
                        }
                    />
                    <Route path="/schedule" element={<Schedule />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/*" element={<NotFound />} />
                    <Route
                        path="/mypage"
                        element={
                            <MyPage
                                fbName={fbName}
                                fbUid={fbUid}
                                fbEmail={fbEmail}
                                setFBName={setFBName}
                                setFBEmail={setFBEmail}
                                setFBUid={setFBUid}
                            />
                        }
                    />
                </Routes>
            </div>
        </div>
    );
}

export default App;
