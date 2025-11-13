// src/app/components/CardConsulta.tsx
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/app/components/ui/card";
import { Badge } from "@/app/components/ui/badge";
import type { ConsultaResumo } from "@/lib/api";

interface CardConsultaProps {
  consulta: ConsultaResumo;
}

export function CardConsulta({ consulta }: CardConsultaProps) {
  return (
    <Link href={`/consultas/${consulta.id}`}>
      <Card className="hover:shadow-lg transition cursor-pointer">
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between items-center">
            <h2 className="font-medium text-gray-800">{consulta.placa}</h2>
            <Badge
              variant={
                consulta.status === "CONCLUIDA"
                  ? "success"
                  : consulta.status === "PROCESSANDO"
                  ? "secondary"
                  : "destructive"
              }
            >
              {consulta.status}
            </Badge>
          </div>
          <p className="text-sm text-gray-500">{consulta.cpfCnpj}</p>
          <p className="text-xs text-gray-400">
            {new Date(consulta.createdAt).toLocaleString("pt-BR")}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
