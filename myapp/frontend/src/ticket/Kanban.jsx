import React from "react";
import { useTickets } from "./TicketContext";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
} from "@mui/material";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableItem } from "./kanban/SortableItem";
import { useSensor, useSensors, PointerSensor } from "@dnd-kit/core";

// Simple sortable item wrapper provided in this fileset (next block)

const STATUSES = [
  "Reviewed",
  "Awaiting customer",
  "New reply",
  "Resolved",
  "Self resolved",
  "Reopen",
];

export default function Kanban() {
  const { tickets, moveTicket } = useTickets();
  const sensors = useSensors(useSensor(PointerSensor));

  const columns = STATUSES.map((status) => ({
    id: status,
    items: tickets.filter((t) => t.status === status),
  }));

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over) return;
    const [status, indexStr] = over.id.split("::");
    const index = Number(indexStr);
    moveTicket(active.id, status, index);
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "flex-start",
          overflowX: "auto",
          pb: 2,
        }}
      >
        {columns.map((col) => (
          <Box
            key={col.id}
            sx={{
              minWidth: 280,
              bgcolor: "background.paper",
              borderRadius: 1,
              p: 1,
            }}
          >
            <Typography variant="subtitle1" sx={{ mb: 1 }}>
              {col.id} ({col.items.length})
            </Typography>
            <SortableContext
              items={col.items.map((i) => i.id)}
              strategy={verticalListSortingStrategy}
            >
              {col.items.map((t, i) => (
                <div key={t.id} id={`${col.id}::${i}`}>
                  <SortableItem id={t.id}>
                    <Card sx={{ mb: 1 }}>
                      <CardContent>
                        <Typography variant="body1">{t.title}</Typography>
                        <Typography
                          variant="caption"
                          display="block"
                          sx={{ color: "text.secondary" }}
                        >
                          {t.description}
                        </Typography>
                        <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                          <Chip label={t.priority} size="small" />
                          <Chip
                            label={format(
                              new Date(t.creationDate),
                              "MMM d, yyyy",
                            )}
                            size="small"
                          />
                        </Box>
                      </CardContent>
                    </Card>
                  </SortableItem>
                </div>
              ))}
            </SortableContext>
          </Box>
        ))}
      </Box>
    </DndContext>
  );
}
