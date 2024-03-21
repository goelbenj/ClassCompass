import { Container } from "@mui/material";
import SignInSide from "../components/SignInSide";
import SignUp from "../components/SignUp";
import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";

const Authentication = () => {
    const auth = getAuth();

    const [showSignIn, setShowSignIn] = useState(true);

    return (
        // TODO: REPLACE WITH PROFILE PAGE SCREEN
        auth.currentUser ? <Container>JOE MAMA</Container> : 
        (showSignIn ? <SignInSide showSignInSetter={setShowSignIn} /> : <SignUp showSignInSetter={setShowSignIn}/>)
    )
}

export default Authentication;