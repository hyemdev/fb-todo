import React from "react";

import { useEffect, useReducer } from "react";
import { createContext } from "react";
import { appAuth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

// 인증context를 생성한다
//// context 생성 목적은 전역 상태정보 활용
//// 중간중간에 컴포넌트에 props를 전달하지 않고도, 상태정보 출력 및 수정
////// store (은행금고)라고 생각해보자(Read Only)
const AuthContext = createContext();

// context 관리 리듀서함수
//// action(요청서)을 "처리"하는 함수
//// reducer 함수형태로 action(요청서)을 처리하는 이유는,
//// 1. 원본(state)를 훼손하지 않고, 원하는 데이터 처리를 한 후
//// 2. 원본(state)를 변경한다(불변성)
const authReducer = (state, action) => {
    //  { type: "login", payload: user }

    // action은 반드시 형태가 { type: "구분자" }
    // ex. {type : "입금", payload: 1000 }
    // ex. {type : "잔고"} - type은 필수지만 payload는 있을수도 없을수도..

    switch (action.type) {
        case "login":
            // state를 갱신한다
            return { ...state, user: action.payload }; // 추후에 immer가 들어감
        case "logout":
            return { ...state, user: null };

        case "isAuthReady":
            return { ...state, user: action.payload, isAuthReady: true };

        //----마이페이지 수정 업데이트
        case "updateName":
            return {...state, user: action.payload}
        
        case "updateEmail":
            return {...state, user: action.payload}
            
        case "deleteUser":
            return {...state, user: null}

        default:
            // 그대로 돌려준다
            return state;
    }
};

// context를 구독(Subscribe)하도록 Provider를 생성
const AuthContextProvider = ({ children }) => {
    // 컴포넌트용 상태관리는 useState
    //// const [상태, 상태관리함수] = useState(초기값);

    // 유저 정보를 관리할 함수(Reducer)를 생성
    //// context에 담겨진 전역 상태관리를 위한 hook
    //// const [전역상태(state), 전역상태관리함수(dispatch)] = useReducer(전역상태를 관리해줄 함수, {초기값});
    //// dispatch를 실행하면 authReducer의 action을 통해 state가 변함
    const [state, dispatch] = useReducer(authReducer, {
        user: null, //fb로그인 정보(초기값은 null임)
        // user: {email: "", nickname: "", uid: ""}

        // 로그인 상태체크
        isAuthReady: false,
    });

    // fb 인증 웹브라우저 새로고침 처리
    useEffect(() => {
        onAuthStateChanged(appAuth, user => {
            // login 되었는지 아닌지를 파악한다.
            // AuthContext에 User정보를 입력한다.
            dispatch({ type: "isAuthReady", payload: user });
        });
    }, []);

    return (
        // context 내부의 컴포넌트들에게 상태정보를 공급하겠다.(value는 필수)
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {/* children은 state,dispatch 둘다 사용할 수 있는 환경이 된다 */}
            {children}
        </AuthContext.Provider>
    );
};
export { AuthContext, AuthContextProvider };
