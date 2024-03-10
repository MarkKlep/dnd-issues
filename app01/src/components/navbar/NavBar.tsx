import { useState, useEffect, useRef } from 'react';
import { TextField, Button, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../store/listsSlice';
import SearchGitHubUser from '../search-github-user/SearchGitHubUser';

type props = {
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const NavBar: React.FC<props> = ({ setOpenDialog }) => {
    const [inputText, setInputText] = useState<string>('');

    const [serchUser, setSerchUser] = useState<boolean>(false);

    const TextFieldRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (TextFieldRef.current !== null) {
            TextFieldRef.current.focus();
        }
    }, []);

    const dispatch = useDispatch();

    const handleInputText = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInputText(e.target.value);
    }

    const handleAddTodo = (): void => {
        if (inputText.trim().length > 0) {
            dispatch(addTodo({ inputText }));
        }

        setInputText('');
    }

    const handlePressEnter = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    }

    const handleClearAllIssues = (): void => {
        setOpenDialog(true);
    }

    const handleToggleSearchUser = (): void => {
        setSerchUser(!serchUser);
    }

    return (
        <Stack direction='row' spacing={5} alignItems='center'
            sx={{
                padding: '1.5rem',
                backgroundColor: '#f0f0f0',
                color: 'white',
            }} >
            <TextField
                variant='outlined'
                placeholder='Create issue by yourself...'
                value={inputText}
                onChange={handleInputText}
                onKeyDown={handlePressEnter}
                inputRef={TextFieldRef}
            />

            <Button
                onClick={handleAddTodo}
                variant='contained'
                color="primary"
            >
                Add your todo
            </Button>

            <Button
                // startIcon={<DeleteIcon/>}
                variant='contained'
                onClick={handleClearAllIssues}
            >
                Clear all issues
            </Button>

            <Button 
                onClick={handleToggleSearchUser} 
                variant='outlined' 
            >
                Search user on github
            </Button>

            {serchUser && <SearchGitHubUser/>}
        </Stack>
    );
}

export default NavBar;