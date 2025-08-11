import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  IconButton,
  Box,
  Button,
} from "@mui/material";
import { format } from "date-fns";
import { useTickets } from "./TicketContext";

function TicketCard({ t }) {
  return (
    <Card sx={{ mb: 2, bgcolor: "rgba(255,255,255,0.03)" }}>
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="subtitle1">{t.title}</Typography>
          <Chip label={t.priority} size="small" />
        </Box>
        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
          {t.description}
        </Typography>
        <Box sx={{ mt: 2, display: "flex", gap: 1, alignItems: "center" }}>
          <Chip label={t.status} size="small" />
          <Chip label={t.email} size="small" />
          <Chip
            label={format(new Date(t.creationDate), "MMM d, yyyy")}
            size="small"
          />
        </Box>
      </CardContent>
    </Card>
  );
}

export default function MainTable({ openForm }) {
  const { tickets } = useTickets();
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h5">Main table</Typography>
        <Button variant="outlined" onClick={openForm}>
          Add ticket
        </Button>
      </Box>

      <Grid container spacing={2}>
        {tickets.map((t) => (
          <Grid item xs={12} md={6} key={t.id}>
            <TicketCard t={t} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
