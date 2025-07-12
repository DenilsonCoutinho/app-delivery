import { ButtonHTMLAttributes } from "react";
import { clsx } from 'clsx'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    onClick?: () => void
    children?: React.ReactNode
    className?: string
}


export default function Button({ onClick, children, className, ...rest }: ButtonProps) {
    return (
        <button  {...rest} onClick={onClick} className={clsx("duration-150", className)}>
            {children}
        </button>
    );
}