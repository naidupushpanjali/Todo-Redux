import { createSlice } from "@reduxjs/toolkit";
import { TASK_STATUS } from "../../components/TaskStatus";

export const todoSlice = createSlice({
    name: "todo",
    initialState: [],
    reducers: {
        ADD_TASK: (state, action) => {
            const { item } = action.payload;
            const toDo = {
                id: state.length,
                item: item,
                status: TASK_STATUS.ACTIVE,
                disabled: false,
                alreadyExist: false,
            };
            const taskExist = state.findIndex((x) => x.item === item);
            if (taskExist < 0 && item.trim() !== "") state.push(toDo);
        },
        COMPLETE_TASK: (state, action) => {
            const { id, status } = action.payload;
            const completedTask = state.findIndex((x) => x.id === Number(id));
            state[completedTask].status = status;
        },
        DELETE_TASK: (state, action) => {
            return state.filter((x) => x.id !== Number(action.payload.id));
        },
        DELETE_ALL_TASK: () => {
            if (window.confirm("Are you sure you want to proceed?")) return [];
        },
        EDIT_TASK: (state, action) => {
            const { id, item, status, disabled } = action.payload;
            const editTask = state.findIndex((x) => x.id === Number(id));
            state[editTask].item = item;
            state[editTask].status = status;
            state
                .filter(
                    (x) =>
                        x.disabled ===
                        (status === TASK_STATUS.EDIT ? false : true)
                )
                .map(
                    (x) =>
                        (x.disabled =
                            status === TASK_STATUS.EDIT ? true : false)
                );
            state[editTask].disabled = !disabled;
            if (status === TASK_STATUS.EDIT) {
                state[editTask].alreadyExist = true;
            } else {
                state[editTask].alreadyExist = false;
            }
        },
        ESCAPE_EVENT: (state, action) => {
            const { id, status, alreadyExist } = action.payload;
            const editTask = state.findIndex((x) => x.id === Number(id));
            state[editTask].alreadyExist = alreadyExist;
            state[editTask].status = status;
            state.map((x) => (x.disabled = false));
        },
    },
});

export const action = ({ ...todoSlice.actions } = todoSlice.actions);

export default todoSlice.reducer;
