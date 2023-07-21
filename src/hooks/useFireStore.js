import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    updateDoc,
} from "firebase/firestore";
import { useReducer } from "react";
import { appFireStore, timestamp } from "../firebase/config";

// FB의 store CRUD Hook

// 초기값
const initState = {
    document: null, // 전송할 document
    isPending: false, // 네트워크 연결
    error: null, // 에러메시지
    success: false, // 작업완료
};

// state 업데이트 리듀서
const storeReducer = (state, action) => {
    switch (action.type) {
        case "isPending":
            return {
                isPending: true,
                document: null,
                error: null,
                success: false,
            };
        case "addDoc":
            return {
                isPending: false,
                document: action.payload,
                error: null,
                success: true,
            };
        case "deleteDoc":
        case "updateCompleted":
        case "updateTitleDoc":
            return {
                isPending: false,
                document: action.payload,
                error: null,
                success: true,
            };
        default:
            return state;
    }
};

export const useFireStore = transaction => {
    // dispatch를 통해서 reducer 실행
    const [response, dispatch] = useReducer(storeReducer, initState);

    // FB store의 컬렉션을 먼저 참조한다.
    // 컬렉션( collection )은 폴더라고 생각하면 됨.
    // const colRef = collection(appFireStore, "컬렉션이름")
    const colRef = collection(appFireStore, transaction);

    // document 추가 :  collection에 document추가
    const addDocument = async doc => {
        // 네트워크에 연결함을 표현
        dispatch({ type: "isPending" });
        try {
            const createTime = timestamp.fromDate(new Date());

            // const docRef = await addDoc(컬렉션참조, 문서);
            const docRef = await addDoc(colRef, { ...doc, createTime });
            // doc는 {title: "내용" , completed: false, createTime: 시간 }

            console.log("문서추가실행", docRef);

            // dispatch({문서추가액션})
            dispatch({ type: "addDoc", payload: docRef });
        } catch (err) {
            console.log(err.message);
        }
    };

    // document 삭제 : collection에 ducument 삭제
    const deleteDocument = async id => {
        dispatch({ type: "isPending" });
        try {
            const docRef = await deleteDoc(doc(colRef, id));
            console.log("삭제했어요");
            dispatch({ type: "deleteDoc", payload: docRef });
        } catch (err) {
            console.log(err.message);
        }
    };

    // completed 업데이트
    const updateCompletedDocument = async (id, flag) => {
        dispatch({ type: "isPending" });
        try {
            // FB의 doc 메서드는 1개의 document를 선택한다.
            // doc(todo컬렉션:폴더 참조, id)
            // updateDoc( 문서, { 키 : 값 })
            const docRef = await updateDoc(doc(colRef, id), {
                completed: flag,
            });
            dispatch({ type: "updateCompleted", payload: docRef });
        } catch (err) {
            console.log(err.message);
        }
    };

    // todo title update
    const updateTitleDocument = async (id, title) => {
        dispatch({ type: "isPending" });
        try {
            const docRef = await updateDoc(doc(colRef, id), { title });
            dispatch({ type: "updateTitleDoc", payload: docRef });
        } catch (err) {
            console.log(err.message);
        }
    };

    // 외부 호출
    return {
        addDocument,
        deleteDocument,
        updateCompletedDocument,
        updateTitleDocument,
        response,
    };
};
