import { createSlice } from '@reduxjs/toolkit';

export type todo = {
    id: number,
    title: string,
    comments: number,
    user: {[login: string]: string},
    status: string
}

type lists = {
    todoList: todo[],
    inProgressList: todo[],
    doneList: todo[]
}

const initialState: lists = {
    todoList: [],
    inProgressList: [],
    doneList: [],
}

const listsSlice = createSlice({
    name: 'lists',

    initialState,

    reducers: {
        addTodo: (state, action) => {
            const newObj = {
                id: Date.now(),
                title: action.payload.inputText,
                comments: 0,
                user: {
                    login: 'Admin'
                },
                status: 'ToDo'
            }
            
            state.todoList.push(newObj);
        },

        updateList: (state, action) => {
            const status = action.payload.listType;
            const newList = action.payload.updatedList;

            switch (status) {
                case 'ToDo':
                    state.todoList = newList;
                    break;
                case 'InProgress':
                    state.inProgressList = newList;
                    break;
                case 'Done':
                    state.doneList = newList;
                    break;
                default:
                    break;
            }
        },
        clearLists: (state) => {
            state.todoList.length = 0;
            state.inProgressList.length = 0;
            state.doneList.length = 0;
        },
        loadIssues: (state, action) => {
            const issuesList = action.payload.issues;
            console.log(issuesList);
            state.todoList = issuesList.filter((issue: any) => issue.state === 'open' && !issue.assignee);
            state.inProgressList = issuesList.filter((issue: any) => issue.state === 'open' && issue.assignee);
            state.doneList = issuesList.filter((issue: any) => issue.state === 'closed');
            console.log('doneList', state.doneList);
        }
    }
});

export const { addTodo, updateList, clearLists, loadIssues } = listsSlice.actions;
export default listsSlice.reducer;