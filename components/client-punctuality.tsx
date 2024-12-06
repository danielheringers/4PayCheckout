interface ClientPunctualityProps {
  clientId: string
  punctuality: number
}

export function ClientPunctuality({ clientId, punctuality }: ClientPunctualityProps) {
  return (
    <div className="flex items-center gap-2 py-1">
      <span className="text-sm">
        • Cliente {clientId}: Pontualidade {punctuality}%
      </span>
    </div>
  )
}

