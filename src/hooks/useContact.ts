import {
    ContactContext
} from "@/context/ContactContext";
import { useContext } from "react";

export const useContact = () => useContext(ContactContext);