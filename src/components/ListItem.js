import React, { useState } from "react";
import { patchTitleTodo, patchCompleteTodo, deleteTodo } from "../axios/axios";

const ListItem = ({ item, todoData, setTodoData }) => {
    console.log("ListItem 랜더링", item);

    // 편집상태 설정 state
    const [isEdit, setIsEdit] = useState(false);

    const [editTitle, setEditTitle] = useState(item.title);

    const getStyle = _completed => {
        return {
            padding: "10px",
            // 할일을 완료했으면 텍스트에 중간선, 완료하지못했으면 아무것도 표기를 안한다.
            textDecoration: _completed ? "line-through" : "none",
        };
    };
    // 삭제창 만들기
    const handleDeleteClick = _id => {
        // 전달된 id를 검색해서 목록에서 제거
        // 1.전달된 id로 해당하는 목록을 찾아서 제외하고 새로운 목록으로 갱신(화면 리랜더링)
        // 2.배열의 고차함수 중 filter를 사용하자(결과가 참인 값만 담아서 새로운 배열은 만든다.)
        const newTodoData = todoData.filter(item => item.id !== _id);
        setTodoData(newTodoData);

        //로컬 스토리지 저장
        // localStorage.setItem("fbTodoData", JSON.stringify(newTodoData));

        deleteTodo(_id);
    };
    //async,await & axios 사용하기

    // 수정버튼 활성화 하기
    const handleEditClick = _id => {
        console.log(_id);
        setIsEdit(true);
    };

    //수정 입력창 생성하기
    const handleEditChange = e => {
        setEditTitle(e.target.value);
    };

    // 수정 취소하기
    const handleCancelClick = () => {
        setIsEdit(false);
    };

    // 수정 저장하기
    const handleSaveClick = _id => {
        console.log(_id);
        let newTodoData = todoData.map(item => {
            if (item.id === _id) {
                item.title = editTitle;
                item.completed = false;
            }
            return item;
        });
        setTodoData(newTodoData);

        //axios patch/put 호출 fbtodolist 자료수정하기
        console.log(_id, editTitle);

        patchTitleTodo(_id, editTitle);
        setIsEdit(false);
    };

    //completed:true/false 수정하기
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

        //로컬 스토리지 저장
        // localStorage.setItem("fbTodoData", JSON.stringify(newTodoData));

        //axios patch/put 호출 fbtodolist 자료수정하기
        patchCompleteTodo(_id, { ...item });
    };

    if (isEdit) {
        // 편집중
        return (
            <div className="flex items-center justify-between w-full mb-3 px-4 py-1 text-gray-500 bg-gray-100 border rounded">
                <div className="items-center w-4/6">
                    <input
                        type="text"
                        defaultValue={editTitle}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 mr-3 text-gray-500 rounded"
                    />
                </div>
                <div className="items-center">
                    {/* 화살표함수로 감싸서 즉시실행이 아닌, 클릭시 실행하게 만들자 */}
                    <button
                        className="px-y py-2 float-right px-1"
                        onClick={handleCancelClick}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-y py-2 float-right px-1"
                        onClick={() => handleSaveClick(item.id)}
                    >
                        Save
                    </button>
                </div>
            </div>
        );
    } else {
        // 일반상태(평소의 상태)
        return (
            <div className="flex items-center justify-between w-full mb-3 px-4 py-1 text-gray-600 bg-gray-100 border rounded">
                <div className="items-center" style={getStyle(item.completed)}>
                    {/* key는 반복문에서 unique해야한다 */}
                    {/* defaultChecke체크박스에 기본체크 상태 설정 */}
                    <input
                        type="checkbox"
                        defaultChecked={item.completed}
                        value={item.completed}
                        onChange={() => handleCompleteChange(item.id)}
                    />
                    <span className="ml-2">{item.title}</span>
                </div>
                <div className="items-center">
                    {/* 화살표함수로 감싸서 즉시실행이 아닌, 클릭시 실행하게 만들자 */}
                    <button
                        className="px-y py-2 float-right px-1"
                        onClick={() => handleDeleteClick(item.id)}
                    >
                        Del
                    </button>
                    <button
                        className="px-y py-2 float-right px-1"
                        onClick={handleEditClick}
                    >
                        Edit
                    </button>
                </div>
            </div>
        );
    }
};

// 리랜더링 최적화를 위한 코드(React.memo)
export default React.memo(ListItem);
