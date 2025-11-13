// src/app/page.tsx

import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <section className="flex-1 px-6 py-12 md:px-16 lg:px-32 flex flex-col justify-center gap-8">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium text-gray-600 bg-white">
            Plataforma de consulta veicular
          </span>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-gray-900">
            Consultas veiculares rápidas, confiáveis e fáceis de entender.
          </h1>

          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
            O Checkae conecta diferentes provedores para montar um dossiê
            completo do veículo, com dados cadastrais, débitos, histórico
            básico e valor de referência em uma interface simples e objetiva.
          </p>

          <div className="flex flex-wrap gap-3 mt-4">
            <Link
              href="/consultas"
              className="rounded-full bg-black text-white px-6 py-2 text-sm font-medium hover:bg-gray-900 transition"
            >
              Ver consultas realizadas
            </Link>

            <Link
              href="/consultas"
              className="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-800 bg-white hover:bg-gray-100 transition"
            >
              Iniciar nova consulta
            </Link>
          </div>
        </div>

        <div className="mt-10 text-xs text-gray-400">
          Depois refinamos aqui com cards de benefícios, destaque de promoção,
          menu superior e botão flutuante, alinhando com o fluxo ideal que você
          descreveu.
        </div>
      </section>
    </main>
  );
}
