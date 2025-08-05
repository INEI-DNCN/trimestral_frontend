import {
  Footer,
  FooterContent,
  FooterGrid,
  FooterSection,
  FooterTitle,
  FooterList,
  FooterListItem,
  FooterLink,
  SocialLinks,
  SocialLink,
  FooterBottom,
} from "../components/Layout"
import { Search, Facebook, Twitter, Instagram, Mail, Phone } from "lucide-react"
import { theme } from "../../style/theme"
import { Logo, LogoIcon, LogoText } from "./header_section"


const FooterSectionHome = () => (
  <Footer>
    <FooterContent>
      <FooterGrid>
        <FooterSection>
          <Logo>
            <LogoIcon>
              <Search size={16} />
            </LogoIcon>
            <LogoText style={{ fontSize: "1.25rem" }}>PillFinder</LogoText>
          </Logo>
          <p style={{ color: theme.colors.gray[600], margin: "1rem 0" }}>
            Tu aliado para encontrar medicamentos al mejor precio, cerca de ti.
          </p>
          <SocialLinks>
            <SocialLink href="#">
              <Facebook size={20} />
            </SocialLink>
            <SocialLink href="#">
              <Twitter size={20} />
            </SocialLink>
            <SocialLink href="#">
              <Instagram size={20} />
            </SocialLink>
          </SocialLinks>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Enlaces útiles</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="#">Cómo funciona</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">Preguntas frecuentes</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">Términos y condiciones</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">Política de privacidad</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Para farmacias</FooterTitle>
          <FooterList>
            <FooterListItem>
              <FooterLink href="#">Únete a PillFinder</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">Portal de farmacias</FooterLink>
            </FooterListItem>
            <FooterListItem>
              <FooterLink href="#">Soporte técnico</FooterLink>
            </FooterListItem>
          </FooterList>
        </FooterSection>
        <FooterSection>
          <FooterTitle>Contacto</FooterTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Mail size={16} color={theme.colors.primary[600]} />
              <span style={{ color: theme.colors.gray[600] }}>info@pillfinder.com</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Phone size={16} color={theme.colors.primary[600]} />
              <span style={{ color: theme.colors.gray[600] }}>+1 (555) 123-4567</span>
            </div>
          </div>
        </FooterSection>
      </FooterGrid>
      <FooterBottom>
        <p>© {new Date().getFullYear()} PillFinder. Todos los derechos reservados.</p>
      </FooterBottom>
    </FooterContent>
  </Footer>
)

export default FooterSectionHome
