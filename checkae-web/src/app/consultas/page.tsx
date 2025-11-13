// src/app/consultas/page.tsx
"use client";

import { useEffect, useState } from "react";
import { getConsultas, type ConsultaResumo } from "@/lib/api";
import { CardConsulta } from "@/app/components/CardConsulta";

export default function ConsultasPage() {
  const [consultas, setConsultas] = useState<ConsultaResumo[]>([]);

  useEffect(() => {
    getConsultas().then(setConsultas).catch(console.error);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-semibold mb-6">Consultas realizadas</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {consultas.map((c) => (
          <CardConsulta key={c.id} consulta={c} />
        ))}
      </div>
    </main>
  );
}
