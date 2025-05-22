import { useUser } from "@/hooks/useUser";
import { databases } from "@/lib/appwrite";
import { createContext, useEffect, useState } from "react";
import { ID, Permission, Query, Role } from "react-native-appwrite";

const DATABASE_ID = "682a4550002a8aead0a9";
const COLLECTION_ID = "682daddf003447b5d374";

export const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
    const [bookedSeats, setBookedSeats] = useState([]);
    const { user } = useUser();

    async function createBooking(data) {
        try {
        const newBooking = await databases.createDocument(
            DATABASE_ID,
            COLLECTION_ID,
            ID.unique(),
            { ...data, userId: user.$id, userName: user.name },
            [
            Permission.read(Role.user(user.$id)),
            Permission.update(Role.user(user.$id)),
            Permission.delete(Role.user(user.$id)),
            ]
        );
        return newBooking;
        } catch (error) {
        console.error("Error creating booking:", error);
        }
    }
    
    async function getBookings() {
        try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [Query.equal("userId", user.$id)]
        );
        setBookedSeats(response.documents);
        } catch (error) {
        console.error("Error fetching bookings:", error);
        }
    }
    
    useEffect(() => {
        if (user) {
        getBookings();
        }
    }, [user]);

    async function getBookedSeats(from, to, busdate, bustime, company) {
        if (!from || !to || !busdate || !bustime || !company) {
            console.error("One or more parameters are missing:", { from, to, busdate, bustime, company });
            return [];
        }

        try {
            const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.equal("from", from),
                Query.equal("to", to),
                Query.equal("busdate", busdate),
                Query.equal("bustime", bustime),
                Query.equal("company", company),
            ]
            );

            return response.documents.map(doc => doc.seatId);
        } catch (error) {
            console.error("Failed to get booked seats:", error);
            return [];
        }
        }


    async function updateSeatStatus(documentId, newStatus) {
        try {
            const response = await databases.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            documentId,
            { status: newStatus }
            );
            return response;
        } catch (error) {
            console.error("Error updating seat status:", error);
        }
        }


    
    return (
        <BookingContext.Provider value={{ bookedSeats, createBooking, getBookings, getBookedSeats, updateSeatStatus }}>
        {children}
        </BookingContext.Provider>
    );
}
