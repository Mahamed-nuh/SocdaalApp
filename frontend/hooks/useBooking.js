import { useContext } from "react";
import { BookingContext } from "@/context/BookingContext";

// Custom hook to use the BookingContext
export function useBooking() {
    const context = useContext(BookingContext);

    if (!context) {
        throw new Error("useBooking must be used within a BookingProvider");
    }

    return context;
}