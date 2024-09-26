import React, { useContext, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from '..';
import { Container, Grid, TextField, Button, Avatar } from '@mui/material';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, addDoc, orderBy, query } from 'firebase/firestore';
import Loader from './Loader';

const Chat = () => {
    const { auth, firestore } = useContext(Context);
    const [user] = useAuthState(auth);
    const [value, setValue] = useState('');

    const messagesRef = collection(firestore, 'messages');
    const q = query(messagesRef, orderBy('createdAt'));
    const [messages, loading] = useCollectionData(q);

    const sendMessage = async () => {
        if (value.trim() === '') return;

        await addDoc(messagesRef, {
            text: value,
            createdAt: new Date(),
            displayName: user.displayName,
            uid: user.uid,
            photoURL: user.photoURL,
        });

        setValue('');
    };
    if(loading) {
        return <Loader />
    }

    return (
        <Container>
            <Grid container style={{ height: window.innerHeight - 50 }} alignItems={"center"} justifyContent={"center"}>
                <div style={{ width: "80%", height: "70vh", border: "1px solid silver", overflowY: "auto" }}>
                    {messages && messages.map((msg, index) => (
                        <div key={index} style={{
                            width: "fit-content",
                            margin: "10px",
                            backgroundColor: user.uid === msg.uid ? "lightgreen" : "white",
                            borderRadius: "20px",
                            padding: "8px",
                            marginLeft: user.uid === msg.uid ? "auto" : "10px"
                        }} >
                            <Grid container>
                                <Avatar src={msg.photoURL} />
                                <div>{msg.displayName}</div>
                            </Grid>
                            <div>{msg.text}</div>

                        </div>
                    ))}
                </div>
                <Grid container direction={"column"} alignItems={"flex-end"} style={{ width: "80%" }}>
                    <TextField
                        variant='outlined'
                        fullWidth
                        maxRows={2}
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                    <Button variant='outlined' onClick={sendMessage}>Send</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;
