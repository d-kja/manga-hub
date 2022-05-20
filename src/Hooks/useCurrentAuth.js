import { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export const useCurrentAuth = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const isMounted = useRef(true);

    useEffect(() => {
        if (isMounted) {
            const auth = getAuth();
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setIsLogged(true);
                }
                setIsLoading(false);
            });
        }

        return () => {
            isMounted.current = false;
        };
    }, [isMounted]);

    return { isLogged, isLoading };
};
