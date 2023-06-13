import React, { useState } from "react";
import "./App.css";

function App() {
    // 더미 데이터
    // 일반 데이터 변수를 state변수로 바꿔보자
    const [todoData, setTodoData] = useState([
        { id: 1, title: "할일 1", completed: true },
        { id: 2, title: "할일 2", completed: true },
        { id: 3, title: "할일 3", completed: false },
        { id: 4, title: "할일 4", completed: true },
    ]);
    const btnStyle = {
        background: "#e1e1e1",
        color: "#fff",
        float: "right",
        border: "none",
        padding: "5px 9px",
        borderRadius: "50%",
        cursor: "pointer",
    };
    const getStyle = _completed => {
        return {
            padding: "10px",
            borderBottom: "1px solid lavender",
            // 할일을 완료했으면 텍스트에 중간선, 완료하지못했으면 아무것도 표기를 안한다.
            textDecoration: _completed ? "line-through" : "none",
        };
    };
    // 새로운 할일 state 변수
    const [value, setValue] = useState("");

    // 이벤트 핸들러 자리
    const handleClick = _id => {
        // 전달된 id를 검색해서 목록에서 제거
        // 1.전달된 id로 해당하는 목록을 찾아서 제외하고 새로운 목록으로 갱신(화면 리랜더링)
        // 2.배열의 고차함수 중 filter를 사용하자(결과가 참인 값만 담아서 새로운 배열은 만든다.)
        const newTodoData = todoData.filter(item => item.id !== _id);
        setTodoData(newTodoData);
    };
    // input type=text의 value 변경 화면 리랜더링
    const handleChange = e => {
        // e.target은 이벤트를 일으킨 애 (text input창)
        setValue(e.target.value);
    };
    // form submit 실행 시 체크
    const handleSubmit = e => {
        // 웹브라우저(url주소표시창)로 데이터전송을 막아야한다 (마치 a태그의 href를 막듯이...)
        e.preventDefault();

        // 새로운 todo객체를 만들어준다. 형식(키명)의 구조를 지켜줌
        const newTodo = { id: Date.now(), title: value, completed: false };
        console.log("newTodo", newTodo);
        // state에 저장한다 -> 그리고 갱신
        // todoData에 newTodo를 추가한다
        setTodoData([...todoData, newTodo]);

        //입력, 전송 완료된 입력창을 초기화 한다
        setValue("");
    };

    const handleCompleteChange = _id => {
        // 중요한 것은 id에 해당하는 것만 수정하면 되는것이 아니다
        // state는 항상 새롭게 만든 내용. 즉, 배열로 업데이트 해야한다.
        // 새로운 배열을 만들어서 set 하자!
        let newTodoData = todoData.map(item => {
            if (item.id === _id) {
                // completed를 갱신
                item.completed = !item.completed;
            }
            return item;
        });
        setTodoData(newTodoData);
    };

    return (
        <>
            <div className="container">
                <div className="todo-block">
                    <div className="title">
                        <h1>할 일 목록</h1>
                    </div>
                    {/* 할일메인 */}
                    {todoData.map(item => (
                        // key는 반복문에서 unique해야한다
                        <div style={getStyle(item.completed)} key={item.id}>
                            {/* defaultChecke체크박스에 기본체크 상태 설정 */}
                            <input
                                type="checkbox"
                                defaultChecked={item.completed}
                                onChange={() => handleCompleteChange(item.id)}
                            />
                            {item.title}

                            {/* 화살표함수로 감싸서 즉시실행이 아닌, 클릭시 실행하게 만들자 */}
                            <button
                                style={btnStyle}
                                onClick={() => handleClick(item.id)}
                            >
                                X
                            </button>
                        </div>
                    ))}
                    {/* 할일추가 */}
                    <div>
                        <form
                            style={{
                                display: "flex",
                                marginTop: "5px",
                                padding: "1px 10px",
                            }}
                            onSubmit={handleSubmit}
                        >
                            <input
                                type="text"
                                name="value"
                                style={{ flex: "10", padding: "5px" }}
                                placeholder="할 일을 입력 해 주세요."
                                value={value}
                                onChange={handleChange}
                            />
                            <input
                                type="submit"
                                value="추가"
                                style={{ flex: "1", margin: "0 5px" }}
                            />
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
