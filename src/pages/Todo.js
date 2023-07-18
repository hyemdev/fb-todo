import { useEffect, useState } from "react";

import List from "../components/List";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import { getTodo, deleteAllTodo } from "../axios/axios";
import Loading from "../components/Loading";

const Todo = ({ fbName, fbUid, fbEmail }) => {
    const Navigator = useNavigate();
    // 로딩처리
    const [isLoading, setIsLoading] = useState(true);

    // 나중에 db구성에 활용한다
    // Firebase, MongDB에서는 Collection 구성에 활용한다.
    console.log(fbName, fbEmail);

    // json server 데이터 state 변수
    const initTodoData = [];
    const [todoData, setTodoData] = useState(initTodoData);

    const handleRemoveClick = () => {
        setTodoData([]);
        deleteAllTodo();
    };

    //uid없는 경우 로그인으로 바로 보내기
    useEffect(() => {
        // if (!fbUid) {
        //     Navigator("/login");
        // }
    }, []);

    //axios get호출 fbtodolist 자료 받기
    useEffect(() => {
        getTodo(setTodoData, setIsLoading);
    }, []);

    return (
        <div>
            <div className="flex justify-center items-start mt-5 w-full">
                {/* isLoading이 true면 Loading을 띄워라 */}
                {isLoading && <Loading />}
                <div className="w-4/6 p-6 bg-white rounded-[6px] shadow">
                    <div className="flex justify-between mb-3">
                        <h1 className="text-center w-4/5 text-2xl font-bold text-orange-700">
                            Firebase Todo-List
                        </h1>
                        <button
                            className="p-2 text-orange-900 border-2 border-orange-300 rounded hover:text-white hover:bg-orange-400 text-[12px]"
                            onClick={handleRemoveClick}
                        >
                            DeleteAll
                        </button>
                    </div>
                    {/* 할일메인 */}
                    <List todoData={todoData} setTodoData={setTodoData} />
                    {/* 할일추가 */}
                    <Form
                        todoData={todoData}
                        setTodoData={setTodoData}
                        fbName={fbName}
                        fbEmail={fbEmail}
                    />
                </div>
            </div>
        </div>
    );
};
export default Todo;
