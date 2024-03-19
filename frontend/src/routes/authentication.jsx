import { Container } from "@mui/material";
import SignInSide from "../components/SignInSide";
import SignUp from "../components/SignUp";
import { useEffect, useState } from "react";

const Authentication = () => {
    const [showSignIn, setShowSignIn] = useState(true);

    return (
        showSignIn ? <SignInSide showSignInSetter={setShowSignIn} /> : <SignUp showSignInSetter={setShowSignIn}/>
    )
}

export default Authentication;