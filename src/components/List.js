import ListItem from "./ListItem";
import React from "react";

const List = ({ todoData, setTodoData }) => {
    console.log("List 랜더링");

    return (
        <div>
            {/* 할일메인 */}
            {todoData.map(item => (
                // 여기에 있는 key값은, .map을 위한 key
                <ListItem
                    key={item.id}
                    item={item}
                    todoData={todoData}
                    setTodoData={setTodoData}
                />
            ))}
        </div>
    );
};
export default List;
