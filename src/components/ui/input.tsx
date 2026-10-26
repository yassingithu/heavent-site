import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, onFocus, value, placeholder, ...props }, ref) => {
    const nombre = type === "number";
    return (
      <input
        type={type}
        // Champs numériques : un « 0 » numérique s'affiche vide (avec « 0 » en grisé) pour qu'il ne reste pas devant ce qu'on tape
        // (125 ne devient plus 1250), et le contenu est sélectionné au toucher pour être remplacé directement.
        value={nombre && typeof value === "number" && value === 0 ? "" : value}
        placeholder={nombre && typeof value === "number" && value === 0 && placeholder === undefined ? "0" : placeholder}
        onFocus={(e) => { if (nombre) e.currentTarget.select(); onFocus?.(e); }}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
