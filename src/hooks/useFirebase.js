import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import {
    signInWithEmailAndPassword,
    signOut,
    createUserWithEmailAndPassword,
    updateProfile,
    updateEmail,
    updatePassword,
    deleteUser,
} from "firebase/auth";
import { appAuth } from "../firebase/config";
// import { useAuthContext } from "./useAuthContext";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Space } from "antd";

// auth context hook
export const useAuthContext = () => {
    const context = useContext(AuthContext);
    return context;
};

// 사용자 로그인 hook
export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const login = async (email, password) => {
        setError(null);
        setIsPending(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                appAuth,
                email,
                password,
            );
            const user = userCredential.user;
            dispatch({ type: "login", payload: user });
            navigate("/about");
        } catch (err) {
            console.log("err", err.message);
            let errMessage = "";
            if (err.code === "auth/invalid-email") {
                errMessage = "올바른 이메일 형식이 아닙니다.";
            } else if (err.code === "auth/wrong-password") {
                errMessage = "올바르지 않은 비밀번호입니다.";
            } else if (err.code === "auth/user-not-found") {
                errMessage = "가입되지 않은 사용자 입니다.";
            } else if (err.code === "auth/missing-email") {
                errMessage = "이메일이 입력되지 않았습니다.";
            } else {
                errMessage = "로그인이 실패하였습니다.";
            }
            dispatch({ type: "isError", payload: errMessage });
        }
    };
    return { error, isPending, login };
};

// 로그아웃 hook
export const useLogout = () => {
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const navigate = useNavigate();

    // {user, dispatch} 중에  dispatch만 받음
    const { dispatch } = useAuthContext();

    const logout = async () => {
        setError(null);
        setIsPending(true);

        //fb 로그아웃 api
        try {
            await signOut(appAuth);

            // Sign-out successful.
            dispatch({ type: "logout" });
            navigate("/login");
        } catch (err) {
            // An error happened.
            console.log(err);
        }
    };
    return { error, isPending, logout };
};

// 회원가입 Hook
export const useSignup = () => {
    // authContext 데이터 전달
    const { dispatch } = useAuthContext();

    // 사용자 상태에 따라 웹브라우저 라우터 이동
    const navigate = useNavigate();

    // 서버의 에러 상태를 보관
    const [error, setError] = useState(null);

    // 서버의 연결 시도 및 연결, 연결 후 상태를 보관
    const [isPending, setIsPending] = useState(false);

    // 실제 연결을 실행할 함수
    // signUp(이메일, 비밀번호, 닉네임)
    const signUp = async (email, pw, displayName) => {
        // 실행시 초기에 에러는 없다.
        setError(null);
        // 통신을 연결한다.
        setIsPending(true);

        try {
            // 사용자 등록 시작
            const userCredential = await createUserWithEmailAndPassword(
                appAuth,
                email,
                pw,
            );
            const user = userCredential.user;
            if (!user) {
                // 에러 객체를 던진다.
                console.log("회원 가입에 실패하였습니다.");
                return;
            }
            // 성공시에는 사용자 닉네임을 설정한다.
            await updateProfile(appAuth.currentUser, {
                displayName: displayName,
            });
            // 프로필 업데이트 성공, authContext 업데이트
            //// dispatch({action}) action에 type, payload를 담아서 보낸다.
            dispatch({ type: "login", payload: user });

            //// 에러 없음
            setError(null);
            //// 연결 후 작업 완료
            setIsPending(false);
            //// 회원가입 성공으로 login 라우터로 이동
            navigate("/login");
        } catch (err) {
            console.log(err);
            let errMessage = "";
            if (err.code == "auth/email-already-in-use") {
                errMessage = "The email address is already in use";
            } else if (err.code == "auth/invalid-email") {
                errMessage = "The email address is not valid.";
            } else if (err.code == "auth/operation-not-allowed") {
                errMessage = "Operation not allowed.";
            } else if (err.code == "auth/weak-password") {
                errMessage = "The password is too weak.";
            }
            dispatch({ type: "isError", payload: errMessage });
        }
    };

    // 현재 error, isPending, signUp 을 리턴한다.
    return { error, isPending, signUp };
};

// email변경 hook
export const useUpdateEmail = () => {
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const updateMail = async email => {
        setError(null);
        setIsPending(true);

        try {
            await updateEmail(appAuth.currentUser, email);
            setIsPending(false);
            dispatch({ type: "updateEmail", payload: appAuth.currentUser });
        } catch (err) {
            console.log(err.message);
            setIsPending(false);
            setError(err.message);
        }
    };
    return { error, isPending, updateMail };
};

// 닉네임 변경 hook
export const useUpdateNickName = () => {
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const updateNickName = async displayName => {
        setError(null);
        setIsPending(true);
        try {
            //fb 의 닉네임 변경 api사용
            await updateProfile(appAuth.currentUser, {
                displayName: displayName,
            });

            setIsPending(false);

            //context의 state 변경
            dispatch({ type: "updateName", payload: appAuth.currentUser });
        } catch (err) {
            console.log(err.message);
            setIsPending(false);
            setError(err.message);
        }
    };
    return { error, isPending, updateNickName };
};

// 패스워드 변경 hook
export const useUpdatePass = () => {
    // const {dispatch} = useAuthContext();
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const updatePass = async newPass => {
        setError(null);
        setIsPending(true);
        try {
            await updatePassword(appAuth.currentUser, newPass);
            setIsPending(false);
            console.log("비밀번호 업데이트 완료");
            // dispatch({type: "", payload: newPass})
        } catch (err) {
            console.log(err.message);
            setIsPending(false);
            setError(err.message);
        }
    };
    return { error, isPending, updatePass };
};

//회원 탈퇴 hook
export const useUserDelete = () => {
    const navigate = useNavigate();
    const { dispatch } = useAuthContext();
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);

    const userDelete = async () => {
        setError(null);
        setIsPending(true);
        try {
            await deleteUser(appAuth.currentUser);
            setIsPending(false);
            dispatch({ type: "deleteUser" });
            navigate("/");
        } catch (err) {
            console.log(err.message);
            setIsPending(false);
            setError(err.message);
        }
    };
    return { error, isPending, userDelete };
};
