import { useContext, useState } from 'react';
import GlobalStoreContext from "../store";
import AuthContext from '../auth';
import { List } from "@mui/material";
import TextField from '@mui/material/TextField';
import CommentCard from './CommentCard.js'


export default function PlaylistComments() {

    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [comment, setComment] = useState("");

    function handleChange(event) {
        setComment(event.target.value);
    }

    function handleKeyPress(event) {
        if (event.code == "Enter") {
            //add comment to playlist
            //check for empty comment as well
            if (comment !== "") {
                store.addComment(auth.user.username, comment);  //send the logged in user's username along with comment to add
                setComment("");
            }
        }

    }

    function handleBlur(event) {
        setComment("");
    }

    let commentCard = "";
    if (store.currentPlayingPlaylist) {
          commentCard = 
              <List sx={{ width: '90%', left: '5%' }}>
              {
                  store.currentPlayingPlaylist.comments.map((comment, index) => (
                      <CommentCard
                          key={index}
                          user={comment.user}
                          message={comment.message}
                      />
                  ))
              }
              </List>;
      }

    
      return (
        <div id="playlist-comments">
            <div id="comment-selector-list">
                {
                    commentCard
                }
            </div>
            <div className="comment-input-bar">
                <TextField
                        margin="normal"
                        fullWidth
                        id="comment-input"
                        label="Add Comment"
                        name="searchKeyword"
                        value={comment}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        onBlur={handleBlur}
                        disabled={!auth.loggedIn}
                    />
            </div>
        </div>

      )




}