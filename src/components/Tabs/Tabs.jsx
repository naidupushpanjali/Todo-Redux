import React, { useState, useRef } from "react";
import TabContent from "./TabContent";
import CompletedTask from "./CompletedTask";
import { useDispatch, useSelector } from "react-redux";
import {
    ADD_TASK,
    DELETE_TASK,
    COMPLETE_TASK,
    EDIT_TASK,
    ESCAPE_EVENT,
    DELETE_ALL_TASK,
} from "../../features/todo/todoSlice";

const Tabs = () => {
    const editInput = useRef([]);
    const addInput = useRef([]);
    const dispatch = useDispatch();
    const [task, setTask] = useState("");
    const [editItem, setEditItem] = useState("");
    const [taskComplete, setTaskComplete] = useState(false);

    const todoList = useSelector((state) => state.todo);

    const handleAdd = (e) => {
        e.preventDefault();
        const taskExist = todoList.findIndex((x) => x.item === task);
        if (task && taskExist < 0) {
            dispatch(
                ADD_TASK({
                    item: task.trim(),
                })
            );
            addInput.current.focus();
        } else {
            dispatch(
                EDIT_TASK({
                    id: taskExist,
                    item: task.trim(),
                    status: "edit",
                    disabled: true,
                    alreadyExist: true,
                })
            );
            editInput.current[taskExist].focus();
        }
        setTask("");
    };

    const handleCompletedClick = (elem, event) => {
        dispatch(
            COMPLETE_TASK({
                id: event.target.id,
                item: elem,
                status: event.target.name,
                disabled: false,
            })
        );
    };

    const handleDeleteClick = (elem, event) => {
        dispatch(
            DELETE_TASK({
                id: event.target.id,
                status: event.target.name,
                disabled: false,
            })
        );
    };

    const handleEditClick = (event) => {
        dispatch(
            EDIT_TASK({
                id: event.target.id,
                item: editItem === "" ? event.target.value : editItem,
                status: event.target.name,
                disabled: true,
            })
        );
        const taskExist = todoList.findIndex(
            (x) => x.item === event.target.value
        );
        editInput.current[taskExist].focus();

        if (event.target.name === "save") {
            setEditItem("");
            addInput.current.focus();
        }
    };

    const handleKeyDown = (e) => {
        if (e.keyCode === 27) {
            dispatch(
                ESCAPE_EVENT({
                    id: e.target.id,
                    item: e.target.value,
                    status: "active",
                    alreadyExist: false,
                })
            );
            addInput.current.focus();
        }
    };

    const handleDeleteAll = () => {
        dispatch(
            DELETE_ALL_TASK({
                item: [],
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
                                ref={addInput}
                                name="addField"
                                className="add-items"
                                onChange={(event) =>
                                    setTask(event.target.value)
                                }
                                placeholder="Add Task name"
                                autoComplete="off"
                            />
                            <button
                                type="submit"
                                className="secondary-btn add-btn"
                            >
                                Add Task
                            </button>
                        </form>
                        {todoList.length > 0 && (
                            <>
                                {todoList.length > 1 && (
                                    <button
                                        className="delete-btn"
                                        onClick={handleDeleteAll}
                                    >
                                        Delete All
                                    </button>
                                )}
                                <TabContent
                                    editItem={editItem}
                                    todoList={todoList}
                                    editInput={editInput}
                                    onHandleChange={(event) =>
                                        setEditItem(event.target.value)
                                    }
                                    onHandleKeyDown={handleKeyDown}
                                    onHandleEditClick={handleEditClick}
                                    onHandleDeleteClick={handleDeleteClick}
                                    onHandleCompletedClick={
                                        handleCompletedClick
                                    }
                                />
                            </>
                        )}
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
