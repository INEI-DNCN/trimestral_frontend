import {
  Section,
  SectionHeader,
  SectionTitle,
  SectionDescription,
  Grid,
} from "../components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Button } from "../components/ui/button"
import { MapPin } from "lucide-react"
import styled from "styled-components"
import { theme } from "../../style/theme"

const MedicineInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: between;
`

const PharmacyInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: ${theme.colors.gray[500]};
  gap: 0.25rem;
`

const CardHeaderFlex = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 0.5rem;
`

const popularMedicines = [
  {
    name: "Paracetamol 500mg",
    priceRange: "$2.50 - $8.90",
    category: "Analgésico",
    pharmacies: 12,
  },
  {
    name: "Ibuprofeno 400mg",
    priceRange: "$3.20 - $12.50",
    category: "Antiinflamatorio",
    pharmacies: 15,
  },
  {
    name: "Amoxicilina 500mg",
    priceRange: "$8.90 - $25.00",
    category: "Antibiótico",
    pharmacies: 8,
  },
  {
    name: "Omeprazol 20mg",
    priceRange: "$5.40 - $18.70",
    category: "Protector gástrico",
    pharmacies: 10,
  },
  {
    name: "Loratadina 10mg",
    priceRange: "$4.20 - $15.30",
    category: "Antihistamínico",
    pharmacies: 9,
  },
  {
    name: "Metformina 850mg",
    priceRange: "$6.80 - $22.40",
    category: "Antidiabético",
    pharmacies: 11,
  },
]

const PopularMedicinesSection = () => (
  <Section>
    <SectionHeader>
      <SectionTitle>Medicamentos más buscados</SectionTitle>
      <SectionDescription>
        Encuentra rápidamente los medicamentos que más buscan nuestros usuarios
      </SectionDescription>
    </SectionHeader>
    <Grid>
      {popularMedicines.map((medicine, index) => (
        <Card key={index}>
          <CardHeader>
            <CardHeaderFlex>
              <CardTitle>{medicine.name}</CardTitle>
              <Badge variant="secondary">{medicine.category}</Badge>
            </CardHeaderFlex>
            <CardDescription>{medicine.priceRange}</CardDescription>
          </CardHeader>
          <CardContent>
            <MedicineInfo>
              <PharmacyInfo>
                <MapPin size={16} />
                {medicine.pharmacies} farmacias
              </PharmacyInfo>
              <Button variant="outline" size="sm">
                Ver farmacias
              </Button>
            </MedicineInfo>
          </CardContent>
        </Card>
      ))}
    </Grid>
  </Section>
)

export default PopularMedicinesSection
