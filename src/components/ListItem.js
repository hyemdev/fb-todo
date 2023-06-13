const ListItem = ({ item, todoData, setTodoData }) => {
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
    const handleClick = _id => {
        // 전달된 id를 검색해서 목록에서 제거
        // 1.전달된 id로 해당하는 목록을 찾아서 제외하고 새로운 목록으로 갱신(화면 리랜더링)
        // 2.배열의 고차함수 중 filter를 사용하자(결과가 참인 값만 담아서 새로운 배열은 만든다.)
        const newTodoData = todoData.filter(item => item.id !== _id);
        setTodoData(newTodoData);
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
    }
        return (
            <div style={getStyle(item.completed)} key={item.id}>
                {/* key는 반복문에서 unique해야한다 */}
                {/* defaultChecke체크박스에 기본체크 상태 설정 */}
                <input
                    type="checkbox"
                    defaultChecked={item.completed}
                    onChange={() => handleCompleteChange(item.id)}
                />
                {item.title}

                {/* 화살표함수로 감싸서 즉시실행이 아닌, 클릭시 실행하게 만들자 */}
                <button style={btnStyle} onClick={() => handleClick(item.id)}>
                    X
                </button>
            </div>
        );
    };
export default ListItem;
