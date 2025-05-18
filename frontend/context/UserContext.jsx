import { createContext, useState, useEffect } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authchecked, setAuthChecked] = useState(false);

    async function login(email, password) {
        try {
            await account.createEmailPasswordSession(
                email,
                password
            );
            const response = await account.get();
            setUser(response);

        } catch (error) {
            throw Error(error.message);
        }

    }

    async function signup(email, username, password) {
        try {
            await account.create(
                ID.unique(),
                email,
                password,
                username
            );
            await login(email, password);
        } catch (error) {
            throw Error(error.message);
        }
    }
    
    async function getUser() {
        try {
            const response = await account.get();
            setUser(response);
        } catch (error) {
            console.log(error.message);
        } finally {
            setAuthChecked(true);
        }
    }

    useEffect(() => {
        getUser();
    }, [])


    async function logout() {
        await account.deleteSession('current');
        setUser(null);
        
    }

    return (
        <UserContext.Provider value={{ user, login, signup, logout, authchecked }}>
            {children}
        </UserContext.Provider>
    )

}

