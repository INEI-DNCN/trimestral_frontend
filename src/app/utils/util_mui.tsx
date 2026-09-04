export const sectionHeaderSx = {
  marginBottom: '12px',
};

export const getSectionTitleSx = (currentTheme: any) => ({
  color: currentTheme.text,
  fontSize: '13px',
  fontWeight: 600,
  marginBottom: '4px',
});

export const sectionBorder = '1px solid rgba(128, 128, 128, 0.25)';

export const getAccordionStyles = (currentTheme: any) => ({
  backgroundColor: currentTheme.background,
  color: currentTheme.text,
  border: `1px solid ${currentTheme.borderColor}`,
  borderRadius: '10px',
  boxShadow: 'none',
  marginBottom: '6px',
  overflow: 'hidden',

  '&:before': {
    display: 'none',
  },

  '&.Mui-expanded': {
    marginTop: 0,
    marginBottom: '12px',
  },
});

export const getbuttonHistorialStyles = (currentTheme: any) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '7px',
  padding: '7px 12px',
  border: `1px solid ${currentTheme.borderColor}`,
  borderRadius: '7px',
  backgroundColor: 'transparent',
  color: currentTheme.text,
  fontSize: '12px',
  fontWeight: 500,
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  transition: 'all 0.2s ease',

  '&:hover': {
    backgroundColor:
      currentTheme.menu.backgroundActive,
  },
});

export const getAccordionSummaryStyles = (currentTheme: any) => ({
  flexDirection: 'row-reverse',
  minHeight: '52px',

  '& .MuiAccordionSummary-content': {
    margin: 0,
    minWidth: 0,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '42% 38% 20%',
    alignItems: 'center',
  },

  '&.Mui-expanded': {
    minHeight: '52px',
  },

  '&:hover': {
    backgroundColor:
      currentTheme.menu.backgroundActive,
  },
});

export const getSectionDescriptionSxStyles = (currentTheme: any) => ({
  color: currentTheme.text,
  opacity: 0.6,
  fontSize: '12px',
});


