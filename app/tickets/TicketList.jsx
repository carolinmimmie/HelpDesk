import React from "react"; // Importera React från react-paketet
import Link from "next/link";
// split terminal
// terminal 1 - yarn dev
// terminal 2 - json-server --watch --port 4000 ./_data/db.json

// Funktion för att hämta biljetter från servern
// Notera: Next.js använder automatiskt inbyggd datacachning för att lagra och återanvända data mellan sidrenderingar.
// Detta innebär att data som hämtas från servern kommer att cachelagras för att förbättra prestanda och minska belastningen på servern.
async function getTickets() {
  const rest = await fetch("http://localhost:4000/tickets", {
    next: { revalidate: 30 },
  }); // Vänta på att data ska hämtas från servern via fetch-anrop
  return rest.json(); // Returnera data i JSON-format
}

// TicketList-komponenten, anmärkt som async eftersom den använder asynkron kod
const TicketList = async () => {
  const tickets = await getTickets(); // Hämta biljetter från servern

  // Returnera JSX-element som representerar listan över biljetter
  return (
    <>
      {tickets.map((ticket) => (
        <div key={ticket.id} className="card my-5">
          <Link href={`/tickets/${ticket.id}`}>
            {/* Rendera ett kort för varje biljett */}
            <h3>{ticket.title}</h3> {/* Titel på biljetten */}
            <p>{ticket.body.slice(0, 200)}...</p>{" "}
            {/* Beskrivning av biljetten, begränsad till 200 tecken */}
            <div className={`pill ${ticket.priority}`}>
              {" "}
              {/* Prioritet på biljetten */}
              {ticket.priority} priority
            </div>
          </Link>
        </div>
      ))}
      {/* Visa ett meddelande om det inte finns några öppna biljetter */}
      {tickets.length === 0 && (
        <p className="text-center">There are no open tickets, yay!</p>
      )}
    </>
  );
};

export default TicketList; // Exportera TicketList-komponenten för att den ska kunna användas i andra delar av applikationen
