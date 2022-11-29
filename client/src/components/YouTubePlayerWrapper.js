import { useContext, useState } from 'react';
import GlobalStoreContext from "../store";
import YouTubePlayer from "./YouTubePlayer";
import PlaylistComments from "./PlaylistComments";
import Box from '@mui/material/Box';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

export default function YouTubePlayerWrapper() {

  const { store } = useContext(GlobalStoreContext);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div id="YouTube-player-wrapper">
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="YouTube Player Tabs">
                    <Tab label="Player" />
                    <Tab label="Comments" />
                </Tabs>
                <Box sx={{ padding: 1 }}>
                    {value === 0 && (
                    <Box>
                        <YouTubePlayer />
                    </Box>
                    )}
                    {value === 1 && (
                    <Box>
                        <PlaylistComments />
                    </Box>
                    )}
                </Box>
            </Box>
        </Box>
    </div>
  );


    // return (
    //     <YouTubePlayer />       //div with id YouTube-player already in youtube player component with position absolute
    // );


}