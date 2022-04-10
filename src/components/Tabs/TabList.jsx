import React from "react";
import PropTypes from "prop-types";

const TabList = ({ onHandleTabClick, tabName, activeTabs }) => {
    return (
        <ul>
            {tabName.map((elem, i) => (
                <li
                    key={i}
                    onClick={() => onHandleTabClick(elem)}
                    className={elem === activeTabs ? "active" : ""}
                >
                    {elem}
                </li>
            ))}
        </ul>
    );
};

TabList.propTypes = {
    onHandleTabClick: PropTypes.func,
    tabName: PropTypes.array,
};

export default TabList;
