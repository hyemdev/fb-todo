import { useState } from "react";
import SignUpDiv from "../style/UserCss";
import { useNavigate } from "react-router";
// firebase 연동
import firebase from "../firebase";

const SignUp = () => {
    const navigate = useNavigate();
    const [nickName, setNickName] = useState("");
    const [email, setEmail] = useState("");
    const [pw, setPW] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");
    const handleSignUp = async e => {
        e.preventDefault();
        //firebase에 회원가입하기
        try {
            let createUser = await firebase
                .auth()
                .createUserWithEmailAndPassword(email, pw);

            await createUser.user.updateProfile({
                name: nickName,
            });
            console.log("등록된 정보", createUser.user);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className="p-6 mt-5 shadow-sm rounded-lg bg-slate-50">
            <h2>SIGNUP</h2>
            {/* 1. emotion을 이용하여 tag의 용도를 구분한다
          2. css도 함께 적용한다. */}
            <SignUpDiv>
                <form>
                    <label htmlFor="">닉네임</label>
                    <input
                        type="text"
                        required
                        value={nickName}
                        onChange={e => setNickName(e.target.value)}
                        minLength={2}
                        maxLength={10}
                    />
                    <label htmlFor="">이메일</label>
                    <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <label htmlFor="">비밀번호</label>
                    <input
                        type="password"
                        required
                        value={pw}
                        onChange={e => setPW(e.target.value)}
                        minLength={8}
                        maxLength={16}
                    />
                    <label htmlFor="">비밀번호확인</label>
                    <input
                        type="password"
                        required
                        value={pwConfirm}
                        onChange={e => setPwConfirm(e.target.value)}
                        minLength={8}
                        maxLength={16}
                    />
                    <div className="btn-list">
                        <button
                            className="border rounded-md px-3 py-2 shadow"
                            onClick={e => handleSignUp(e)}
                        >
                            회원가입
                        </button>

                        <button
                            className="border rounded-md px-7 py-2 shadow"
                            onClick={e => {
                                e.preventDefault();
                                navigate("/");
                            }}
                        >
                            취소
                        </button>
                    </div>
                </form>
            </SignUpDiv>
        </div>
    );
};
export default SignUp;
