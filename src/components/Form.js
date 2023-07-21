import React from "react";

import { useState } from "react";
import { useFireStore } from "../hooks/useFireStore";

const Form = ({ uid }) => {
    // fb store의 collection참조를 활용 , useFireStore("컬렉션이름")
    const { addDocument, response } = useFireStore("todo");

    // 새로운 할일 state 변수
    const [value, setValue] = useState("");

    // 이벤트 핸들러 자리
    // input type=text의 value 변경 화면 리랜더링
    const handleChange = e => {
        // e.target은 이벤트를 일으킨 애 (text input창)
        setValue(e.target.value);
    };

    // form submit 실행 시 체크
    const handleSubmit = e => {
        // 웹브라우저(url주소표시창)로 데이터전송을 막아야한다 (마치 a태그의 href를 막듯이...)
        e.preventDefault();

        //빈공백입력 막기 (정규표현식으로 처리 예정)
        // if (value === "") {
        //     alert("내용을 입력하세요");
        // }

        // 새로운 todo객체를 만들어준다. 형식(키명)의 구조를 지켜줌
        // const newTodo = {
        //     id: Date.now(),
        //     title: value,
        //     completed: false,
        // };
        // state에 저장한다 -> 그리고 갱신
        // todoData에 newTodo를 추가한다

        // set함수에서(setTodoData)에서 갱신된 state를 즉시 가지고 오기 위해서는
        // set함수의 인자로 '콜백함수'를 전달해야한다
        // setTodoData(prev => {
        //     return [...prev, newTodo];
        // });
        // console.log("todoData", todoData);
        // setTodoData([...todoData, newTodo]);

        // postTodo 실행
        // postTodo(newTodo);

        // fb의 collection에 Document를 추가한다.
        // document의 형식은 객체 리터럴
        addDocument({ uid, title: value, completed: false });
        
        //입력, 전송 완료된 입력창을 초기화 한다
        setValue("");
    };

    return (
        <div>
            {/* 할일추가 */}
            <form
                className="flex pt-2"
                style={{
                    display: "flex",
                    marginTop: "5px",
                }}
                onSubmit={handleSubmit}
            >
                <input
                    className="w-full px-3 py-2 mr-4 text-gray-500 border rounded shadow"
                    type="text"
                    name="value"
                    style={{ flex: "10", padding: "5px" }}
                    placeholder="할 일을 입력 해 주세요."
                    value={value}
                    onChange={handleChange}
                />
                <input
                    className="p-2 text-yellow-600 border-2 border-yellow-400 rounded hover:text-white hover:bg-orange-700"
                    type="submit"
                    value="추가"
                    style={{ flex: "1", margin: "0 1px" }}
                />
            </form>
        </div>
    );
};

export default Form;
