interface StatisticsCardProps {
  label: string
  value: string | number
  isPercentage?: boolean
  isNegative?: boolean
  isCurrency?: boolean
}

export function StatisticsCard({ label, value, isPercentage, isNegative, isCurrency }: StatisticsCardProps) {
  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-gray-400 text-sm">{label}</span>
      <span className={`${isNegative ? 'text-red-500' : ''} text-sm`}>
        {isCurrency && 'R$ '}
        {value}
        {isPercentage && '%'}
      </span>
    </div>
  )
}

