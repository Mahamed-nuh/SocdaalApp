import { createContext, useState } from "react";
import { account } from "../lib/appwrite";
import { ID } from "react-native-appwrite";

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    async function login(email, password) {
        try {
            await account.createEmailPasswordSession(
                email,
                password
            );
            const response = await account.get();
            setUser(response);

        } catch (error) {
            console.log(error);
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
            console.log(error);
        }
    }

    async function logout() {

    }

    return (
        <UserContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </UserContext.Provider>
    )

}

