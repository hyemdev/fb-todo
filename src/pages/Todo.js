import { useEffect, useState } from "react";

import List from "../components/List";
import Form from "../components/Form";

const Todo = () => {
    // 로컬 데이터 state 변수
    const initTodoData = localStorage.getItem("fbTodoData")
        ? JSON.parse(localStorage.getItem("fbTodoData"))
        : [];

    const [todoData, setTodoData] = useState(initTodoData);

    const handleRemoveClick = () => {
        setTodoData([]);
        // 로컬 스토리지 초기화
        localStorage.setItem("fbTodoData", JSON.stringify([]));
    };

    useEffect (()=>{
      //axios get호출 fbtodolist 자료 받기

    },[])
    return (
        <div>
            <div className="flex justify-center items-start mt-5 w-full">
                <div className="w-4/6 p-6 bg-white rounded-[6px] shadow">
                    <div className="flex justify-between mb-3">
                        <h1 className="text-center w-4/5 text-2xl font-bold text-sky-600">
                            Firebase Todo-List
                        </h1>
                        <button
                            className="p-2 text-blue-400 border-2 border-blue-300 rounded hover:text-white hover:bg-blue-400 text-[12px]"
                            onClick={handleRemoveClick}
                        >
                            DeleteAll
                        </button>
                    </div>
                    {/* 할일메인 */}
                    <List todoData={todoData} setTodoData={setTodoData} />
                    {/* 할일추가 */}
                    <Form todoData={todoData} setTodoData={setTodoData} />
                </div>
            </div>
        </div>
    );
};
export default Todo;
