import {
    collection,
    onSnapshot,
    orderBy,
    query,
    where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { appFireStore } from "../firebase/config";

export const useCollection = (transaction, userQuery) => {
    // 문서들을 관리할 state
    const [documents, setDocuments] = useState(null);

    // 에러를 관리 할 state
    const [error, setError] = useState(null);

    useEffect(() => {
        // firebase쿼리를 통한 사용자 구별 및 정렬 처리
        let qr;
        if (userQuery) {
            qr = query(
                collection(appFireStore, transaction),
                // 사용자 구별
                where(...userQuery),
                // 정렬
                orderBy("createTime", "desc"),
            );
        }
        console.log(userQuery)

        // 컬렉션의 이름을 통해서 응답을 받을 때 처리
        // onSnapshot을 통해서 컬렉션 참조를 보내면,
        // snapshot에 문서들을 담아서 반환한다.
        // snapshot.docs를 이용해서 원하는 처리를 한다.
        const sn = onSnapshot(
            userQuery ? qr : collection(appFireStore, transaction),
            snapshot => {
                let result = [];
                snapshot.docs.forEach(item => {
                    // 각각의 docs내의 요소에 data() 메서드를 이용하면 내용을 뜯을 수 있다.
                    result.push({ ...item.data(), id: item.id });
                });
                console.log("결과확인", result);
                setDocuments(result);
                setError(null);
            },
            err => setError(err.message),
        );
        //클린업 함수 (화면에서 사라질 때)
        return sn;
    }, [collection]);
    return { documents, error };
};
