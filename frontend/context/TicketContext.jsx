import { useUser } from "@/hooks/useUser";
import { databases } from "@/lib/appwrite";
import { createContext, useEffect, useState } from "react";
import { ID, Permission, Query, Role } from "react-native-appwrite";

const DATABASE_ID = "682a4550002a8aead0a9";
const COLLECTION_ID = "682a45ca00305c819f16";

export const TicketContext = createContext();

export const TicketProvider = ({ children }) => {
    const [Ticket, setTicket] = useState([]);
    const { user } = useUser();

    async function createTicket(data) {
        try {
            const newTicket = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                ID.unique(),
                {...data, userId: user.$id },
                [
                    Permission.read(Role.user(user.$id)),
                    Permission.update(Role.user(user.$id)),
                    Permission.delete(Role.user(user.$id)),
                ]
            )

        } catch (error) {
            console.error(error.message);
        }
        
    }

    async function getTicketByID(id) {
        try {

        } catch (error) {
            console.error(error.message);
        }
    }

    async function getTicket() {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
                [
                    Query.equal('userId', user.$id)
                ]
            )
            setTicket(response.documents);
            console.log(response.documents);

        } catch (error) {
            console.error(error.message);
        }
    }

    async function deleteTicket() {
        try {

        } catch (error) {
            console.error(error.message);
        }
    }

    async function updateTicket() {
        try {

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        if (user) {
            getTicket();
        } else {
            setTicket([]);
        }
    }, [user]);

    return (
        <TicketContext.Provider value={{ Ticket, setTicket, createTicket, getTicket, deleteTicket, updateTicket, getTicketByID }}>
            {children}
        </TicketContext.Provider>
    );
}


