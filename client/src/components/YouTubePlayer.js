
import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import { AppBar, Toolbar } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FastRewind from '@mui/icons-material/FastRewind';
import Stop from '@mui/icons-material/Stop';
import PlayArrow from '@mui/icons-material/PlayArrow';
import FastForward from '@mui/icons-material/FastForward';
import React from 'react';
import YouTube from 'react-youtube';

export default function YouTubePlayer() {
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT

    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);

    const [player, setPlayer] = useState();

    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [];
    let currentPlayingPlaylist = store.currentPlayingPlaylist;
    let currentSong = 0;
    let currentPlayingSong = "";
    if (currentPlayingPlaylist) {
        playlist = currentPlayingPlaylist.songs.map((song) => (
            song.youTubeId
        ))
        currentPlayingSong = store.currentPlayingSong;
        currentSong = currentPlayingPlaylist.songs.indexOf(currentPlayingSong);
    }

    const playerOptions = {
        height: '300',
        width: '100%',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        setPlayer(player);
        if (currentPlayingSong) {
            let song = currentPlayingSong.youTubeId;
            player.loadVideoById(song);
            player.playVideo();
        }
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
    }

    function decSong() {
        currentSong--;
        currentSong = currentSong % playlist.length;
    }

    function onPlayerReady(event) {
        setPlayer(event.target);
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
    }

    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(event) {
        let playerStatus = event.data;
        let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            handleFastForward();
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    //RERENDER THE COMPONENTS TO REFLECT THE CHANGES
    function handleFastRewind() {
        decSong();
        let newSong = currentPlayingPlaylist.songs.find(song => song.youTubeId === playlist[currentSong]);
        store.setCurrentPlayingSong(newSong);

    }

    function handleFastForward() {
        incSong();
        let newSong = currentPlayingPlaylist.songs.find(song => song.youTubeId === playlist[currentSong]);
        store.setCurrentPlayingSong(newSong);
    }

    let songPlayer = "";
    if (currentPlayingSong) {
        songPlayer = <YouTube
            videoId={currentPlayingSong.youTubeId}
            opts={playerOptions}
            onReady={onPlayerReady}
            onStateChange={onPlayerStateChange}
            />
    }

    return (
        <div>
            {songPlayer}

            <div id="playing-song-container">
                <h4 style={{textAlign: 'center', padding: 0, margin: 0}}>Now Playing</h4>
                <p>Playlist: {currentPlayingPlaylist ? currentPlayingPlaylist.name : ""}</p> 
                <p>Song #: {currentPlayingSong ? currentSong + 1 : ""}</p>
                <p>Title: {currentPlayingSong ? currentPlayingSong.title : ""}</p>
                <p>Artist: {currentPlayingSong ? currentPlayingSong.artist : "" }</p>

                <div>
                    <AppBar position='static' id="play-song-options" sx={{visibility: currentPlayingPlaylist ? "visible" : "hidden"}}>
                        <Toolbar className='song-control-bar'>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <IconButton
                                    aria-label="Logged-in user Playlists"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={handleFastRewind}
                                >
                                    <FastRewind fontSize='large' />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <IconButton
                                    aria-label="Logged-in user Playlists"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={() => player.pauseVideo()}
                                >
                                    <Stop fontSize='large' />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <IconButton
                                    aria-label="Logged-in user Playlists"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={() => player.playVideo()}
                                >
                                    <PlayArrow fontSize='large' />
                                </IconButton>
                            </Box>
                            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                                <IconButton
                                    aria-label="Logged-in user Playlists"
                                    aria-haspopup="true"
                                    color="inherit"
                                    onClick={handleFastForward}
                                >
                                    <FastForward fontSize='large' />
                                </IconButton>
                            </Box>
                        </Toolbar>
                    </AppBar>
                </div>

            </div>

        </div>
        
        );

}

