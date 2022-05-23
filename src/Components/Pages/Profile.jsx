import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

function Profile() {
    const [user, setUser] = useState({});
    const auth = getAuth();
    useEffect(() => {
        const fetchUser = async () => {
            const docRef = doc(db, "users", auth.currentUser.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                setUser(docSnap.data());
            }
        };
        fetchUser();
    }, [auth.currentUser.uid]);

    return <div>{user.name}</div>;
}

export default Profile;
