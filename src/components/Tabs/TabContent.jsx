import React from "react";
import PropTypes from "prop-types";
import { ReactComponent as Edit } from "../../assets/edit.svg";
import { ReactComponent as Save } from "../../assets/save.svg";
import { ReactComponent as Complete } from "../../assets/done.svg";
import { ReactComponent as Delete } from "../../assets/delete.svg";

const TabContent = ({
    editItem,
    todoList,
    editInput,
    onHandleChange,
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
                                    <div className="content-wrapper">
                                        <textarea
                                            id={elem.id}
                                            className={elem.status}
                                            value={
                                                elem.status === "edit"
                                                    ? editItem !== "" 
                                                        ? editItem
                                                        : elem.item
                                                    : elem.item
                                            }
                                            readOnly={
                                                elem.status === "edit"
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
                                            maxLength="200"
                                            onFocus={function (e) {
                                                var val = e.target.value;
                                                e.target.value = "";
                                                e.target.value = val;
                                            }}
                                            ref={(el) =>
                                                (editInput.current[i] = el)
                                            }
                                        />
                                        <div className="button-group">
                                            <button
                                                name={
                                                    elem.status !== "complete"
                                                        ? "complete"
                                                        : "active"
                                                }
                                                onClick={(event) =>
                                                    onHandleCompletedClick(
                                                        elem.item,
                                                        event
                                                    )
                                                }
                                                id={elem.id}
                                            >
                                                {elem.status !== "complete" ? (
                                                    <Complete
                                                        className="complete-task"
                                                        title="Complete"
                                                    />
                                                ) : (
                                                    "TODO"
                                                )}
                                            </button>
                                            <button
                                                onClick={(event) =>
                                                    onHandleDeleteClick(
                                                        elem.item,
                                                        event
                                                    )
                                                }
                                                name="delete"
                                                id={elem.id}
                                            >
                                                <Delete
                                                    className="delete-task"
                                                    title="Delete"
                                                />
                                            </button>
                                            <button
                                                onClick={(event) =>
                                                    onHandleEditClick(event)
                                                }
                                                name={
                                                    elem.status !== "edit"
                                                        ? "edit"
                                                        : "save"
                                                }
                                                value={
                                                    elem.status === "edit"
                                                        ? editItem
                                                        : elem.item
                                                }
                                                id={elem.id}
                                            >
                                                {elem.status !== "edit" ? (
                                                    <Edit
                                                        className="edit-task"
                                                        title="Edit"
                                                    />
                                                ) : (
                                                    <Save
                                                        className="save-task"
                                                        title="Save"
                                                    />
                                                )}
                                            </button>
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
