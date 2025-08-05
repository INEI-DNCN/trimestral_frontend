import styled from "styled-components"
import { theme } from "../../../../app/styles/theme"

export const Main = styled.main`
  padding: 4rem 0;
`

export const Section = styled.section`
  margin-bottom: 4rem;
`

export const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`

export const SectionTitle = styled.h3`
  font-size: 1.875rem;
  font-weight: 700;
  color: ${theme.colors.gray[800]};
  margin-bottom: 1rem;
`

export const SectionDescription = styled.p`
  font-size: 1.125rem;
  color: ${theme.colors.gray[600]};
`

export const Grid = styled.div<{ columns?: number }>`
  display: grid;
  gap: 1.5rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (min-width: ${theme.breakpoints.lg}) {
    grid-template-columns: repeat(${(props) => props.columns || 3}, 1fr);
  }
`

export const TrustSection = styled.section`
  background-color: ${theme.colors.white};
  border-radius: ${theme.borderRadius["2xl"]};
  padding: 2rem;
  box-shadow: ${theme.shadows.sm};
  border: 1px solid ${theme.colors.primary[100]};
  margin-bottom: 4rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    padding: 3rem;
  }
`

export const TrustItem = styled.div`
  text-align: center;
`

export const TrustIcon = styled.div<{ bgColor: string }>`
  width: 4rem;
  height: 4rem;
  background-color: ${(props) => props.bgColor};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
`

export const TrustTitle = styled.h4`
  font-weight: 600;
  color: ${theme.colors.gray[800]};
  margin-bottom: 0.5rem;
`

export const TrustDescription = styled.p`
  color: ${theme.colors.gray[600]};
`

export const Footer = styled.footer`
  background-color: ${theme.colors.gray[50]};
  border-top: 1px solid ${theme.colors.gray[200]};
`

export const FooterContent = styled.div`
  padding: 3rem 0;
`

export const FooterGrid = styled.div`
  display: grid;
  gap: 2rem;
  
  @media (min-width: ${theme.breakpoints.md}) {
    grid-template-columns: repeat(4, 1fr);
  }
`

export const FooterSection = styled.div``

export const FooterTitle = styled.h4`
  font-weight: 600;
  color: ${theme.colors.gray[800]};
  margin-bottom: 1rem;
`

export const FooterList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const FooterListItem = styled.li`
  margin-bottom: 0.5rem;
`

export const FooterLink = styled.a`
  color: ${theme.colors.gray[600]};
  text-decoration: none;
  transition: color 0.2s ease-in-out;
  
  &:hover {
    color: ${theme.colors.primary[600]};
  }
`

export const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`

export const SocialLink = styled.a`
  color: ${theme.colors.gray[400]};
  transition: color 0.2s ease-in-out;
  
  &:hover {
    color: ${theme.colors.primary[600]};
  }
`

export const FooterBottom = styled.div`
  border-top: 1px solid ${theme.colors.gray[200]};
  margin-top: 2rem;
  padding-top: 2rem;
  text-align: center;
  color: ${theme.colors.gray[500]};
`


