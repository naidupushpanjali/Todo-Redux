import React from "react";
import PropTypes from "prop-types";
import { TASK_STATUS } from "../TaskStatus";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { ReactComponent as Save } from "../../assets/save.svg";
import { ReactComponent as Complete } from "../../assets/done.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";

const TabContent = ({
    editItem,
    todoList,
    editInput,
    onHandleChange,
    onHandleKeyDown,
    onHandleEditClick,
    onHandleDeleteClick,
    onHandleCompletedClick,
}) => {
    return (
        <div className="content-playground">
            <table>
                <tbody>
                    {todoList &&
                        todoList.map((elem, i) => (
                            <tr key={`${elem.item}-${i}`}>
                                <td>
                                    <div
                                        className="content-wrapper"
                                        id={elem.alreadyExist ? "focus" : ""}
                                    >
                                        <textarea
                                            id={elem.id}
                                            className={elem.status}
                                            value={
                                                elem.status ===
                                                    TASK_STATUS.EDIT ||
                                                elem.alreadyExist
                                                    ? editItem !== ""
                                                        ? editItem
                                                        : elem.item
                                                    : elem.item
                                            }
                                            readOnly={
                                                elem.status ===
                                                    TASK_STATUS.EDIT ||
                                                elem.alreadyExist
                                                    ? false
                                                    : true
                                            }
                                            onChange={onHandleChange}
                                            name={elem.status}
                                            rows={
                                                elem.item.split(" ").length < 20
                                                    ? "2"
                                                    : "5"
                                            }
                                            cols="50"
                                            maxLength="500"
                                            onFocus={function (e) {
                                                var val = e.target.value;
                                                e.target.value = "";
                                                e.target.value = val;
                                            }}
                                            ref={(el) =>
                                                (editInput.current[i] = el)
                                            }
                                            onKeyDown={onHandleKeyDown}
                                        />
                                        <div className="button-group">
                                            <button
                                                name={
                                                    elem.status !==
                                                    TASK_STATUS.COMPLETE
                                                        ? TASK_STATUS.COMPLETE
                                                        : TASK_STATUS.TODO
                                                }
                                                onClick={(event) =>
                                                    onHandleCompletedClick(
                                                        elem.item,
                                                        event
                                                    )
                                                }
                                                id={elem.id}
                                                disabled={
                                                    elem.status ===
                                                    TASK_STATUS.EDIT
                                                        ? true
                                                        : false
                                                }
                                            >
                                                {elem.status !==
                                                TASK_STATUS.COMPLETE ? (
                                                    <Complete
                                                        className="complete-task"
                                                        title={
                                                            TASK_STATUS.COMPLETE
                                                        }
                                                    />
                                                ) : (
                                                    "TODO"
                                                )}
                                            </button>
                                            <button
                                                onClick={(event) =>
                                                    onHandleDeleteClick(event)
                                                }
                                                name={TASK_STATUS.DELETE}
                                                id={elem.id}
                                            >
                                                <Delete
                                                    className="delete-task"
                                                    title="Delete"
                                                />
                                            </button>
                                            {elem.status ===
                                            TASK_STATUS.EDIT ? (
                                                <button
                                                    onClick={(event) =>
                                                        onHandleEditClick(event)
                                                    }
                                                    name={TASK_STATUS.SAVE}
                                                    value={elem.item}
                                                    id={elem.id}
                                                >
                                                    <Save
                                                        className="save-task"
                                                        title="Save"
                                                    />
                                                </button>
                                            ) : elem.status !==
                                              TASK_STATUS.COMPLETE ? (
                                                <button
                                                    onClick={(event) =>
                                                        onHandleEditClick(event)
                                                    }
                                                    name={TASK_STATUS.EDIT}
                                                    value={elem.item}
                                                    id={elem.id}
                                                    disabled={
                                                        elem.disabled
                                                            ? true
                                                            : false
                                                    }
                                                >
                                                    <Edit
                                                        className="edit-task"
                                                        title="Edit"
                                                    />
                                                </button>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};

TabContent.propTypes = {
    allTask: PropTypes.array,
    onHandleDeleteClick: PropTypes.func,
    onHandleCompletedClick: PropTypes.func,
};

export default TabContent;
