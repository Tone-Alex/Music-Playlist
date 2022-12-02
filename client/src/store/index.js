import { createContext, useContext, useState } from 'react'
import { useHistory} from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
import { fabClasses } from '@mui/material'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    SET_CURRENT_SCREEN: "SET_CURRENT_SCREEN",
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    DUPLICATE_LIST: "DUPLICATE_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    LOAD_CURRENT_PLAYLISTS: "LOAD_CURRENT_PLAYLISTS",
    SET_CURRENT_PLAYLING_PLAYLIST: "SET_CURRENT_PLAYING_PLAYLIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    ERROR_MODAL: "ERROR_MODAL",
    HIDE_MODALS: "HIDE_MODALS"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG",
    ERROR_MODAL : "ERROR_MODAL"
}

const CurrentScreen = {
    HOME: "HOME",
    ALL_LISTS: "ALL_LISTS",
    USER: "USER"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentScreen: "HOME",
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentPlaylists: [],
        currentList: null,
        currentPlayingPlaylist: null,
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case GlobalStoreActionType.SET_CURRENT_SCREEN: {
                return setStore({
                    currentScreen: payload.screen,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentPlaylists: payload.playlists,
                    currentList: null,
                    currentPlayingPlaylist: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentScreen: store.currentScreen,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentPlaylists: payload.playlists,
                    // currentList: payload.playlist,
                    currentList: null,
                    currentPlayingPlaylist: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentScreen: store.currentScreen,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentPlaylists: store.currentPlaylists,
                    currentList: null,
                    currentPlayingPlaylist: store.currentPlayingPlaylist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentScreen: store.currentScreen,
                    currentModal : CurrentModal.NONE,
                    // idNamePairs: store.idNamePairs,
                    idNamePairs: store.idNamePairs,
                    currentPlaylists: payload.newCurrentPlaylists,
                    currentList: payload.newList,
                    currentPlayingPlaylist: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: payload.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                })
            }
            case GlobalStoreActionType.DUPLICATE_LIST: {                
                return setStore({
                    currentScreen: store.currentScreen,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentPlaylists: payload.newCurrentPlaylists,
                    currentList: store.currentList,
                    currentPlayingPlaylist: store.currentPlayingPlaylist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentScreen: store.currentScreen,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentPlaylists: store.currentPlaylists,
                    currentList: null,
                    currentPlayingPlaylist: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // GET ALL THE PLAYLISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_CURRENT_PLAYLISTS: {
                return setStore({
                    currentScreen: store.currentScreen,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentPlaylists: payload,
                    currentList: store.currentList,
                    currentPlayingPlaylist: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
             // SET THE PLAYLIST THAT SHOULD BE PLAYING IN THE YOUTUBE PLAYER
            case GlobalStoreActionType.SET_CURRENT_PLAYLING_PLAYLIST: {
                return setStore({
                    currentScreen: store.currentScreen,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentPlaylists: store.currentPlaylists,
                    currentList: store.currentList,
                    currentPlayingPlaylist: payload,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentScreen: store.currentScreen,
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentPlaylists: store.currentPlaylists,
                    currentList: store.currentList,
                    currentPlayingPlaylist: store.currentPlayingPlaylist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentScreen: store.currentScreen,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentPlaylists: store.currentPlaylists,
                    currentList: payload,
                    currentPlayingPlaylist: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentScreen: store.currentScreen,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentPlaylists: store.currentPlaylists,
                    currentList: store.currentList,
                    currentPlayingPlaylist: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: payload,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentScreen: store.currentScreen,
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentPlaylists: store.currentPlaylists,
                    currentList: store.currentList,
                    currentPlayingPlaylist: store.currentPlayingPlaylist,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentScreen: store.currentScreen,
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentPlaylists: store.currentPlaylists,
                    currentList: store.currentList,
                    currentPlayingPlaylist: store.currentPlayingPlaylist,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            case GlobalStoreActionType.ERROR_MODAL: {
                return setStore({
                    currentScreen: store.currentScreen,
                    currentModal : CurrentModal.ERROR_MODAL,
                    idNamePairs: store.idNamePairs,
                    currentPlaylists: store.currentPlaylists,
                    currentList: store.currentList,
                    currentPlayingPlaylist: null,
                    currentSongIndex: store.currentSongIndex,
                    currentSong: store.currentSong,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentScreen: store.currentScreen,
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentPlaylists: store.currentPlaylists,
                    currentList: store.currentList,
                    currentPlayingPlaylist: store.currentPlayingPlaylist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    store.setScreen = function (screenType) {
        async function asyncSetScreen() {
            if (screenType === CurrentScreen.HOME) {
                let response = await api.getPlaylists();
                if (response.data.success) {
                    let playlistArray = response.data.playlists;
                    playlistArray.sort((first, second) => {
                        return first.name.localeCompare(second.name);
                    });
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_SCREEN,
                        payload: {
                            screen: CurrentScreen.HOME,
                            playlists: playlistArray
                        }
                    });
                }
            }
            if (screenType === CurrentScreen.ALL_LISTS) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_SCREEN,
                    payload: {
                        screen: CurrentScreen.ALL_LISTS,
                        playlists: []
                    }
                });
            }
            if (screenType === CurrentScreen.USER) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_SCREEN,
                    payload: {
                        screen: CurrentScreen.USER,
                        playlists: []
                    }
                });
            }
        }
        asyncSetScreen();

    }

    store.verifyName = async function (newName) {
        let response = await api.getPlaylistPairs();
        if (response.data.success) {
            let playlistPairs = response.data.idNamePairs;
            let samePlaylistNames = playlistPairs.filter((pair) => {
                return pair.name === newName
            });
            if (samePlaylistNames.length > 0) {
                return false;
            } else {
                return true;
            }
        }
    }

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getPlaylists(playlist) {
                            response = await api.getPlaylists();
                            if (response.data.success) {
                                let playlistArray = response.data.playlists;
                                playlistArray.sort((first, second) => {
                                    return first.name.localeCompare(second.name);
                                });
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        playlists: playlistArray,
                                        // playlist: playlist
                                    }
                                });
                            }
                        }
                        getPlaylists(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {

        // USED TO PROPERLY INCREMENT THE NEW LIST COUNTER BASED ON HOW MANY 'UNTITLED' PLAYLISTS CURRENTLY EXIST
        // RETRIEVE THE PLAYLISTS BY USER!!!!
        let counter = 0;
        try {
            const allPlaylists = await api.getPlaylistPairs();
            if (allPlaylists.status === 200) {
                allPlaylists.data.idNamePairs.forEach(pair => {
                    if (pair.name.startsWith("Untitled")) {
                        counter += 1;
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }

        //verify the new list name
        let newListName = "Untitled" + counter;
        let nameVerified = await store.verifyName(newListName);
        while (!nameVerified) {
            counter += 1;
            newListName = "Untitled" + counter;
            nameVerified = await store.verifyName(newListName);
        }

        console.log("LIST FOR USERNAME: " + auth.user.username);
        const response = await api.createPlaylist(newListName, [], auth.user.username, auth.user.email);
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            console.log("NEW LIST CREATED: " + JSON.stringify(newList));
            console.log("ID NAME PAIRS: " + JSON.stringify(store.idNamePairs));

            let newPlaylists = store.currentPlaylists;
            newPlaylists.push(newList);
            newPlaylists.sort((first, second) => {
                return first.name.localeCompare(second.name);
            });

            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: {newList: newList, newListCounter: counter, newCurrentPlaylists: newPlaylists}
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            // history.push("/playlist/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                console.log("ID PAIRS RECEIVED");
                let pairsArray = response.data.idNamePairs;
                pairsArray.sort((first, second) => {
                    return first.name.localeCompare(second.name);
                });
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.loadAllPlaylists = function () {
        async function asyncLoadAllPlaylists() {
            const response = await api.getPlaylists();
            if (response.data.success) {
                console.log("PLAYLISTS RECEIVED");
                let playlistArray = response.data.playlists;
                console.log("PLAYLISTS: " + JSON.stringify(playlistArray));
                playlistArray.sort((first, second) => {
                    return first.name.localeCompare(second.name);
                });
                storeReducer({
                    type: GlobalStoreActionType.LOAD_CURRENT_PLAYLISTS,
                    payload: playlistArray
                });
            } else {
                console.log("API FAILED TO GET PLAYLISTS");
            }
        }
        asyncLoadAllPlaylists();
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        console.log("DELETE ID: " + id);
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }
    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id);
            if (response.data.success) {
                // store.loadIdNamePairs();
                store.loadAllPlaylists();
                history.push("/");
            } else {
                console.log("FAILED TO RECEIVE SUCCESS ");
            }
        }
        processDelete(id);
    }
    store.deleteMarkedList = function() {
        store.deleteList(store.listIdMarkedForDeletion);
        store.hideModals();
    }

    store.publishPlaylist = function (id) {        
        async function asyncPublishPlaylist() {
            let list = store.currentList;
            list.published = true;
            list.publishedDate = new Date();
            let response = await api.updatePlaylistById(store.currentList._id, list);
            if (response.data.success) {
                store.loadAllPlaylists();
            }
        }
        asyncPublishPlaylist();

    }

    store.duplicatePlaylist = function (id) {
        async function asyncDuplicatePlaylist() {
            // to find the right playlist, find the playlist by username, then update it
            let response = await api.getPlaylistsByUser(store.currentList.username);
            if (response.data.success) {
                let playlistArray = response.data.playlists;
                let playlist = playlistArray.find(list => list._id === id);
                if (playlist) {
                    let newPlaylistName = playlist.name;
                    let nameVerified = await store.verifyName(newPlaylistName);
                    let counter = 0;
                    while (!nameVerified) {
                        counter += 1;
                        newPlaylistName = playlist.name + '(' + counter + ')';          
                        nameVerified = await store.verifyName(newPlaylistName);
                    }

                    response = await api.createPlaylist(newPlaylistName, playlist.songs, auth.user.username, auth.user.email);
                    if (response.status === 201) {
                        tps.clearAllTransactions();
                        let newList = response.data.playlist;

                        let newPlaylists = store.currentPlaylists;
                        newPlaylists.push(newList);
                        //NEED TO CHANGE THIS BY SORTING BASED ON CURRENT SORT METHOD
                        newPlaylists.sort((first, second) => {
                            return first.name.localeCompare(second.name);
                        });
                        storeReducer({
                            type: GlobalStoreActionType.DUPLICATE_LIST,
                            payload: {newCurrentPlaylists: newPlaylists}
                        }
                        );
                    }
                    else {
                        console.log("API FAILED TO CREATE A NEW LIST");
                    }
                }
            }
        }
        asyncDuplicatePlaylist();

    }

    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST
    store.showEditSongModal = (songIndex, songToEdit) => {
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }

    store.showNameErrorModal = function() {
        storeReducer({
            type: GlobalStoreActionType.ERROR_MODAL,
            payload: {}
        });
    }

    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    // history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.setCurrentPlayingPlaylist = function (id, username) {
        async function asyncSetCurrentPlayingList(id, user) {
            // let response = await api.getPlaylistById(id);               //USING THIS API CALL DOES NOT ALLOW FOR OTHER USERS PLAYLIST TO LOAD
            let response = await api.getPlaylistsByUser(user);
            if (response.data.success) {
                // let playlist = response.data.playlist;
                let playlistsArray = response.data.playlists;
                let playlist = playlistsArray.find(list => list._id === id);
                if (playlist) {
                    playlist.listens += 1;
                    response = await api.updatePlaylistByUser(user, playlist);
                    if (response.data.success) {
                        storeReducer({
                            type: GlobalStoreActionType.SET_CURRENT_PLAYLING_PLAYLIST,
                            payload: playlist
                        });
                    }
                }

                    // history.push("/playlist/" + playlist._id);
            }
        }
        asyncSetCurrentPlayingList(id, username);
    }

    store.likePlaylist = function (id, username) {
        async function asyncLikePlaylist(id, user) {
            let response = await api.getPlaylistsByUser(user);
            if (response.data.success) {
                let playlistsArray = response.data.playlists;
                let playlist = playlistsArray.find(list => list._id === id);
                console.log("PLAYLIST FOUND: " + JSON.stringify(playlist));
                if (playlist) {
                    playlist.likes += 1;
                    response = await api.updatePlaylistByUser(user, playlist);
                    if (response.data.success) {
                        console.log("UPDATED PLAYLIST: " + response.data.id);
                        store.loadAllPlaylists();
                    }
                }
            }
        }
        asyncLikePlaylist(id, username);
    }
    store.dislikePlaylist = function (id, username) {
        async function asyncLikePlaylist(id, user) {
            let response = await api.getPlaylistsByUser(user);
            if (response.data.success) {
                let playlistsArray = response.data.playlists;
                let playlist = playlistsArray.find(list => list._id === id);
                console.log("PLAYLIST FOUND: " + JSON.stringify(playlist));
                if (playlist) {
                    playlist.dislikes += 1;
                    response = await api.updatePlaylistByUser(user, playlist);
                    if (response.data.success) {
                        console.log("UPDATED PLAYLIST: " + response.data.id);
                        store.loadAllPlaylists();
                    }
                }
            }
        }
        asyncLikePlaylist(id, username);
    }

    store.addComment = function (user, message) {
        async function asyncAddComment() {
            // to find the right playlist, find the playlist by username, then update it
            let response = await api.getPlaylistsByUser(store.currentPlayingPlaylist.username);
            if (response.data.success) {
                let playlistArray = response.data.playlists;
                let playlist = playlistArray.find(list => list._id === store.currentPlayingPlaylist._id);
                if (playlist) {
                    playlist.comments.push({
                        user: user,
                        message: message
                    });
                    response = await api.updatePlaylistByUser(store.currentPlayingPlaylist.username, playlist);
                    if (response.data.success) {
                        store.setCurrentPlayingPlaylist(response.data.id, playlist.username);
                    }
                }
            }
        }
        asyncAddComment();
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };

        if (!(oldSongData.title === newSongData.title && oldSongData.artist === newSongData.artist && 
            oldSongData.youTubeId === newSongData.youTubeId)) {
                let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
                tps.addTransaction(transaction);
            }
        store.hideModals();
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function (value) {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: value
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };