import { ListItem, Typography, Box } from "@mui/material";


export default function CommentCard(props) {

    const {user, message} = props

    return (
        <ListItem
            sx={{ marginTop: '15px', p: 1, backgroundColor: '#e1e4cb'}}
            style={{ width: '100%', fontSize: '16pt', borderRadius: '10px'}}
        >
            <div className="comment-card">
                <Box>
                    {/* ADD THIS AS A LINK??? WITH TEXT DECORATION */}
                    <Typography>{user}</Typography>     
                </Box>
                <Box>
                    <Typography>{message}</Typography>
                </Box>
            </div>

        </ListItem>
    )

}