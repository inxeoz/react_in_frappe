// // src/App.jsx
// import React from "react";
// import "./App.css";
// export default function App() {
//   return (
//     <div className="main">
//       <h1>Hello React + Frappe</h1>;
//     </div>
//   );
// }

import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import {
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";
import MainTable from "./ticket/MainTable";
import Kanban from "./ticket/Kanban";
import TicketForm from "./ticket/TicketForm";

export default function App() {
  const [openForm, setOpenForm] = React.useState(false);
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", gap: 2 }}>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            MYTICK
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Main Table
          </Button>
          <Button color="inherit" component={Link} to="/kanban">
            Kanban
          </Button>
          <Button color="inherit" onClick={() => setOpenForm(true)}>
            New ticket
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Routes>
          <Route
            path="/"
            element={<MainTable openForm={() => setOpenForm(true)} />}
          />
          <Route path="/kanban" element={<Kanban />} />
        </Routes>
      </Container>
      <TicketForm open={openForm} onClose={() => setOpenForm(false)} />
    </>
  );
}
