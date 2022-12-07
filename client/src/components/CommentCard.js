import { ListItem, Typography, Box } from "@mui/material";
import { useContext } from "react";
import GlobalStoreContext from "../store";


export default function CommentCard(props) {

    const { store } = useContext(GlobalStoreContext);
    const {user, message} = props

    function handleUserClick(event) {
        console.log("USER: " + user);
        event.stopPropagation(true);
        store.loadUserPlaylists(user);
    }

    return (
        <ListItem
            sx={{ marginTop: '15px', p: 1, backgroundColor: '#e1e4cb'}}
            style={{ width: '100%', fontSize: '16pt', borderRadius: '10px'}}
        >
            <div className="comment-card">
                <Box>
                    {/* <Typography>{user}</Typography>      */}
                    <Typography onClick={handleUserClick}> 
                    <span style={{cursor: 'pointer', color: 'blue', textDecoration: 'underline', fontWeight: 'bold'}}>
                            {user}</span>
                    </Typography>
                </Box>
                <Box>
                    <Typography>{message}</Typography>
                </Box>
            </div>

        </ListItem>
    )

}