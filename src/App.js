import "./App.css";
import { React, useEffect, useState } from "react";

import { Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Todo from "./pages/Todo";
import NotFound from "./pages/NotFound";
import MyPage from "./pages/MyPage";
import Schedule from "./pages/Schedule";
import TodoChart from "./pages/TodoChart";
import Upload from "./pages/Upload";

import { useAuthContext } from "./hooks/useFirebase";
import { Modal } from "antd";

function App() {
    // 추후에 Redux/Recoil state로 관리 필요
    const [fbUid, setFBUid] = useState();
    const [fbName, setFBName] = useState();
    const [fbEmail, setFBEmail] = useState();
    const { isAuthReady, user, errMessage, dispatch } = useAuthContext();

    //에러메시지 모달 관련
    const error = msg => {
        Modal.error({
            title: "firebase warning",
            content: msg,
            onOk: handleOk,
        });
    };
    
    // useEffect(() => {
    //     if (errMessage !== "") {
    //         error(errMessage);
    //     }
    // }, [errMessage]);
    
    const handleOk = () => {
        dispatch({ type: "isError", payload: "" });
    };
    
    return (
        <>
            {isAuthReady ? (
                <div className="w-screen h-screen overflow-x-hidden bg-yellow-100">
                    <Header />
                    <div className="container mx-auto h-full">
                        <Routes>
                            {/* navigate를 이용한 강제이동 */}
                            <Route path="/" element={<Navigate to="/home" />} />

                            <Route path="/home" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route
                                path="/login"
                                element={
                                    // 사용자 정보가 있으면 home으로, 없으면 login으로
                                    user ? <Navigate to="/home" /> : <Login />
                                }
                            />
                            <Route path="/signup" element={<SignUp />} />
                            <Route
                                path="/todo"
                                element={
                                    user ? (
                                        <Todo
                                            fbName={fbName}
                                            fbUid={fbUid}
                                            fbEmail={fbEmail}
                                        />
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />
                            <Route path="/schedule" element={<Schedule />} />
                            <Route path="/upload" element={<Upload />} />
                            <Route path="/todochart" element={<TodoChart />} />
                            <Route path="/*" element={<NotFound />} />
                            <Route
                                path="/mypage"
                                element={
                                    user ? (
                                        <MyPage
                                        // fbName={fbName}
                                        // fbUid={fbUid}
                                        // fbEmail={fbEmail}
                                        // setFBName={setFBName}
                                        // setFBEmail={setFBEmail}
                                        // setFBUid={setFBUid}
                                        />
                                    ) : (
                                        <Navigate to="/login" />
                                    )
                                }
                            />
                        </Routes>
                    </div>
                </div>
            ) : (
                " Loading ... "
            )}
        </>
    );
}
export default App;
