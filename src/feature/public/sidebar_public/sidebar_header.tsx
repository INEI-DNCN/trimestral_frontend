import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import React from 'react';


interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const StyledSidebarHeader = styled.div`
  height: 64px;
  min-height: 64px;
  display: flex;
  align-items: center;
  padding: 0 20px;

  > div {
    width: 100%;
    overflow: hidden;
  }

  svg {
    flex-shrink: 0;
    min-width: 40px;
    min-height: 40px;
    width: 50px;
    height: 50px;
    margin-right: 8px;
  }
`;

export const SidebarHeader: React.FC<SidebarHeaderProps> = ({ children, ...rest }) => {



  return (
    <StyledSidebarHeader {...rest}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle1" fontWeight={'1000'} color={"#C11"} fontFamily="Open Sans" >
          PIll Finder
        </Typography>
      </div>
    </StyledSidebarHeader>
  );
};