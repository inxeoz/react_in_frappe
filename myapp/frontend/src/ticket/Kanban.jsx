import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const initialData = {
  todo: [
    { id: "1", text: "Write proposal" },
    { id: "2", text: "Design mockups" },
  ],
  inProgress: [{ id: "3", text: "Develop feature X" }],
  done: [{ id: "4", text: "Deploy to production" }],
};

export default function Kanban() {
  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;

    // Moving in the same column
    if (source.droppableId === destination.droppableId) {
      const newColumn = Array.from(columns[source.droppableId]);
      const [moved] = newColumn.splice(source.index, 1);
      newColumn.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [source.droppableId]: newColumn,
      });
    } else {
      // Moving to a different column
      const sourceCol = Array.from(columns[source.droppableId]);
      const destCol = Array.from(columns[destination.droppableId]);
      const [moved] = sourceCol.splice(source.index, 1);
      destCol.splice(destination.index, 0, moved);
      setColumns({
        ...columns,
        [source.droppableId]: sourceCol,
        [destination.droppableId]: destCol,
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: "flex", gap: "20px" }}>
        {Object.entries(columns).map(([colId, tasks]) => (
          <Droppable key={colId} droppableId={colId}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: "#f4f4f4",
                  padding: 10,
                  width: 250,
                  minHeight: 400,
                  borderRadius: 4,
                }}
              >
                <h3 style={{ textTransform: "capitalize" }}>{colId}</h3>
                {tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: "none",
                          padding: 16,
                          margin: "0 0 8px 0",
                          background: "white",
                          borderRadius: 4,
                          boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                          ...provided.draggableProps.style,
                        }}
                      >
                        {task.text}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
