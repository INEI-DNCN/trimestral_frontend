import {
  Box,
  Skeleton,
  Typography
} from '@mui/material';
import {
  FileText,
  UserRound,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { getEstadoConfig } from '../../../../app/utils/util';
import { formatFechaAmPm } from '../../../../app/utils/utils_date';
import type { RootState } from '../../../../core/store/store';
import { useThemeContext } from '../../../../core/theme/ThemeContext';

export default function HistorialComentario() {
  const { currentTheme, theme } = useThemeContext();
  const { comentarioHistorico, loading } = useSelector(
    (state: RootState) => state.comment
  );

  const getTipoCambio = (tipoCambio?: string | null) => {
    if (tipoCambio === 'ESTADO') return 'Estado actualizado';
    if (tipoCambio === 'CONTENIDO') return 'Contenido actualizado';
    if (tipoCambio === 'CONTENIDO_ESTADO') return 'Contenido y estado actualizados';
    return 'Actualización registrada';
  };

  if (loading.comentarioHistorico) {
    return (
      <Box sx={{ width: '100%', padding: '8px 4px', boxSizing: 'border-box' }}>
        <Box sx={{ position: 'relative', paddingLeft: '30px' }}>
          <Box sx={{ position: 'absolute', left: '8px', top: '8px', bottom: '8px', width: '1px', backgroundColor: currentTheme.borderColor }} />

          {Array.from({ length: 3 }).map((_, index) => (
            <Box key={index} sx={{ position: 'relative', marginBottom: index === 2 ? 0 : '20px' }}>
              <Box sx={{ position: 'absolute', left: '-30px', top: '5px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: currentTheme.background, border: `2px solid ${currentTheme.borderColor}`, zIndex: 1 }} />

              <Box sx={{ padding: '15px 16px', backgroundColor: currentTheme.background, border: `1px solid ${currentTheme.borderColor}`, borderRadius: '9px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                  <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="55%" height={20} sx={{ bgcolor: currentTheme.borderColor }} />
                    <Skeleton variant="text" width="30%" height={16} sx={{ bgcolor: currentTheme.borderColor, marginTop: '2px' }} />
                  </Box>

                  <Skeleton variant="rounded" width={85} height={28} sx={{ bgcolor: currentTheme.borderColor, borderRadius: '6px' }} />
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                  <Skeleton variant="circular" width={14} height={14} sx={{ bgcolor: currentTheme.borderColor }} />
                  <Skeleton variant="text" width="25%" height={17} sx={{ bgcolor: currentTheme.borderColor }} />
                </Box>

                <Box sx={{ padding: '14px 16px', borderRadius: '8px', backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.03)' : '#FFFFFF', border: `1px solid ${currentTheme.borderColor}` }}>
                  <Skeleton variant="text" width="100%" height={17} sx={{ bgcolor: currentTheme.borderColor }} />
                  <Skeleton variant="text" width="95%" height={17} sx={{ bgcolor: currentTheme.borderColor }} />
                  <Skeleton variant="text" width="88%" height={17} sx={{ bgcolor: currentTheme.borderColor }} />
                  <Skeleton variant="text" width="72%" height={17} sx={{ bgcolor: currentTheme.borderColor }} />
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    );
  }

  if (!comentarioHistorico.length) {
    return (
      <Box sx={{ minHeight: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '10px', color: currentTheme.text, opacity: 0.55 }}>
        <FileText size={32} />
        <Typography sx={{ fontSize: '13px' }}>
          No existen registros históricos.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', padding: '8px 4px', boxSizing: 'border-box' }}>
      <Box sx={{ position: 'relative', paddingLeft: '30px' }}>
        <Box sx={{ position: 'absolute', left: '8px', top: '8px', bottom: '8px', width: '1px', backgroundColor: currentTheme.borderColor }} />

        {comentarioHistorico.map((registro, index) => {
          const estadoConfig = getEstadoConfig(registro.estado);
          const tipoCambio = registro.tipo_cambio;

          return (
            <Box key={registro.id ?? `${registro.id_comentario}-${index}`} sx={{ position: 'relative', marginBottom: index === comentarioHistorico.length - 1 ? 0 : '20px' }}>
              <Box sx={{ position: 'absolute', left: '-30px', top: '5px', width: '16px', height: '16px', borderRadius: '50%', backgroundColor: currentTheme.background, border: `2px solid ${estadoConfig.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
                <Box sx={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: estadoConfig.color }} />
              </Box>

              <Box sx={{ padding: '15px 16px', backgroundColor: currentTheme.background, border: `1px solid ${currentTheme.borderColor}`, borderRadius: '9px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '10px' }}>
                  <Box>
                    <Typography sx={{ fontSize: '13px', fontWeight: 600, color: currentTheme.text }}>
                      {getTipoCambio(tipoCambio)}
                    </Typography>

                    <Typography sx={{ fontSize: '11px', opacity: 0.55, marginTop: '3px' }}>
                      {registro.fecha_cambio ? formatFechaAmPm(registro.fecha_cambio) : 'Fecha no registrada'}
                    </Typography>
                  </Box>

                  {tipoCambio === 'ESTADO' && registro.estado && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px', color: estadoConfig.color, padding: '5px 8px', borderRadius: '6px', backgroundColor: `${estadoConfig.color}18` }}>
                      {estadoConfig.icon}

                      <Typography sx={{ fontSize: '11px', fontWeight: 600, color: estadoConfig.color }}>
                        {registro.estado}
                      </Typography>
                    </Box>
                  )}
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: tipoCambio === 'CONTENIDO' ? '12px' : 0, opacity: 0.7 }}>
                  <UserRound size={14} />

                  <Typography sx={{ fontSize: '12px' }}>
                    {registro.usuario ?? 'Usuario no registrado'}
                  </Typography>
                </Box>

                {tipoCambio === 'CONTENIDO' && registro.contenido && (
                  <Box sx={{ marginTop: '12px', padding: '14px 16px', borderRadius: '8px', backgroundColor: '#FFFFFF', border: '1px solid rgba(0, 0, 0, 0.08)', maxHeight: '220px', overflowY: 'auto', boxShadow: '0 1px 2px rgba(0, 0, 0, 0.04)' }}>
                    <Typography component="div" sx={{ fontSize: '12px', lineHeight: 1.65, color: '#263238', '& p': { margin: '0 0 8px' }, '& p:last-child': { marginBottom: 0 }, '& mark': { color: 'inherit' } }} dangerouslySetInnerHTML={{ __html: registro.contenido }} />
                  </Box>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}