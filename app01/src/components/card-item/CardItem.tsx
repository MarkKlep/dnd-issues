import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Card, CardContent, Typography } from '@mui/material';
import styles from './CardItem.module.css';

type item = {
    issue: any,
    index: number
}

const CardItem: React.FC<item> = ({ issue, index }) => {
  return (
    <Draggable key={issue.id} draggableId={String(issue.id)} index={index} >
    {
        (provided => (
            <Card
                className={styles.cardWrapper}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                <CardContent>
                    <Typography variant="h6" component="div">
                        Title: {issue.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div">
                        User: {issue.user.login}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="div">
                        Comments: {issue.comments}
                    </Typography>
                </CardContent>
            </Card>

        ))
    }
</Draggable>
  );
}

export default CardItem;
