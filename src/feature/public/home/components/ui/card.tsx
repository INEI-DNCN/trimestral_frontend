import styled from "styled-components"
import { theme } from "../../../style/theme"

export const Card = styled.div`
  background-color: ${theme.colors.white};
  border: 1px solid ${theme.colors.primary[100]};
  border-radius: ${theme.borderRadius.lg};
  box-shadow: ${theme.shadows.sm};
  transition: all 0.2s ease-in-out;
  
  &:hover {
    box-shadow: ${theme.shadows.lg};
    border-color: ${theme.colors.primary[200]};
  }
`

export const CardHeader = styled.div`
  padding: 1.5rem 1.5rem 0.75rem 1.5rem;
`

export const CardContent = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
`

export const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${theme.colors.gray[800]};
  margin-bottom: 0.5rem;
`

export const CardDescription = styled.p`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${theme.colors.primary[600]};
`
