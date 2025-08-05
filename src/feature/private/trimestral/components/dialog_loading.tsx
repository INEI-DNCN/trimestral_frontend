import { Dialog } from '@mui/material';
import React from 'react';
import { styled } from 'styled-components';
import { Column } from '../../../../app/style_components/witgets_style_components';
import LoadingEstaditica from './icons/loading_Estadistica';

interface Props {
  open: boolean;
}

const DialogLoading: React.FC<Props> = ({
  open
}) => {

  return (
    <Dialog open={open}
      slotProps={{
        paper: {
          sx: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
          },
        },
      }}
    >
      <Column style={{ padding: '20px ' }}>
        <Column style={{ alignItems: 'center', position: 'relative' }}>
          <LoadingEstaditica height={500} width={500} />
          <StyledWrapper>
            <div className="Cargando" />
          </StyledWrapper>
        </Column>
      </Column>
    </Dialog>
  );
};

export default DialogLoading;


const StyledWrapper = styled.div`
  .Cargando {
	position: absolute;
    width: fit-content;
	bottom: 60px;
	left: 170px;
    font-size: 40px;
    font-family: monospace;
    font-weight: bold;
    text-transform: uppercase;
    color: #0000;
    -webkit-text-stroke:1px #3b82f6;
    --g: conic-gradient(#3b82f6 0 0) no-repeat text;
    background:
      var(--g) 0,
      var(--g) 1ch,
      var(--g) 2ch,
      var(--g) 3ch,
      var(--g) 4ch,
      var(--g) 5ch,
      var(--g) 6ch,
      var(--g) 7ch,
      var(--g) 8ch,
      var(--g) 9ch,
      var(--g) 10ch;
    animation:
      l20-0 1.5s linear infinite alternate,
      l20-1 3s linear infinite;
  }
  .Cargando:before {
    content: "Cargando...";
  }
  @keyframes l20-0 {
    0% {
      background-size:
        1ch 0,
        1ch 0,
        1ch 0,
        1ch 0,
        1ch 0,
        1ch 0,
        1ch 0,
        1ch 0;
    }
    25% {
      background-size:
        1ch 100%,
        1ch 50%,
        1ch 0,
        1ch 0,
        1ch 0,
        1ch 0,
        1ch 50%,
        1ch 100%;
    }
    50% {
      background-size:
        1ch 100%,
        1ch 100%,
        1ch 50%,
        1ch 0,
        1ch 0,
        1ch 50%,
        1ch 100%,
        1ch 100%;
    }
    75% {
      background-size:
        1ch 100%,
        1ch 100%,
        1ch 100%,
        1ch 50%,
        1ch 50%,
        1ch 100%,
        1ch 100%,
        1ch 100%;
    }
    to {
      background-size:
        1ch 100%,
        1ch 100%,
        1ch 100%,
        1ch 100%,
        1ch 100%,
        1ch 100%,
        1ch 100%,
        1ch 100%;
    }
  }
  @keyframes l20-1 {
    0%,
    50% {
      background-position-y: 100%;
    }
    50.01%,
    to {
      background-position-y: 0;
    }
  }`;

