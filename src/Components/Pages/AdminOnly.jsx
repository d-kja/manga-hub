import Spinner from "../Layout/Spinner";
import { getAuth } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { db } from "../../firebase.config";
import { useCurrentAuth } from "../../Hooks/useCurrentAuth";

function AdminOnly() {
    const { isLoading: loadingAuth, isLogged } = useCurrentAuth();
    const [loading, setLoading] = useState(true);
    const [isAdmin, setIsAdmin] = useState(false);
    const isMounted = useRef(true);

    useEffect(() => {
        if (isMounted) {
            const auth = getAuth();

            const fetchUser = async (e) => {
                if (isLogged) {
                    const docRef = doc(db, "users", auth.currentUser.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists() && docSnap.data().admin) {
                        setIsAdmin(true);
                    }
                    setLoading(false);
                }
            };

            fetchUser();
        }

        return () => {
            isMounted.current = false;
        };
    }, [isLogged]);

    if (loadingAuth || loading) return <Spinner />;

    return isLogged && isAdmin ? <Outlet /> : <Navigate to="/" />;
}

export default AdminOnly;
