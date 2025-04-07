import { useEffect, useState } from "react";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);

  const fetchTickets = async () => {
    const res = await fetch("http://localhost:3001/tickets");
    const data = await res.json();
    setTickets(data);
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div>
      <h2>Tickets</h2>
      <ul>
        {tickets.map(ticket => (
          <li key={ticket.id}>
            <strong>{ticket.title}</strong> – {ticket.status} (Assigned to: {ticket.assignedTo || "Unassigned"})
          </li>
        ))}
      </ul>
    </div>
  );
}
