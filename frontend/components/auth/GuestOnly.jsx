import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router"; 
import { useEffect } from "react";

const GuestOnly = ({ children }) => {
    const { user, authchecked } = useUser();    
    const router = useRouter();

    useEffect(() => {
        if (authchecked && user !== null) {
            // User is logged in, redirect to home page
            router.replace("/(tabs)/home");
        }  
    }, [authchecked, user]);

    if (!authchecked || user) {
        return null; // or a loading spinner
    }

    return children
}

export default GuestOnly;