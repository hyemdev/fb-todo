import { updateEmail } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext"
import { useState } from "react";
export const useUpdateEmail = () =>{
    const {dispatch} = useAuthContext();
    const [error, setError] = useState(null)
    const [isPending, setIsPending] = useState(false)

    const updateMail = async(email) =>{
        setError(null);
        setIsPending(true);

        try {

            await updateEmail(appAuth.currentUser, email);
            setIsPending(false)
            dispatch({type: "updateEmail", payload: appAuth.currentUser})
        } catch (err) {
            console.log(err.message)
            setIsPending(false);
            setError(err.message);
        }
    }
return {error, isPending, updateMail}
}