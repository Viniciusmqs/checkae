"use client";

import { useEffect, useState } from "react";
import { getConsultas } from "@/lib/api";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";

type Consulta = {
  id: string;
  placa: string;
  cpfCnpj: string;
  status: string;
  createdAt: string;
};

export default function HomePage() {
  const [consultas, setConsultas] = useState<Consulta[]>([]);

  useEffect(() => {
    getConsultas().then(setConsultas);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-semibold mb-6">Consultas Realizadas</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {consultas.map((c) => (
          <Card key={c.id} className="hover:shadow-lg transition">
            <CardContent className="p-4 space-y-2">
              <div className="flex justify-between items-center">
                <h2 className="font-medium text-gray-800">{c.placa}</h2>
                <Badge
                  variant={
                    c.status === "CONCLUIDA"
                      ? "success"
                      : c.status === "PROCESSANDO"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {c.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-500">{c.cpfCnpj}</p>
              <p className="text-xs text-gray-400">
                {new Date(c.createdAt).toLocaleString("pt-BR")}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
