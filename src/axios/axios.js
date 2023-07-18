import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 1000,
    headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        Accept: "*/*",
    },
});

// Todo Get 기능
const getTodo = async (setTodoData, Loading) => {
    try {
        const res = await axiosInstance.get("/todos");
        const result = res.data;
        // 문제? "true"와 "false"가 문자로 들어온다는 것.
        // 그 문제를 해결하기 위해 map를 한번 더 돌려준다
        const todosArr = result.map(item => {
            if (item.completed === "true") {
                item.completed = true;
            } else {
                item.completed = false;
            }
            return item;
            // 이렇게 써도됨
            // item.completed = JSON.parse(item.completed);
            // item.id = JSON.parse(item.id);
        });
        setTodoData(todosArr);
        Loading(false)
    } catch (error) {
        console.log(error);
        Loading(false)
    }
};
// Todo Post 기능
const postTodo = async newTodo => {
    try {
        const res = await axiosInstance.post("/todos", newTodo);
        const data = res.data;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};
/////////////////////////////////////////////////
// Todo Patch 기능
const patchTitleTodo = async (_id, editTitle) => {
    try {
        const res = await axiosInstance.patch(`/todos/${_id}`, {
            title: editTitle,
            completed: false,
        });
        const data = res.data;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

const patchCompleteTodo = async (_id, item) => {
    try {
        const res = await axiosInstance.patch(`/todos/${_id}`, {
            completed: item.completed,
        });
        const data = res.data;
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};
///////////////////////////////////////////////////////////////
// Todo Delete 기능
const deleteTodo = async _id => {
    try {
        const res = await axiosInstance.delete(`/todos/${_id}`);
        const result = res.data;
        console.log(result);
    } catch (error) {
        console.log(error);
    }
};

// Todo 전체삭제
const deleteAllTodo = async () => {
    try {
        const res = await axiosInstance.get("/todos");
        const result = res.data;
        result.forEach(item => {
            deleteTodo(item.id);
        });
    } catch (error) {
        console.log(error);
    }
};

export {
    axiosInstance,
    postTodo,
    getTodo,
    patchTitleTodo,
    patchCompleteTodo,
    deleteTodo,
    deleteAllTodo,
};
