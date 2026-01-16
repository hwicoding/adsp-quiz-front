import { ButtonHTMLAttributes, ReactNode } from 'react'
import * as styles from './Button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className,
  ...props
}: ButtonProps) => {
  const buttonClass = styles.buttonVariants[`${variant}-${size}` as keyof typeof styles.buttonVariants]
  return (
    <button
      className={`${buttonClass} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
