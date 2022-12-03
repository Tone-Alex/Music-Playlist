import { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import { GlobalStoreContext } from '../store'
import Button from '@mui/material/Button';
import RedoIcon from '@mui/icons-material/Redo';
import UndoIcon from '@mui/icons-material/Undo';

/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    function handleUndo(event) {
        event.stopPropagation(true);
        store.undo();
    }
    function handleRedo(event) {
        event.stopPropagation(true);
        store.redo();
    }
    
    function handlePublishList(event) {
        event.stopPropagation(true);
        store.publishPlaylist(store.currentList._id);
    }

    function handleDeleteList(event) {
        event.stopPropagation(true);
        store.markListForDeletion(store.currentList._id);
    }

    function handleDuplicateList(event) {
        event.stopPropagation(true);
        store.duplicatePlaylist(store.currentList._id);
    }

    let visible = "";
    if (store.currentList && !store.currentList.published) {
        visible = "visible"
    } else {
        visible = "hidden"
    }

    return (
        <div id="edit-toolbar">
            <div className="edit-toolbar-buttons">
                <Button
                    sx={{visibility: visible}} 
                    disabled={!store.canUndo()}
                    id='undo-button'
                    onClick={handleUndo}
                    variant="contained">
                        <UndoIcon />
                </Button>
                <Button
                    sx={{visibility: visible}} 
                    disabled={!store.canRedo()}
                    id='redo-button'
                    onClick={handleRedo}
                    variant="contained">
                        <RedoIcon />
                </Button>
            </div>
            <div className='edit-toolbar-buttons'>
                <Button
                    sx={{visibility: visible}}
                    disabled={!store.currentList}
                    id='publish-playlist-button'
                    onClick={handlePublishList}
                    variant="contained">
                        Publish
                </Button>
                <Button
                    disabled={!store.currentList}
                    style={{visibility: store.currentScreen === "HOME" ? "visible" : "hidden"}}
                    id='delete-playlist-button'
                    onClick={handleDeleteList}
                    variant="contained">
                        Delete
                </Button>
                <Button 
                    disabled={!store.currentList}
                    id='duplicate-playlist-button'
                    onClick={handleDuplicateList}
                    variant="contained">
                        Duplicate
                </Button>
            </div>
        </div>
    )
}

export default EditToolbar;