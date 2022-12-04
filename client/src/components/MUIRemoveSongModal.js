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

export default function MUIRemoveSongModal() {
    const { store } = useContext(GlobalStoreContext);

    function handleConfirmRemoveSong (event) {
        event.stopPropagation(true);
        store.addRemoveSongTransaction();
    }

    function handleCancelRemoveSong (event) {
        event.stopPropagation(true);
        store.hideModals();
    }
    
    let modalClass = "modal";
    if (store.isRemoveSongModalOpen()) {
        modalClass += " is-visible";
    }
    let songTitle = "";
    if (store.currentSong) {
        songTitle = store.currentSong.title;
    }

    return (
        <Modal
            open={store.currentModal === "REMOVE_SONG"}
        >
            <Box sx={style}>
            <div
        id="remove-song-modal"
        className={modalClass}
        data-animation="slideInOutLeft">
        <div className="modal-dialog" id='verify-remove-song-root'>
            <div className="modal-header">
                Remove {songTitle}?
            </div>
            <div className="modal-close">
                <div className="dialog-header">
                    Are you sure you wish to permanently remove <em><strong> {songTitle} </strong></em>from the playlist?
                </div>
            </div>
            <div id='confirm-cancel-container' className="modal-south">
                <input type="button" 
                    id="remove-song-confirm-button" 
                    className="modal-button" 
                    onClick={handleConfirmRemoveSong} 
                    value='Confirm' />
                <input 
                    type="button" 
                    id="remove-song-cancel-button" 
                    className="modal-button" 
                    onClick={handleCancelRemoveSong} 
                    value='Cancel' />
            </div>
        </div>
    </div>
            </Box>
        </Modal>
    );
}