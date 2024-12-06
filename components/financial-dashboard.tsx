/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatisticsCard } from "./statistics-card";
import { ClientPunctuality } from "./client-punctuality";

export function FinancialDashboard() {
  return (
    <div className="w-full h-full bg-gray-50">
      {/* Status Bar */}
      <div className="bg-slate-900 px-8 py-1 flex items-center text-white text-xs">
        <span>1:17</span>
        <div className="ml-auto flex items-center gap-1">
          <div className="w-3 h-3 rounded-full border border-white" />
          <div className="w-3 h-3 rounded-full border border-white" />
          <div className="w-3 h-3 rounded-full border border-white" />
        </div>
      </div>

      {/* Header */}
      <div className="bg-blue-900 text-white p-4 rounded-b-3xl">
        <h1 className="text-lg font-medium mb-4">Resumo de Boletos</h1>

        <StatisticsCard label="Total Emitido" value="1.453.179,02" isCurrency />
        <StatisticsCard label="Total Recebido" value="756.928,63" isCurrency />

        <div className="mt-4">
          <span className="text-sm">Taxa de Pagamento</span>
          <div className="text-4xl font-bold text-cyan-400">31.32%</div>
        </div>
      </div>

      {/* Statistics */}
      <div className="p-4">
        <h2 className="font-medium mb-2">Estatísticas Gerais</h2>

        <StatisticsCard label="Total de Boletos Gerados" value="463" />
        <StatisticsCard label="Boletos Pagos" value="145" />
        <StatisticsCard label="Boletos Cancelados" value="6" />
        <StatisticsCard
          label="Percentual de Atrasados"
          value="05.03"
          isPercentage
          isNegative
        />
        <StatisticsCard label="Média de Atraso no Pagamento" value="-7.56" />

        <h2 className="font-medium mt-6 mb-2">Pontualidade dos Clientes</h2>

        <ClientPunctuality clientId="042142330001948" punctuality={100} />
        <ClientPunctuality clientId="112722786662" punctuality={100} />
        <ClientPunctuality clientId="091790790001334" punctuality={85.71} />
        <ClientPunctuality clientId="281402690001922" punctuality={100} />
      </div>
    </div>
  );
}
