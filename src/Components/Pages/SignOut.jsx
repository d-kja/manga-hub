import { getAuth } from "firebase/auth";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

function SignOut() {
    const auth = getAuth();
    if (auth.currentUser != null)
        toast.info("Logged out", {
            theme: "dark",
        });
    auth.signOut();
    return <Navigate to="/" />;
}

export default SignOut;
