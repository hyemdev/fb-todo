import React, { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

function App() {
    console.log("App 랜더링");
    // 더미 데이터
    // 일반 데이터 변수를 state변수로 바꿔보자
    const [todoData, setTodoData] = useState([
        { id: 1, title: "할일 1", completed: true },
        { id: 2, title: "할일 2", completed: true },
        { id: 3, title: "할일 3", completed: false },
        { id: 4, title: "할일 4", completed: true },
    ]);

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-blue-300">
            <div className="w-4/6 p-6 bg-white rounded-[6px] shadow">
                <div>
                    <div className="flex justify-between mb-3">
                        <h1 className="text-center w-3/4 text-2xl font-bold text-sky-600">Firebase Todo-List</h1>
                    </div>
                    {/* 할일메인 */}
                    <List todoData={todoData} setTodoData={setTodoData} />
                    {/* 할일추가 */}
                    <Form todoData={todoData} setTodoData={setTodoData} />
                </div>
            </div>
        </div>
    );
}

export default App;
