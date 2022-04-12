import React from "react";
import { TASK_STATUS } from "../TaskStatus";

const CompletedTask = ({ todoList, onHandleBack }) => {
    return (
        <div className="completed-list">
            <h2 className="heading">Completed Tasks</h2>
            <div className="content-playground">
                {todoList.map(
                    (x, i) =>
                        x.status === TASK_STATUS.COMPLETE && (
                            <div
                                className="content-wrapper"
                                key={`${x.item}-${i}`}
                            >
                                <p>{x.item}</p>
                            </div>
                        )
                )}
            </div>
            <button className="secondary-btn page-btn" onClick={onHandleBack}>
                Back to list
            </button>
        </div>
    );
};

export default CompletedTask;
