import { useState } from "react";

const Form = ({ todoData, setTodoData }) => {
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

        // 새로운 todo객체를 만들어준다. 형식(키명)의 구조를 지켜줌
        const newTodo = { id: Date.now(), title: value, completed: false };
        console.log("newTodo", newTodo);
        // state에 저장한다 -> 그리고 갱신
        // todoData에 newTodo를 추가한다
        setTodoData([...todoData, newTodo]);

        //입력, 전송 완료된 입력창을 초기화 한다
        setValue("");
    };

    return (
        <div>
            {/* 할일추가 */}
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
    );
};
export default Form;
