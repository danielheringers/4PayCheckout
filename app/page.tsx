import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FinancialDashboard } from "@/components/financial-dashboard";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-full overflow-hidden">
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(45deg, #1E3C72 0%, #2A5298 25%, #6FB1FC 50%, #00BFFF 100%)",
          filter: "blur(100px)",
          opacity: 0.7,
        }}
      />

      {/* Navigation */}
      <header className="px-4 lg:px-6 h-20 flex items-center bg-white/10 backdrop-filter backdrop-blur-lg border-b border-white/20">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="flex items-center justify-center" href="/">
            <Image
              src="/novalogotendabranco.png"
              alt="Logo da empresa"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Button variant="secondary" asChild>
              <Link href="/login">Área do Cliente →</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center px-4 min-h-[calc(100vh-173px)]">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-900">
                  Seu apartamento cabe no seu bolso
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl dark:text-gray-400">
                  tenha controle total do seu financiamento na palma da sua mão.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button
                  className="bg-slate-900 text-white hover:bg-slate-900/90"
                  asChild
                >
                  <Link href="/login">Visualizar agora →</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              {/* Device Mockup */}
              <div className="relative w-full max-w-[280px] aspect-[9/19] transform rotate-6">
                {/* Device Frame */}
                <div className="absolute inset-0 bg-slate-900 rounded-[3rem] shadow-2xl">
                  {/* Inner Shadow */}
                  <div className="absolute inset-0 rounded-[3rem] shadow-inner" />

                  {/* Buttons */}
                  <div className="absolute right-[-2px] top-24 w-1 h-12 bg-slate-800 rounded-l-md" />
                  <div className="absolute left-[-2px] top-20 w-1 h-16 bg-slate-800 rounded-r-md" />

                  {/* Screen Container */}
                  <div className="absolute inset-2 bg-white rounded-[2.75rem] overflow-hidden">
                    {/* Screen Content */}
                    <div className="h-full w-full">
                      <FinancialDashboard />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
