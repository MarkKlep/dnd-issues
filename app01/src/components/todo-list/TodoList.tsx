import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styles from './TodoList.module.css';
import type { todo } from '../../store/listsSlice';
import CardItem from '../card-item/CardItem';

type list = {
    issuesList: any[],
    droppableField: string
}

const TodoList: React.FC<list> = (props) => {

    const { issuesList, droppableField } = props;

    return (
        <Droppable droppableId={droppableField} >
            {
                (provided) => (
                    <div
                        className={styles.tasks}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {
                            issuesList.map((issue: any, index: number) => (
                                <CardItem issue={issue} index={index} />
                            ))
                        }
                        {provided.placeholder}
                    </div>
                )
            }
        </Droppable>
    );
}
{/* <Chip label={todo.text} sx={{ marginTop: '30px', padding: '40px' }} /> */ }
export default TodoList;