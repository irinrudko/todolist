import { Box, Fab, Modal, Typography } from '@mui/material';
import * as React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { AddItemForm } from './AddItemForm';
import { makeStyles } from '@mui/styles';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { addTodolistTC } from './state/reducers/todolist-reducer';

const useStyles = makeStyles({
    addButton: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
});

const style = {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 200,
    bgcolor: 'background.paper',
    border: '2px solid #1976d2',
    boxShadow: 24,
    p: 1,
};

export const AddNewTodolist = React.memo((props) => {
    const dispatch = useDispatch();
    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => setOpen(false);

    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistTC(title))
        handleClose()
    }, [dispatch])

    return (
        <>
            <div className={classes.addButton}>
                <Fab color="primary" aria-label="add"
                    onClick={handleOpen}>
                    <AddIcon />
                </Fab>
            </div>
            <div>
                <Modal
                    disableEnforceFocus={false}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="create-new-todolist"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            Add a new Todolist:
                        </Typography>
                        <AddItemForm addItem={addTodolist} />
                    </Box>
                </Modal>
            </div>
        </>
    )
})