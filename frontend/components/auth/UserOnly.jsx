import { useUser } from "@/hooks/useUser";
import { useRouter } from "expo-router"; 
import { useEffect } from "react";

const UserOnly = ({ children }) => {
    const { user, authchecked } = useUser();    
    const router = useRouter();

    useEffect(() => {
        if (authchecked && user === null) {
            // User is not logged in, redirect to login page
            router.replace("/(auth)/login");
        }  
    }, [authchecked, user]);

    if (!authchecked || !user) {
        return null; // or a loading spinner
    }

    return children
}

export default UserOnly;