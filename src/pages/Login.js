import { useState } from "react";
import { LoginDiv } from "../style/UserCss";
import { useNavigate } from "react-router";

const Login = () => {
    // 주소이동 시, Link, NavLink 말고 useNavigate를 이용해보자
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //로그인
    const handleLogin = e => {
        console.log(e.target);
        //firebase 로그인 시도
    };
    return (
        <div className="p-6 mt-5 shadow-sm rounded-lg bg-slate-50">
            <h2>LOGIN</h2>
            {/* 1. emotion을 이용하여 tag의 용도를 구분한다
        2. css도 함께 적용한다. */}
            <LoginDiv>
                <form>
                    <label htmlFor="">이메일</label>
                    {/* required : 반드시 필요하다!는 항목을 지정함 */}
                    {/* useState 사용할 것 */}
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
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        minLength={8}
                        maxLength={16}
                    />
                    <div className="btn-list">
                        <button
                            className="border rounded-md px-3 py-2 shadow"
                            onClick={e => handleLogin(e)}
                        >
                            로그인
                        </button>
                        {/* 버튼tag가 div안의 button tag와, form안의 button tag의 기능이 다름. 
                        form안의 button은 submit 기능이 포함되어있음.(클릭 시 브라우저갱신이 발생됨)
                        그러므로 e.preventDefault를 넣어주자*/}
                        <button
                            className="border rounded-md px-7 py-2 shadow"
                            onClick={e => {
                                e.preventDefault();
                                navigate("/signup");
                            }}
                        >
                            회원가입
                        </button>
                        <button
                            className="border rounded-md px-7 py-2 shadow"
                            onClick={e => {
                                e.preventDefault();
                                console.log("비밀번호 찾기")
                                navigate("/");
                            }}
                        >
                            비밀번호 찾기
                        </button>
                    </div>
                </form>
            </LoginDiv>
        </div>
    );
};
export default Login;
