import { useState } from "react";
import {useAuthContext} from "./useAuthContext";
import { appAuth } from "../firebase/config";
import { updateProfile } from "firebase/auth";


export const useUpdateNickName = () => {
    const {dispatch} = useAuthContext()
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)
    const updateNickName = async displayName =>{
        setError(null);
        setIsPending(true);
        try {
            //fb 의 닉네임 변경 api사용
            await updateProfile(appAuth.currentUser, {
                displayName: displayName,
            });

            setIsPending(false);

            //context의 state 변경
            dispatch({type: "updateName", payload: appAuth.currentUser})
        } catch (err) {
            console.log(err.message)
            setIsPending(false);
            setError(err.message);
        }


    }
    return {error, isPending, updateNickName}
}