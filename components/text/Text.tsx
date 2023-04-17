import cs from 'classnames'

interface TextProps {
  children: string
  variant?: 'header' | 'standard'
  classNames?: string
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'standard',
  classNames,
}) => {
  return (
    <span
      className={cs({ 'font-bold text-3xl': variant === 'header' }, classNames)}
    >
      {children}
    </span>
  )
}
