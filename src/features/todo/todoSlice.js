import { createSlice } from "@reduxjs/toolkit";

export const todoSlice = createSlice({
    name: "todo",
    initialState: [],
    reducers: {
        ADD_TASK: (state, action) => {
            const toDo = {
                id: state.length,
                item: action.payload.item,
                status: "active",
                disabled: false,
                alreadyExist: false,
            };
            const taskExist = state.findIndex(
                (x) => x.item === action.payload.item
            );
            if (taskExist < 0 && action.payload.item.trim() !== "")
                state.push(toDo);
        },
        COMPLETE_TASK: (state, action) => {
            const completedTask = state.findIndex(
                (x) => x.id === Number(action.payload.id)
            );
            state[completedTask].status = action.payload.status;
        },
        DELETE_TASK: (state, action) => {
            return state.filter((x) => x.item !== action.payload.item);
        },
        EDIT_TASK: (state, action) => {
            const editTask = state.findIndex(
                (x) => x.id === Number(action.payload.id)
            );
            state[editTask].item = action.payload.item;
            state[editTask].status = action.payload.status;
            state
                .filter(
                    (x) =>
                        x.disabled ===
                        (action.payload.status === "edit" ? false : true)
                )
                .map(
                    (x) =>
                        (x.disabled =
                            action.payload.status === "edit" ? true : false)
                );
            state[editTask].disabled = !action.payload.disabled;
            if (action.payload.status === "edit") {
                state[editTask].alreadyExist = true;
            } else {
                state[editTask].alreadyExist = false;
            }
        },
        ESCAPE_EVENT: (state, action) => {
            const editTask = state.findIndex(
                (x) => x.id === Number(action.payload.id)
            );
            state[editTask].alreadyExist = action.payload.alreadyExist;
            state[editTask].status = action.payload.status;
        },
    },
});

export const { ADD_TASK, COMPLETE_TASK, DELETE_TASK, EDIT_TASK, ESCAPE_EVENT } =
    todoSlice.actions;

export default todoSlice.reducer;
