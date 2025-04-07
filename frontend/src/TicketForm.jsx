import { useState } from "react";
import { teamMembers } from "./team";
import "./TicketForm.css";

export default function TicketForm({ onTicketCreated }) {
  const [form, setForm] = useState({
    title: "", description: "", deadline: "", requiredSkill: ""
  });

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    onTicketCreated(data);
    setForm({ title: "", description: "", deadline: "", requiredSkill: "" });
  };

  const skillOptions = [...new Set(teamMembers.flatMap(m => m.skills))];

  return (
    <form onSubmit={handleSubmit} className="ticket-form">
      <h2>Novo Ticket</h2>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Título"
        required
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Descrição"
        required
        rows={4}
      />

      <input
        type="date"
        name="deadline"
        value={form.deadline}
        onChange={handleChange}
        required
      />

      <select
        name="requiredSkill"
        value={form.requiredSkill}
        onChange={handleChange}
        required
      >
        <option value="">Selecione uma skill</option>
        {skillOptions.map(skill => (
          <option key={skill} value={skill}>{skill}</option>
        ))}
      </select>

      <button type="submit">Criar Ticket</button>
    </form>
  );
}
