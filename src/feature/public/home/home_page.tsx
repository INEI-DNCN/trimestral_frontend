import HeaderSection, { Container } from "./sections/header_section"
import HeroSection from "./sections/hero_section"
import PopularMedicinesSection from "./sections/popular_medicines_section"
import TrustSection from "./sections/trust_section"
import FooterSection from "./sections/footer_section"
import styled from "styled-components"
import { theme } from "../style/theme"
import { Main } from "./components/Layout"

function HomePublicPage() {
  return (
    <PageWrapper>
      <HeaderSection />
      <Main>
        <Container>
          <HeroSection />
          <PopularMedicinesSection />
          <TrustSection />
        </Container>
      </Main>
      <FooterSection />
    </PageWrapper>
  )
}

export default HomePublicPage

export const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  background: linear-gradient(135deg,
    ${theme.colors.white} 0%,
    ${theme.colors.primary[50]} 30%,
    ${theme.colors.emerald[50]} 100%
  );
`