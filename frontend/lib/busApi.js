import { Query } from "react-native-appwrite";
import { databases } from "../lib/appwrite"

export const getBuses = async (Form, To , date) => {
    const DATABASE = "682a4550002a8aead0a9";
    const COLLECTION = "682a45ca00305c819f16";

  try {
    const response = await databases.listDocuments(
        DATABASE,
        COLLECTION,
        [
            Query.equal("from", Form),
            Query.equal("to", To),
            Query.equal("date", date)
            
        ]);
        return response.documents;

  } catch (error) {
    console.error("Error fetching bus data:", error);
    return [];
  }
}