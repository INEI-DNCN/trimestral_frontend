import styled, { css } from "styled-components"
import { theme } from "../../../style/theme"


interface ButtonProps {
  variant?: "primary" | "secondary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  fullWidth?: boolean
}

const getVariantStyles = (variant: string) => {
  switch (variant) {
    case "primary":
      return css`
        background: linear-gradient(135deg, ${theme.colors.primary[500]} 0%, ${theme.colors.emerald[500]} 100%);
        color: ${theme.colors.white};
        border: none;
        
        &:hover {
          background: linear-gradient(135deg, ${theme.colors.primary[600]} 0%, ${theme.colors.emerald[600]} 100%);
        }
      `
    case "secondary":
      return css`
        background-color: ${theme.colors.gray[100]};
        color: ${theme.colors.gray[700]};
        border: 1px solid ${theme.colors.gray[200]};
        
        &:hover {
          background-color: ${theme.colors.gray[200]};
        }
      `
    case "outline":
      return css`
        background-color: transparent;
        color: ${theme.colors.primary[600]};
        border: 1px solid ${theme.colors.primary[200]};
        
        &:hover {
          background-color: ${theme.colors.primary[50]};
        }
      `
    case "ghost":
      return css`
        background-color: transparent;
        color: ${theme.colors.gray[600]};
        border: none;
        
        &:hover {
          background-color: ${theme.colors.gray[100]};
        }
      `
    default:
      return css`
        background-color: ${theme.colors.primary[500]};
        color: ${theme.colors.white};
        border: none;
        
        &:hover {
          background-color: ${theme.colors.primary[600]};
        }
      `
  }
}

const getSizeStyles = (size: string) => {
  switch (size) {
    case "sm":
      return css`
        padding: 0.5rem 0.75rem;
        font-size: 0.875rem;
        height: 2.25rem;
      `
    case "lg":
      return css`
        padding: 0.75rem 2rem;
        font-size: 1rem;
        height: 2.75rem;
      `
    default:
      return css`
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        height: 2.5rem;
      `
  }
}

export const Button = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.md};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  
  &:focus {
    outline: 2px solid ${theme.colors.primary[500]};
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  ${(props) => getVariantStyles(props.variant || "primary")}
  ${(props) => getSizeStyles(props.size || "md")}
  ${(props) => props.fullWidth && css`width: 100%;`}
`
