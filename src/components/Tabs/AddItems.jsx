import React from "react";
import PropTypes from "prop-types";

const AddItems = ({
    addItems,
    addInput,
    disabled,
    onHandleAdd,
    onHandleChange,
}) => {
    return (
        <form onSubmit={(event) => onHandleAdd(addItems, event)}>
            <input
                autoFocus
                type="text"
                ref={addInput}
                value={addItems}
                className="add-items"
                onChange={onHandleChange}
                placeholder="Add Task name"

            />
            <button
                type="submit"
                className="secondary-btn add-btn"
                disabled={disabled ? true : false}
            >
                Add Task
            </button>
        </form>
    );
};

AddItems.propTypes = {
    onHandleAdd: PropTypes.func,
    addItems: PropTypes.string,
    onHandleChange: PropTypes.func,
};

export default AddItems;
