import styled, { css } from "styled-components"
import { theme } from "../../../style/theme"


interface BadgeProps {
  variant?: "primary" | "secondary" | "success"
}

const getVariantStyles = (variant: string) => {
  switch (variant) {
    case "secondary":
      return css`
        background-color: ${theme.colors.emerald[100]};
        color: ${theme.colors.emerald[700]};
      `
    case "success":
      return css`
        background-color: ${theme.colors.blue[100]};
        color: ${theme.colors.blue[700]};
      `
    default:
      return css`
        background-color: ${theme.colors.primary[100]};
        color: ${theme.colors.primary[700]};
      `
  }
}

export const Badge = styled.span<BadgeProps>`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  border-radius: ${theme.borderRadius.full};
  font-size: 0.75rem;
  font-weight: 600;
  ${(props) => getVariantStyles(props.variant || "primary")}
`
