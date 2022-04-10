import React from "react";

const CompletedTask = ({ todoList, onHandleBack }) => {
    return (
        <div className="completed-list">
            <h2 className="heading">Completed Tasks</h2>
            <div className="content-playground">
                {todoList.map(
                    (x, i) =>
                        x.status === "complete" && (
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
