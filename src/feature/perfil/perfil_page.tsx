import { Typography } from "@mui/material";
import { Calendar, Mail, Shield, User as UserIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ButtonAction from "../../app/components/bottons/button_action";
import ButtonCancel from "../../app/components/bottons/button_cancel";
import { DialogAction } from "../../app/components/enum/enum";
import type { PageProps } from "../../app/components/interface/router_interface";
import { Column, Container, Row } from "../../app/style_components/witgets_style_components";
import { formatDate } from "../../app/utils/util";
import { SidebarSwitchMode } from "../../core/sidebar/private/sidebar_switch_mode";
import type { RootState } from "../../core/store/store";
import { useThemeContext } from "../../core/theme/ThemeContext";
import UserForm from "../private/user/components/user_form";
import UserFormPassword from "../private/user/components/user_form_password";
import { type User } from "./perfil_slice";

const ProfilePage: React.FC<PageProps> = (PageProps) => {
  const { theme, setTheme, themes } = useThemeContext();
  const navigate = useNavigate();

  const colors = themes[theme];

  const handleThemeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTheme = e.target.checked ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("sidebarTheme", newTheme);
  };
  const { oneUser } = useSelector((state: RootState) => state.perfil)

  const handleActions = (action: DialogAction, user?: User) => {
    const dialogContentMap: Record<any, any> = {
      [DialogAction.update]: <UserForm onSnackbar={PageProps.onSnackbar} user={user} handleClose={PageProps.handleCloseDialog} />,
      [DialogAction.password]: <UserFormPassword onSnackbar={PageProps.onSnackbar} user={user} handleClose={PageProps.handleCloseDialog} />,
    };

    PageProps.onDialog({ children: dialogContentMap[action], maxWidth: "sm", title: action });
  };



  return (
    <Container style={{ width: "100vw", padding: "20px 30%", background: colors.backgroundBase }}>
      <header>
        <Row style={{ justifyContent: "center", alignItems: "center" }}>
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, color: themes[theme].text }}
          >
            Perfil
          </Typography>
          <div></div>
        </Row>
      </header>
      <article>
        <Column gap="1rem">
          <SectionCard $bgColor={colors.background}>
            <SectionTitle $color={colors.text}>Información Personal</SectionTitle>
            <Item>
              <IconBox><Shield size={18} /></IconBox>
              <Field>
                <Label>
                  DNI: {oneUser?.user?.dni}
                </Label>
              </Field>
            </Item>

            <Item>
              <IconBox><UserIcon size={18} /></IconBox>
              <Field>
                <Label>Nombres y Apellidos: {oneUser?.user?.name + " " + oneUser?.user?.firtName + " " + oneUser?.user?.lastName}</Label>
              </Field>
            </Item>

            <Item>
              <IconBox><Calendar size={18} /></IconBox>
              <Field>
                <Label>Fecha de Nacimiento: {formatDate(oneUser?.user?.birthday)}</Label>
              </Field>
            </Item>

            <Item>
              <IconBox><Calendar size={18} /></IconBox>
              <Field>
                <Label> Rol: {oneUser?.role.name}</Label>
              </Field>
            </Item>

          </SectionCard>

          <SectionCard $bgColor={colors.background}>
            <SectionTitle $color={colors.text}>Contacto</SectionTitle>
            <Item>
              <IconBox><Mail size={18} /></IconBox>
              <Field>
                <Label>Correo Electrónico: {oneUser?.user?.email}</Label>
              </Field>
            </Item>
          </SectionCard>
          <SectionCard $bgColor={colors.background}>
            <SectionTitle $color={colors.text}>Configuraciones</SectionTitle>
            <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <Row style={{ alignItems: 'center', gap: '0.5rem' }}>
                <IconBox><Shield size={18} /></IconBox>
                <Label>Modo {theme === "dark" ? "Oscuro" : "Claro"}</Label>
              </Row>
              <SidebarSwitchMode
                sx={{ m: 1 }}
                checked={theme === "dark"}
                onChange={handleThemeChange}
              />
            </Row>
          </SectionCard>

          <ActionArea>
            <ButtonCancel onClick={() => navigate(-1)} >Salir</ButtonCancel>
            <ButtonAction onClick={() => handleActions(DialogAction.password, oneUser.user ?? {})} >Cambiar Contraseña</ButtonAction>
            <ButtonAction onClick={() => handleActions(DialogAction.update, oneUser.user ?? {})} >Actualizar</ButtonAction>
          </ActionArea>
        </Column>
      </article>
    </Container>
  );
};

export default ProfilePage;

const SectionCard = styled.section<{ $bgColor: string }>`
  background-color: ${({ $bgColor }) => $bgColor};
  backdrop-filter: blur(8px);
  border-radius: 1.25rem;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.04);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  transition: box-shadow 0.25s ease;
  &:hover {
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.06);
  }
`;

const SectionTitle = styled.h2<{ $color: string }>`
  font-size: 1.1rem;
  font-weight: 600;
  color: ${({ $color }) => $color};
`;

const Item = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  border-bottom: 1px solid #ccc;
  padding-bottom: 0.5rem;
  &:last-child {
    border-bottom: none;
  }
`;

const IconBox = styled.div`
  color: #9ca3af;
  padding-top: 0.1rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.span`
  font-size: 0.75rem;
  font-weight: 500;
  color: #9ca3af;
`;

const ActionArea = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
`;
