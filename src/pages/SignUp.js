import { useState } from "react";
import { useNavigate } from "react-router";
// firebase 연동
import firebase from "../firebase";
import { Button, Form, Input, Modal } from "antd";

const SignUp = () => {
    const navigate = useNavigate();
    const [nickName] = useState(" ");

    // ant design
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 16,
        },
    };

    /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
        required: "${label} is required!",
        types: {
            email: "${label} is not a valid email!",
            number: "${label} is not a valid number!",
        },
        number: {
            range: "${label} must be between ${min} and ${max}",
        },
    };

    const onFinish = async values => {
        console.log(values);

        //firebase에 회원가입하기
        try {
            let createUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(
                    values.email,
                    values.pw,
                );

            // 회원가입 성공 시, 사용자 이름을 업데이트 하기
            await createUser.user.updateProfile({
                displayName: nickName,
            });
            // 로그인 창으로 이동
            navigate("/login");
            console.log("등록된 정보", createUser.user);
        } catch (error) {
            // 회원가입시 에러처리
            console.log(error.code);
            if (error.code == "auth/email-already-in-use") {
                setModalMessage("The email address is already in use");
            } else if (error.code == "auth/invalid-email") {
                setModalMessage("The email address is not valid.");
            } else if (error.code == "auth/operation-not-allowed") {
                setModalMessage("Operation not allowed.");
            } else if (error.code == "auth/weak-password") {
                setModalMessage("The password is too weak.");
            }
            showModal();
        }
    };

    // AntDesign 모달
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");

    const showModal = () => setIsModalOpen(true);
    const handleOk = () => setIsModalOpen(false);
    const handleCancel = () => setIsModalOpen(false);

    return (
        <div className="p-6 mt-5 shadow-sm rounded-lg bg-slate-50">
            <h2>SIGNUP</h2>

            {/* Ant Design 모달 */}
            <Modal
                title="Basic Modal"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>{modalMessage}</p>
            </Modal>
            {/* ant design 적용 */}
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                    maxWidth: 600,
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                    name="nickName"
                    label="닉네임"
                    rules={[
                        {
                            required: true,
                            message: "Please input your nickname!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="이메일"
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: "Please input your Email!",
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="pw"
                    label="비밀번호"
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
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="pwConfirm"
                    label="비밀번호 확인"
                    rules={[
                        {
                            required: true,
                            message: "Please check your password!",
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
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        ...layout.wrapperCol,
                        offset: 8,
                    }}
                >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ backgroundColor: "#1677ff" }}
                    >
                        회원가입
                    </Button>
                    <Button
                        htmlType="button"
                        style={{
                            margin: "0 10px",
                            backgroundColor: "#FFF",
                        }}
                        onClick={e => {
                            e.preventDefault();
                            navigate("/login");
                        }}
                    >
                        취소
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default SignUp;
