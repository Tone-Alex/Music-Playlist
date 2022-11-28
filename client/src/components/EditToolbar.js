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

    function handleAddNewSong() {
        store.addNewSong();
    }
    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    
    function handleDeleteList() {
        store.markListForDeletion(store.currentList._id);
    }


    return (
        <div id="edit-toolbar">
            <div className="edit-toolbar-buttons">
                <Button 
                    disabled={!store.canUndo()}
                    id='undo-button'
                    onClick={handleUndo}
                    variant="contained">
                        <UndoIcon />
                </Button>
                <Button 
                    disabled={!store.canRedo()}
                    id='redo-button'
                    onClick={handleRedo}
                    variant="contained">
                        <RedoIcon />
                </Button>
            </div>
            <div className='edit-toolbar-buttons'>
                <Button
                    disabled={!store.currentList}
                    id='publish-playlist-button'
                    variant="contained">
                        Publish
                </Button>
                <Button
                    disabled={!store.currentList}
                    id='delete-playlist-button'
                    onClick={handleDeleteList}
                    variant="contained">
                        Delete
                </Button>
                <Button 
                    disabled={!store.currentList}
                    id='duplicate-playlist-button'
                    variant="contained">
                        Duplicate
                </Button>
            </div>
        </div>
    )
}

export default EditToolbar;