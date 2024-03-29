import ListItem from "./ListItem";
import React from "react";

const List = ({ todoData}) => {
    return (
        <div>
            {/* 할일메인 */}
            {todoData.map(item => (
                // 여기에 있는 key값은, .map을 위한 key
                <ListItem
                    key={item.id}
                    item={item}
                />
            ))}
        </div>
    );
};
// 리랜더링 최적화를 위한 코드(React.memo)
export default React.memo(List);
