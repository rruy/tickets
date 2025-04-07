const express = require("express");
const cors = require("cors");
const { teamMembers, tickets } = require("./data");

const app = express();
app.use(cors());
app.use(express.json());

// Get all tickets
app.get("/tickets", (req, res) => {
  res.json(tickets);
});

// Create new ticket
app.post("/tickets", (req, res) => {
  const { title, description, deadline, requiredSkill } = req.body;

  const assignedTo = teamMembers.find(member => member.skills.includes(requiredSkill));
  const ticket = {
    id: tickets.length + 1,
    title,
    description,
    deadline,
    requiredSkill,
    status: "Open",
    assignedTo: assignedTo ? assignedTo.name : null,
  };

  tickets.push(ticket);
  res.status(201).json(ticket);
});

app.listen(3001, () => console.log("Server running on http://localhost:3001"));
