import { useContext } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    boxShadow: 24,
    p: 0,
};

export default function MUIDeleteModal() {
    const { store } = useContext(GlobalStoreContext);
    let name = "";
    if (store.listMarkedForDeletion) {
        name = store.listMarkedForDeletion.name;
    }
    function handleDeleteList(event) {
        event.stopPropagation(true);
        store.deleteMarkedList();
    }
    function handleCloseModal(event) {
        // store.unmarkListForDeletion();
        event.stopPropagation(true);
        store.hideModals();
    }

    return (
        <Modal
            open={store.listMarkedForDeletion !== null}
        >
            <Box sx={style}>
                <div className="modal-dialog">
                    <header className="modal-header">
                        Delete the {name} Playlist?
                    </header>
                    <div className="modal-close">
                        <div className="dialog-header">
                            Are you sure you wish to permanently delete the <em><strong>{name}</strong></em> playlist?
                        </div>
                    </div>
                    <div id="confirm-cancel-container">
                        <button
                            id="dialog-yes-button"
                            className="modal-button"
                            onClick={handleDeleteList}
                        >Confirm</button>
                        <button
                            id="dialog-no-button"
                            className="modal-button"
                            onClick={handleCloseModal}
                        >Cancel</button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}