import { createContext, useContext, useState } from 'react';
import { account } from '../lib/appwrite';
import { ID } from 'appwrite';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    async function login(email, password) {
        try {
            await account.createEmailPasswordSession(email, password); // Removed username
            const response = await account.get(); // Fixed typo
            setUser(response);
        } catch (error) {
            console.error(error.message); // Fixed typo
        }
    }

    async function signup(email, password, username) {
        try {
            await account.create(ID.unique(), email, password, username);
            await login(email, password); // Removed username
        } catch (error) {
            console.error(error.message); // Fixed typo
        }
    }

    async function logout() {
        try {
            await account.deleteSession('current'); // Deletes the current session
            setUser(null); // Resets the user state
        } catch (error) {
            console.error(error.message); // Fixed typo
        }
    }

    return (
        <UserContext.Provider value={{ user, setUser, login, signup, logout }}>
            {children}
        </UserContext.Provider>
    );
};