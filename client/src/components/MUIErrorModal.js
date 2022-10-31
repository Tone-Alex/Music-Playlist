
import { useContext, useState } from 'react';
import AuthContext from '../auth';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import { AlertTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/HighlightOff';

const style = {
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '500',
    bgcolor: 'lightyellow',
    boxShadow: 24,
    p: 0
};

export default function MUIErrorModal() {
    const { auth } = useContext(AuthContext);

    return (
        <Modal open={auth.errorMessage !== ""}>

            <Box sx={style}>
                <Alert
                sx={{fontSize: 20, fontWeight: 'bold'}}
                variant='outlined'
                severity='warning' 
                action={
                <Button
                sx={{padding: 4, color: 'black'}}
                onClick={() => {
                    auth.setErrorMessage("");
                }}
                ><CloseIcon sx={{fontSize: 30}}/></Button>}
                >
                    <AlertTitle sx={{fontWeight: 'bold'}}>Sorry</AlertTitle>
                    {auth.errorMessage}
                </Alert>
            </Box>

        </Modal>

    );

}