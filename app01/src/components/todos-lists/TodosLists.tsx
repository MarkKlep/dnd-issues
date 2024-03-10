import React, { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import TodoList from '../todo-list/TodoList';
import { DropResult } from 'react-beautiful-dnd';
import { useSelector, useDispatch } from 'react-redux';
import { updateList } from '../../store/listsSlice';
import type { todo } from '../../store/listsSlice';
import styles from './TodoLists.module.css';



const TodosLists: React.FC = () => {

    const todoList = useSelector((state: any) => state.lists.todoList);
    const inProgressList = useSelector((state: any) => state.lists.inProgressList);
    const doneList = useSelector((state: any) => state.lists.doneList);
    console.log(todoList);

    const dispatch = useDispatch();

    useEffect(() => {
        const storedData = {
            todoList: JSON.parse(sessionStorage.getItem('ToDo') || '[]'),
            inProgressList: JSON.parse(sessionStorage.getItem('InProgress') || '[]'),
            doneList: JSON.parse(sessionStorage.getItem('Done') || '[]'),
        };

        dispatch(updateList({ listType: 'ToDo', updatedList: storedData.todoList }));
        dispatch(updateList({ listType: 'InProgress', updatedList: storedData.inProgressList }));
        dispatch(updateList({ listType: 'Done', updatedList: storedData.doneList }));
    }, [dispatch]);

    useEffect(() => {
        sessionStorage.setItem('ToDo', JSON.stringify(todoList));
    }, [todoList]);

    useEffect(() => {
        sessionStorage.setItem('InProgress', JSON.stringify(inProgressList));
    }, [inProgressList]);

    useEffect(() => {
        sessionStorage.setItem('Done', JSON.stringify(doneList));
    }, [doneList]);

    const getList = (droppableId: string): todo[] => {

        if (droppableId === 'ToDo') {
            return todoList;
        }

        else if (droppableId === 'InProgress') {
            return inProgressList;
        }

        else {
            return doneList;
        }
    }

    const handleDragEnd = (res: DropResult): void => {
        const { source, destination } = res;
        //console.log(res);

        if (!destination) return;

        const sourceList = getList(source.droppableId);
        const destList = getList(destination.droppableId);

        //drag within the same column
        if (source.droppableId === destination.droppableId) {
            if (source.index !== destination.index) {
                const updatedList = [...sourceList];
                const [item] = updatedList.splice(source.index, 1);
                updatedList.splice(destination.index, 0, item);

                const listType = source.droppableId;
                dispatch(updateList({ listType, updatedList }));
            }
        }

        //drag between different columns
        if (source.droppableId !== destination.droppableId) {
            const updatedSourceList = [...sourceList];
            const [item] = updatedSourceList.splice(source.index, 1);

            const updatedDestList = [...destList];
            updatedDestList.splice(destination.index, 0, item);

            dispatch(updateList({ listType: source.droppableId, updatedList: updatedSourceList }));
            dispatch(updateList({ listType: destination.droppableId, updatedList: updatedDestList }));
        }
    };


    return (
        <div className={styles.container} >
            <DragDropContext onDragEnd={handleDragEnd}>
                <div >
                    <p className={styles.header}> ToDo </p>
                    <TodoList issuesList={todoList} droppableField='ToDo' />
                </div>

                <div  >
                    <p className={styles.header}> InProgress </p>
                    <TodoList issuesList={inProgressList} droppableField='InProgress' />
                </div>

                <div  >
                    <p className={styles.header}> Done </p>
                    <TodoList issuesList={doneList} droppableField='Done' />
                </div>
            </DragDropContext>
        </div>
    );
}

export default TodosLists;