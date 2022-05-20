import { getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";

function SignOut() {
    const auth = getAuth();
    auth.signOut();

    return <Navigate to="/" />;
}

export default SignOut;
