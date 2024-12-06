"use client";

import { Header } from "@/components/header";
import { InvoiceTable } from "@/components/invoices";
import { Footer } from "@/components/footer";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen overflow-hidden flex flex-col">
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

      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg p-6 shadow-lg flex flex-col h-[calc(100vh-230px)]">
          <h1 className="text-2xl font-bold mb-6">Área do Cliente | Faturas</h1>
          <InvoiceTable />
        </div>
      </main>

      <Footer />
    </div>
  );
}
