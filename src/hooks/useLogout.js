import { useState } from "react";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

//firebase 로그아웃
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
