import { FC, PropsWithChildren, createContext } from "react";
import { useLocalStorage } from "usehooks-ts";

type Contact = {
  name: string;
  address: string;
};

type ContactContextType = {
  contacts: Contact[];
  addContact: (contact: Contact) => void;
  removeContact: (address: string) => void;
};

export const ContactContext = createContext<ContactContextType>({
  contacts: [],
  addContact: () => {},
  removeContact: () => {},
});

export const ContactProvider: FC<PropsWithChildren> = ({ children }) => {
  const [contacts, setContacts] = useLocalStorage<Contact[]>("contacts", []);

  const addContact = (contact: Contact) => {
    setContacts([...contacts, contact]);
  };

  const removeContact = (address: string) => {
    setContacts(contacts.filter((contact) => contact.address !== address));
  };

  return (
    <ContactContext.Provider value={{ contacts, addContact, removeContact }}>
      {children}
    </ContactContext.Provider>
  );
};
