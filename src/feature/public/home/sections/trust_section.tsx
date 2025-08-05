import {
  TrustSection as TrustSectionLayout,
  SectionHeader,
  SectionTitle,
  Grid,
  TrustItem,
  TrustIcon,
  TrustTitle,
  TrustDescription,
} from "../components/Layout"
import { Shield, Clock, Users } from "lucide-react"
import { theme } from "../../style/theme"

const TrustSection = () => (
  <TrustSectionLayout>
    <SectionHeader>
      <SectionTitle>¿Por qué confiar en PillFinder?</SectionTitle>
    </SectionHeader>
    <Grid>
      <TrustItem>
        <TrustIcon bgColor={theme.colors.primary[100]}>
          <Shield size={32} color={theme.colors.primary[600]} />
        </TrustIcon>
        <TrustTitle>Información verificada</TrustTitle>
        <TrustDescription>Trabajamos solo con farmacias autorizadas y precios actualizados</TrustDescription>
      </TrustItem>
      <TrustItem>
        <TrustIcon bgColor={theme.colors.emerald[100]}>
          <Clock size={32} color={theme.colors.emerald[600]} />
        </TrustIcon>
        <TrustTitle>Ahorra tiempo</TrustTitle>
        <TrustDescription>Encuentra lo que necesitas en segundos, sin recorrer farmacias</TrustDescription>
      </TrustItem>
      <TrustItem>
        <TrustIcon bgColor={theme.colors.blue[100]}>
          <Users size={32} color={theme.colors.blue[600]} />
        </TrustIcon>
        <TrustTitle>Miles de usuarios</TrustTitle>
        <TrustDescription>Únete a la comunidad que ya ahorra en sus medicamentos</TrustDescription>
      </TrustItem>
    </Grid>
  </TrustSectionLayout>
)

export default TrustSection
