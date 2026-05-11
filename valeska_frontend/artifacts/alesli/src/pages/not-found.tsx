import { AlertCircle } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="h-full w-full flex items-center justify-center p-4">
      <div className="glass-panel max-w-md w-full p-8 text-center flex flex-col items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-white mb-2">
          <AlertCircle className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-shadow-sm text-white">Página no encontrada</h1>
        <p className="text-white/80">
          Lo sentimos, la página que buscas no existe o ha sido movida.
        </p>
        <Link href="/">
          <div className="mt-4 inline-block bg-white/20 hover:bg-white/30 text-white font-medium px-6 py-3 rounded-full transition-colors cursor-pointer border border-white/30">
            Volver al Inicio
          </div>
        </Link>
      </div>
    </div>
  );
}
