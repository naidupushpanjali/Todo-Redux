import React, { useState, useRef } from "react";
import TabContent from "./TabContent";
import CompletedTask from "./CompletedTask";
import { useDispatch, useSelector } from "react-redux";
import {
    ADD_TASK,
    DELETE_TASK,
    COMPLETE_TASK,
    EDIT_TASK,
} from "../../features/todo/todoSlice";

const Tabs = () => {
    const editInput = useRef([]);
    const dispatch = useDispatch();
    const [task, setTask] = useState("");
    const [editItem, setEditItem] = useState("");
    const todoList = useSelector((state) => state.todo);
    const [taskComplete, setTaskComplete] = useState(false);

    const handleAdd = (e) => {
        e.preventDefault();
        if (task) {
            dispatch(
                ADD_TASK({
                    item: task,
                })
            );
        }
        setTask("");
    };

    const handleCompletedClick = (elem, event) => {
        dispatch(
            COMPLETE_TASK({
                id: event.target.id,
                item: elem,
                status: event.target.name,
            })
        );
    };

    const handleDeleteClick = (elem, event) => {
        dispatch(
            DELETE_TASK({
                item: elem,
                status: event.target.name,
            })
        );
    };

    const handleEditClick = (event) => {
        dispatch(
            EDIT_TASK({
                id: event.target.id,
                item: editItem === "" ? event.target.value : editItem,
                status: event.target.name,
            })
        );
    };

    return (
        <div className="todo-app">
            {!taskComplete ? (
                <>
                    <h1 className="heading">To-Do Application</h1>
                    <div className="todo-wrapper">
                        <form onSubmit={(event) => handleAdd(event)}>
                            <input
                                autoFocus
                                type="text"
                                value={task}
                                name="addField"
                                className="add-items"
                                onChange={(event) =>
                                    setTask(event.target.value)
                                }
                                placeholder="Add Task name"
                            />
                            <button
                                type="submit"
                                className="secondary-btn add-btn"
                            >
                                Add Task
                            </button>
                        </form>
                        <TabContent
                            editItem={editItem}
                            todoList={todoList}
                            editInput={editInput}
                            onHandleChange={(event) =>
                                setEditItem(event.target.value)
                            }
                            onHandleEditClick={handleEditClick}
                            onHandleDeleteClick={handleDeleteClick}
                            onHandleCompletedClick={handleCompletedClick}
                        />
                        {todoList.find((x) => x.status === "complete") && (
                            <button
                                className="secondary-btn page-btn"
                                onClick={() => setTaskComplete(!taskComplete)}
                            >
                                Completed task
                            </button>
                        )}
                    </div>
                </>
            ) : (
                <CompletedTask
                    todoList={todoList}
                    onHandleBack={() => setTaskComplete(!taskComplete)}
                />
            )}
        </div>
    );
};

export default Tabs;
