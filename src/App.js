import React, { useState } from "react";
import "./App.css";
import List from "./components/List";
import Form from "./components/Form";

function App() {
    console.log("App 랜더링")
    // 더미 데이터
    // 일반 데이터 변수를 state변수로 바꿔보자
    const [todoData, setTodoData] = useState([
        { id: 1, title: "할일 1", completed: true },
        { id: 2, title: "할일 2", completed: true },
        { id: 3, title: "할일 3", completed: false },
        { id: 4, title: "할일 4", completed: true },
    ]);

    return (
        <>
            <div className="container">
                <div className="todo-block">
                    <div className="title">
                        <h1>할 일 목록</h1>
                    </div>
                    {/* 할일메인 */}
                    <List todoData={todoData} setTodoData={setTodoData}/>
                    {/* 할일추가 */}
                    <Form todoData={todoData} setTodoData={setTodoData}/>
                </div>
            </div>
        </>
    );
}

export default App;
