// app/page.tsx
"use client";

import { useState, useEffect } from "react";

type Service = {
  id: number;
  name: string;
  duration: string;
  price: string;
  image: string;
};

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/services.json")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Later: send to Supabase
  };

  return (
    <main className="min-h-screen bg-neutral-900 text-gray-100">
      {/* Header */}
      <header className="bg-neutral-950 text-white shadow-md">
        <div className="max-w-5xl mx-auto flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold">Appointment Site</h1>
          <a
            href="mailto:contact@template.com"
            className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-medium hover:bg-emerald-600 transition"
          >
            Kontakt oss
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 p-6">
        {/* Services */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Våre tjenester</h2>
          <div className="space-y-4">
            {services.map((s) => (
              <div
                key={s.id}
                className={`p-4 rounded-xl border transition cursor-pointer ${
                  selectedService === s.id
                    ? "border-emerald-500 bg-neutral-800"
                    : "border-neutral-700 bg-neutral-900 hover:border-gray-500"
                }`}
                onClick={() => setSelectedService(s.id)}
              >
                <img
                  src={s.image}
                  alt={s.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold">{s.name}</h2>
                  <p className="text-gray-600">{s.duration}</p>
                  <p className="mt-2 text-lg font-bold">{s.price}</p>
                  <button className="mt-4 w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800">
                    Book nå
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4">Kundeomtaler</h2>
            <div className="space-y-4">
              <div className="p-4 bg-neutral-800 rounded-xl">
                <p className="italic">"Beste frisøren i byen!"</p>
                <p className="text-sm text-gray-400 mt-2">– Ahmed</p>
              </div>
              <div className="p-4 bg-neutral-800 rounded-xl">
                <p className="italic">"Alltid fornøyd med klippen."</p>
                <p className="text-sm text-gray-400 mt-2">– Sara</p>
              </div>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Bestill time</h2>
          {submitted ? (
            <div className="p-6 bg-emerald-600 text-white rounded-xl">
              ✅ Takk {name}, vi har mottatt bestillingen din!
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-neutral-800 p-6 rounded-xl space-y-4"
            >
              <div>
                <label className="block mb-1">Dato</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full p-2 rounded-lg bg-neutral-900 border border-neutral-700"
                />
              </div>
              <div>
                <label className="block mb-1">Tidspunkt</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                  className="w-full p-2 rounded-lg bg-neutral-900 border border-neutral-700"
                />
              </div>
              <div>
                <label className="block mb-1">Navn</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full p-2 rounded-lg bg-neutral-900 border border-neutral-700"
                />
              </div>
              <div>
                <label className="block mb-1">E-post</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 rounded-lg bg-neutral-900 border border-neutral-700"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-medium py-2 rounded-lg transition"
              >
                Bestill
              </button>
            </form>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-neutral-950 text-gray-400 text-center py-6 mt-12">
        <p>
          Bego Cuts © {new Date().getFullYear()} – Alle rettigheter reservert.
        </p>
      </footer>
    </main>
  );
}
