import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

export function Header() {
  return (
    <header className="bg-white/10 backdrop-filter backdrop-blur-lg border-b border-white/20">
      <div className="container mx-auto px-4 py-4 flex flex-row items-center justify-between">
        <div className="flex gap-8 items-center">
          <Link href="/dashboard">
            <Image
              src="/novalogotendabranco.png"
              alt="Logo Tenda"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <Button
            variant="link"
            className="hover:text-slate-700/90 p-0 items-end text-lg"
            asChild
          >
            <Link href="/">Inicio</Link>
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-white/30 rounded-full flex items-center justify-center text-slate-700">
            RC
          </div>
          <div>
            <p className="text-sm font-medium text-slate-700">
              Raphael Carneiro
            </p>
            <p className="text-xs text-slate-700">
              raphael.carneiro@seidor.com
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
