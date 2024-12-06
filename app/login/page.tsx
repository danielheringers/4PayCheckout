"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const [cnpj, setCnpj] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically validate the CNPJ and send it to your backend
    console.log("CNPJ submitted:", cnpj);
    // For now, we'll just redirect to a hypothetical dashboard
    router.push("/dashboard");
  };

  const formatCNPJ = (value: string) => {
    return value
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "$1.$2")
      .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
      .replace(/\.(\d{3})(\d)/, ".$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .slice(0, 18);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(45deg, #1E3C72 0%, #2A5298 25%, #6FB1FC 50%, #00BFFF 100%)",
          filter: "blur(100px)",
          opacity: 0.7,
        }}
      />

      {/* Header */}
      <header className="px-4 lg:px-6 h-20 flex items-center bg-white/10 backdrop-filter backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto flex justify-between items-center">
          <Image
            src="/novalogotendabranco.png"
            alt="Logo da empresa"
            width={120}
            height={40}
            className="h-8 w-auto"
          />
          <Button
            className="bg-slate-900 text-white hover:bg-slate-900/90"
            asChild
          >
            <Link href="/">Home</Link>
          </Button>
        </div>
      </header>

      {/* Login Form */}
      <main className="flex-grow flex items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8 bg-white/10 backdrop-filter backdrop-blur-lg p-8 rounded-xl border border-white/20">
          <div className="text-center">
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              Acesse sua conta
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="cnpj" className="text-gray-700">
                CNPJ
              </Label>
              <Input
                id="cnpj"
                name="cnpj"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="00.000.000/0000-00"
                value={cnpj}
                onChange={(e) => setCnpj(formatCNPJ(e.target.value))}
              />
            </div>
            <div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                Entrar
              </Button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}
