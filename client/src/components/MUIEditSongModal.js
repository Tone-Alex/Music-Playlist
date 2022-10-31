import { useContext, useState } from 'react'
import GlobalStoreContext from '../store';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 0,
};

export default function MUIEditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    const [ title, setTitle ] = useState(store.currentSong.title);
    const [ artist, setArtist ] = useState(store.currentSong.artist);
    const [ youTubeId, setYouTubeId ] = useState(store.currentSong.youTubeId);

    function handleConfirmEditSong() {

        let songTitle = title;
        let songArtist = artist;
        let songId = youTubeId;

        if (songTitle === "") {
            songTitle = "Untitled";
        }
        if (songArtist === "") {
            songArtist = "Unknown";
        }
        if (songId === "") {
            songId = "dQw4w9WgXcQ"
        }

        let newSongData = {
            title: songTitle,
            artist: songArtist,
            youTubeId: songId
        };
        store.addUpdateSongTransaction(store.currentSongIndex, newSongData);        
    }

    function handleCancelEditSong() {
        store.hideModals();
    }

    function handleUpdateTitle(event) {
        setTitle(event.target.value);
    }

    function handleUpdateArtist(event) {
        setArtist(event.target.value);
    }

    function handleUpdateYouTubeId(event) {
        setYouTubeId(event.target.value);
    }

    return (
        <Modal
            open={store.currentModal === "EDIT_SONG"}
        >
            <Box sx={style}>
            <div
            id="edit-song-modal"
            className="song-modal is-visible"
            data-animation="slideInOutLeft">
            <div
                id='edit-song-root'
                className="song-modal-root">
                <div
                    id="edit-song-modal-header"
                    className="song-modal-north">Edit Song</div>
                <div
                    id="edit-song-modal-content"
                    className="song-modal-center">
                    <div id="title-prompt" className="modal-prompt">Title:
                    <input 
                        id="edit-song-modal-title-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={title} 
                        onChange={handleUpdateTitle} />
                    </div>
                    <div id="artist-prompt" className="modal-prompt">Artist:
                    <input 
                        id="edit-song-modal-artist-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={artist} 
                        onChange={handleUpdateArtist} />
                    </div>
                    <div id="you-tube-id-prompt" className="modal-prompt">YouTube Id:
                    <input 
                        id="edit-song-modal-youTubeId-textfield" 
                        className='modal-textfield' 
                        type="text" 
                        defaultValue={youTubeId} 
                        onChange={handleUpdateYouTubeId} />
                    </div>
                </div>
                <div className="song-modal-south">
                    <input 
                        type="button" 
                        id="edit-song-confirm-button" 
                        className="song-modal-button" 
                        value='Confirm' 
                        onClick={handleConfirmEditSong} />
                    <input 
                        type="button" 
                        id="edit-song-cancel-button" 
                        className="song-modal-button" 
                        value='Cancel' 
                        onClick={handleCancelEditSong} />
                </div>
            </div>
        </div>
            </Box>
        </Modal>
    );
}