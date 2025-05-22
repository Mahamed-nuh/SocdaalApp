import { Query, ID } from "react-native-appwrite";
import { databases } from "./appwrite"; // adjust path if needed

const DATABASE_ID = "682a4550002a8aead0a9";
const COLLECTION_ID = "682daddf003447b5d374";

// 🔍 Get all booked seat IDs for a specific trip
export const getBookedSeats = async (from, to, busDate, busTime, company) => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [
        Query.equal("from", from),
        Query.equal("to", to),
        Query.equal("busdate", busDate),
        Query.equal("bustime", busTime),
        Query.equal("company", company),
      ]
    );

    // Returns array of { seatId, userName }
    return response.documents.map(doc => ({
      seatId: doc.seatId,
      userName: doc.userName
    }));

  } catch (error) {
    console.error("Error getting booked seats:", error);
    return [];
  }
};

// 🪑 Book selected seats
export const bookSeats = async ({ from, to, busDate, busTime, company, selectedSeats, user }) => {
  try {
    for (const seatId of selectedSeats) {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {
          from,
          to,
          busDate,
          busTime,
          company,
          seatId,
          userId: user.$id,
          userName: user.name  // Save user’s name for display
        }
      );
    }
    return true;
  } catch (error) {
    console.error("Booking failed:", error);
    return false;
  }
};

// create a ticket
export const createTicket = async ({ from, to, busDate, busTime, company, selectedSeats, user }) => {
  try {
    const ticketId = ID.unique();
    await databases.createDocument(
      DATABASE_ID,
      "682daddf003447b5d374",
      ticketId,
      {
        from,
        to,
        busDate,
        busTime,
        company,
        selectedSeats: JSON.stringify(selectedSeats),
        userId: user.$id,
        userName: user.name
      }
    );
    return ticketId;
  } catch (error) {
    console.error("Error creating ticket:", error);
    return null;
  }
};  