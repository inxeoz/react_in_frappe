import React, { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { subDays } from "date-fns";

const TicketContext = createContext();

const sampleTickets = [
  {
    id: uuidv4(),
    title: "Request for access - new employee",
    description: "Hello team! We have a new designer joining our Creative ...",
    status: "Reviewed",
    priority: "Medium",
    creationDate: subDays(new Date(), 120).toISOString(),
    email: "caroline.smith@company.com",
  },
  {
    id: uuidv4(),
    title: "job issue",
    description: "Job scheduling failing intermittently",
    status: "Reviewed",
    priority: "Low",
    creationDate: new Date().toISOString(),
    email: "inxeoz@inxeoz.com",
  },
  {
    id: uuidv4(),
    title: "SSO not working after new security push",
    description: "Entire team locked out of SaaS apps",
    status: "Awaiting customer",
    priority: "Critical",
    creationDate: subDays(new Date(), 40).toISOString(),
    email: "ops@example.com",
  },
  {
    id: uuidv4(),
    title: "I need help with my laptop",
    description: "For some reason I can't restart my laptop...",
    status: "Resolved",
    priority: "Low",
    creationDate: subDays(new Date(), 100).toISOString(),
    email: "user@example.com",
  },
];

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(sampleTickets);

  function addTicket(data) {
    const ticket = {
      id: uuidv4(),
      ...data,
      creationDate: new Date().toISOString(),
    };
    setTickets((prev) => [ticket, ...prev]);
    return ticket;
  }

  function updateTicket(id, patch) {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    );
  }

  function moveTicket(id, newStatus, index = null) {
    setTickets((prev) => {
      const t = prev.find((x) => x.id === id);
      if (!t) return prev;
      const without = prev.filter((x) => x.id !== id);
      const updated = { ...t, status: newStatus };
      // insert
      if (index === null) return [updated, ...without];
      const left = without.slice(0, index);
      const right = without.slice(index);
      return [...left, updated, ...right];
    });
  }

  return (
    <TicketContext.Provider
      value={{ tickets, addTicket, updateTicket, moveTicket }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTickets() {
  return useContext(TicketContext);
}
