// React의 useContext hook을 사용
// AuthContext 의 state 및 dispatch함수를 가져오는 커스텀 훅을 정의

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export const useAuthContext = () => {
    // context = {user, isAuthReady, dispatch}
    const context = useContext(AuthContext);

    return context;
};
