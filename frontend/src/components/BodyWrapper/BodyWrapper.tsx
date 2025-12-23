import { cn } from '@/lib/utils'
import type { FC } from 'react'

interface BodyWrapperProps {
  children: React.ReactNode
  className?: string
}

const BodyWrapper: FC<BodyWrapperProps> = ({ children, className = '' }) => {
  return (
    <div
      className={cn(
        'bg-neutral-200 w-full h-full shadow-2xl max-w-7xl mx-auto p-7 overflow-y-auto scrollbar-custom',
        className,
      )}
    >
      {children}
    </div>
  )
}

export default BodyWrapper
