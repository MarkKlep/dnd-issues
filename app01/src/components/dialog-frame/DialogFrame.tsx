import React from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { clearLists } from '../../store/listsSlice';

type props = {
    openDialog: boolean,
    setOpenDialog: React.Dispatch<React.SetStateAction<boolean>>
}

const DialogFrame: React.FC<props> = ({ openDialog, setOpenDialog }) => {
    const dispatch = useDispatch();

    const handleConfirmToClear = (): void => {
        sessionStorage.clear();
        dispatch(clearLists());
        setOpenDialog(false);
    }

    const handleCloseDialog = (): void => {
        setOpenDialog(false);
    }

    return (
        <Dialog open={openDialog} maxWidth="sm" fullWidth >
            <DialogTitle>
                Clear all columns
                <IconButton
                    aria-label="close"
                    onClick={handleCloseDialog}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                    }}
                >
                    <ClearIcon />
                </IconButton>
            </DialogTitle>

            <DialogContent>
                Make sure to continue
            </DialogContent>

            <DialogActions>
                <Button
                    variant='contained'
                    onClick={handleConfirmToClear}
                >
                    Clear all issues
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default DialogFrame;