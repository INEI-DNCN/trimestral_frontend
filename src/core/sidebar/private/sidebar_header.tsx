import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';
import Logo from '../../logo/logo';
import { useThemeContext } from '../../theme/ThemeContext';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onIconClick: () => void;
}

export const SidebarHeader: React.FC<Props> = ({ onIconClick }) => {

  const { theme } = useThemeContext();
  return (
    <Wrapper>
      <div className="content">
        <div onClick={onIconClick}>
          <Logo />
        </div>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          color={theme === 'dark' ? '#e6f0ff' : '#1f1f1f'}
          fontFamily="'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        >
          SPCN
        </Typography>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  margin-bottom: 10px;
  margin-top: 16px;

  .content {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    overflow: hidden;
  }
`;