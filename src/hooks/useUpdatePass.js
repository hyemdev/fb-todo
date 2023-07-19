import { updatePassword } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useState } from "react";
// import { useAuthContext } from "./useAuthContext"
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
