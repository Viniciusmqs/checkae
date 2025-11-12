import * as React from "react";

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="rounded-2xl border bg-white shadow-sm" {...props} />;
}
export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="p-4" {...props} />;
}
