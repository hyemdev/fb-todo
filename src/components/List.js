import ListItem from "./ListItem";

const List = ({ todoData, setTodoData }) => {
    return (
        <div>
            {/* 할일메인 */}
            {todoData.map(item => (
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
