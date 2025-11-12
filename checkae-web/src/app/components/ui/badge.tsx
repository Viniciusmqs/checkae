import * as React from "react";
type Variant = "success" | "secondary" | "destructive" | "default";
export function Badge({
  variant = "default",
  className = "",
  ...rest
}: React.HTMLAttributes<HTMLSpanElement> & { variant?: Variant }) {
  const base = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium";
  const map: Record<Variant,string> = {
    default: "bg-gray-200 text-gray-800",
    secondary: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-800",
    destructive: "bg-red-100 text-red-800",
  };
  return <span className={`${base} ${map[variant]} ${className}`} {...rest} />;
}
