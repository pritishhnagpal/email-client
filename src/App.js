import "./App.css";
import EmailList from "./Components/EmailList";
import Filter from "./Components/Filter";
import { useState } from "react";

function App() {
  const [filters, setFilters] = useState({
    showFavourite: false,
    showUnread: false,
    showRead: false,
  });
  return (
    <div className="App">
      <Filter filters={filters} setFilters={setFilters} />
      <EmailList filters={filters} />
    </div>
  );
}

export default App;
