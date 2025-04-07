import TicketForm from "./TicketForm";
import TicketList from "./TicketList";
import { useEffect, useState } from "react";

function App() {
  const [refresh, setRefresh] = useState(false);

  return (
    <div>
      <h1>Ticket Management</h1>
      <TicketForm onTicketCreated={() => setRefresh(!refresh)} />
      <TicketList key={refresh} />
    </div>
  );
}

export default App;
