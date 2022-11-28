import { Dialog, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import { useContext, useState } from "react";
import GlobalStoreContext from "../store";


export default function MUIErrorPopup() {

    const { store } = useContext(GlobalStoreContext);

    const handleClose = () => {
        console.log("DIALOG CLOSED");
        // store.setIsListNameEditActive(true);
        store.hideModals();
    }

    return (
        <Dialog onClose={handleClose} open={store.currentModal === "ERROR_MODAL"}>
            <DialogTitle>Invalid Name</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    A playlist with that name already exists.
                </DialogContentText>
            </DialogContent>
        </Dialog>

    )

}