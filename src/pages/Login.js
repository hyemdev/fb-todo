import React from "react";

// import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import firebase from "../firebase";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
    const { login } = useLogin();

    // 주소이동 시, Link, NavLink 말고 useNavigate를 이용해보자
    const navigate = useNavigate();

    const onFinish = values => {
        login(values.email, values.password);

        // try {
        //     // email과 pw로 인증 로그인
        //     await firebase
        //         .auth()
        //         .signInWithEmailAndPassword(values.email, values.password);

        //     //로그인 된 사용자 정보를 가지고 오자
        //     const user = firebase.auth().currentUser;
        //     console.log("로그인성공");
        //     console.log(user);
        //     setFBName(user.displayName);
        //     setFBEmail(user.email);
        //     setFBUid(user.uid);

        //     navigate("/todo");
        // } catch (error) {
        //     console.log("로그인실패", error.code);
        //     // 에러에 대한 경고창을 띄운다

        //     if (error.code === "auth/invalid-email") {
        //         setModalMessage("올바른 이메일 형식이 아닙니다.");
        //     } else if (error.code === "auth/wrong-password") {
        //         setModalMessage("올바르지 않은 비밀번호입니다.");
        //     } else if (error.code === "auth/user-not-found") {
        //         setModalMessage("가입되지 않은 사용자 입니다.");
        //     } else if (error.code === "auth/missing-email") {
        //         setModalMessage("이메일이 입력되지 않았습니다.");
        //     } else {
        //         setModalMessage("로그인이 실패하였습니다.");
        //     }
        //     showModal();
        // }
    };
    const onFinishFailed = errorInfo => {
        console.log("Failed:", errorInfo);
    };

    // AntDesign 모달
    // const [isModalOpen, setIsModalOpen] = useState(false);
    // const [modalMessage, setModalMessage] = useState("");

    // const showModal = () => setIsModalOpen(true);
    // const handleOk = () => setIsModalOpen(false);
    // const handleCancel = () => setIsModalOpen(false);

    return (
        <div className="p-6 mt-5 shadow-sm rounded-lg bg-slate-50">
            <h2>LOGIN</h2>

            {/* Ant Design 모달 */}
            {/* <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>{modalMessage}</p>
            </Modal> */}
            {/* Ant Design */}
            <Form
                name="basic"
                labelCol={{
                    span: 3,
                }}
                wrapperCol={{
                    span: 16,
                }}
                style={{
                    maxWidth: 1280,
                    margin: "0 auto",
                }}
                initialValues={{
                    remember: false,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: "email",
                            // 입력필수사항
                            required: true,
                            message: "Please input your Email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                            validator: async (_, password) => {
                                if (!password || password.length < 6) {
                                    return Promise.reject(
                                        new Error("6자이상 입력 해주세요"),
                                    );
                                }
                            },
                        },
                    ]}
                >
                    <Input.Password maxLength={16} minLength={6} />
                </Form.Item>

                <Form.Item
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                >
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 16,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ backgroundColor: "#1677ff" }}
                    >
                        로그인
                    </Button>
                    <Button
                        htmlType="button"
                        style={{
                            margin: "0 10px",
                            backgroundColor: "#FFF",
                        }}
                        onClick={e => {
                            e.preventDefault();
                            navigate("/signup");
                        }}
                    >
                        회원가입
                    </Button>
                </Form.Item>
            </Form>
            {/* 1. emotion을 이용하여 tag의 용도를 구분한다
        2. css도 함께 적용한다. */}
        </div>
    );
};
export default Login;
