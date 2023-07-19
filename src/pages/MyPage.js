import { useEffect, useState } from "react";
import { MyPageDiv } from "../style/UserCss";
import { useNavigate } from "react-router-dom";
// import firebase from "../firebase";

/////////////////////
import {
    useAuthContext,
    useUpdateNickName,
    useUpdateEmail,
    useUpdatePass,
    useUserDelete,
} from "../hooks/useFirebase";

const MyPage = ({
    fbName,
    fbUid,
    fbEmail,
    setFBEmail,
    setFBName,
    setFBUid,
}) => {
    //////////
    const { user } = useAuthContext();
    const { updateNickName } = useUpdateNickName();
    const { updateMail } = useUpdateEmail();
    const { updatePass } = useUpdatePass();
    const { userDelete } = useUserDelete();

    const navigate = useNavigate();
    const [nickName, setNickName] = useState(fbName);
    const [email, setEmail] = useState(fbEmail);
    const [pw, setPW] = useState("");
    const [pwConfirm, setPwConfirm] = useState("");

    ////////////
    // authcontext에 state의 user를 출력
    useEffect(() => {
        setNickName(user.displayName);
        setEmail(user.email);
    }, []);

    //fb의 사용자 정보 객체
    // const user = firebase.auth().currentUser;

    const handlerNickName = async e => {
        e.preventDefault();
        /////////////////
        updateNickName(nickName);
        // try {
        //   await user.updateProfile({
        //     displayName: nickName,
        //   });
        //   setFBName(nickName);
        //   setNickName(nickName);
        //   alert("닉네임 정보를 변경하였습니다.");
        // } catch (error) {
        //   console.log(error.code);
        // }
    };

    ///////
    const handlerEmail = async e => {
        e.preventDefault();
        updateMail(email);

        // try {
        //   await user.updateEmail(email);
        //   setFBEmail(email);
        //   setEmail(email);
        //   alert("이메일 정보를 변경하였습니다.");
        // } catch (error) {
        //   if (error.code == "auth/email-already-in-use") {
        //     alert("The email address is already in use");
        //   } else if (error.code == "auth/invalid-email") {
        //     alert("The email address is not valid.");
        //   } else {
        //     alert("이메일을 확인해 주세요.");
        //   }
        // }
    };

    const handlerPassword = async e => {
        e.preventDefault();
        updatePass(pw);
        // try {
        //     await user.updatePassword(pw);
        //     alert("비밀번호 정보를 변경했습니다");
        // } catch (error) {
        //     if (error.code == "auth/weak-password") {
        //         alert("The password is too weak.");
        //     } else {
        //         alert("비밀번호 다시 입력 해주세요.");
        //     }
        // }
        console.log("패스워드업뎃");
    };
    const handlerDelete = async e => {
        e.preventDefault();
        userDelete();
        // try {
        //     await user.delete();
        //     console.log("회원탈퇴");
        //     alert("탈퇴가 정상적으로 처리되었습니다");
        //     // firebase.auth().signOut();
        //     setFBEmail("");
        //     setFBName("");
        //     setFBUid("");
        //     navigate("/");
        // } catch (error) {
        //     console.log(error.code);
        // }
    };

    useEffect(() => {
        // if (!fbUid) {
        //     navigate("/");
        // }
    }, []);

    return (
        <div className="p-6 mt-5 shadow-sm rounded-lg bg-slate-50">
            <h2>MY PAGE</h2>

            {/* 1. emotion을 이용하여 tag의 용도를 구분한다
          2. css도 함께 적용한다. */}
            <MyPageDiv>
                <form>
                    <div>
                        <label htmlFor="">닉네임</label>
                        <input
                            type="text"
                            required
                            value={nickName}
                            onChange={e => setNickName(e.target.value)}
                            minLength={2}
                            maxLength={10}
                        />
                        <button
                            className="border rounded-md px-7 py-4 shadow"
                            onClick={handlerNickName}
                        >
                            닉네임 변경
                        </button>
                    </div>
                    <div>
                        <label htmlFor="">이메일</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <button
                            className="border rounded-md px-7 py-2 shadow"
                            onClick={handlerEmail}
                        >
                            이메일 변경
                        </button>
                    </div>
                    <div>
                        <label htmlFor="">비밀번호</label>
                        <input
                            type="password"
                            required
                            value={pw}
                            onChange={e => setPW(e.target.value)}
                            minLength={6}
                            maxLength={16}
                        />
                        <label htmlFor="">비밀번호확인</label>
                        <input
                            type="password"
                            required
                            value={pwConfirm}
                            onChange={e => setPwConfirm(e.target.value)}
                            minLength={6}
                            maxLength={16}
                        />
                        <button
                            className="border rounded-md px-7 py-2 shadow"
                            onClick={handlerPassword}
                        >
                            비밀번호 변경
                        </button>
                    </div>
                    <div className="btn-list">
                        <button
                            className="border rounded-md px-7 py-2 shadow"
                            onClick={handlerDelete}
                        >
                            회원탈퇴
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
            </MyPageDiv>
        </div>
    );
};
export default MyPage;
