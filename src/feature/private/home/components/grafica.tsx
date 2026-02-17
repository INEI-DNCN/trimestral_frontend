import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Datos reducidos de 2015-I a 2017-IV
const data = [
  { trimestre: "I", anio: "2015", variacion_ivf: 1.16, ivf: 116.8 },
  { trimestre: "II", anio: "2015", variacion_ivf: 3.71, ivf: 176.3 },
  { trimestre: "III", anio: "2015", variacion_ivf: 4.32, ivf: 119.5 },
  { trimestre: "IV", anio: "2015", variacion_ivf: 2.80, ivf: 117.8 },
  { trimestre: "I", anio: "2016", variacion_ivf: 2.53, ivf: 119.8 },
  { trimestre: "II", anio: "2016", variacion_ivf: 1.78, ivf: 179.5 },
  { trimestre: "III", anio: "2016", variacion_ivf: 2.14, ivf: 122.1 },
  { trimestre: "IV", anio: "2016", variacion_ivf: 4.56, ivf: 123.2 },
  { trimestre: "I", anio: "2017", variacion_ivf: -0.63, ivf: 119.0 },
  { trimestre: "II", anio: "2017", variacion_ivf: 0.39, ivf: 180.2 },
  { trimestre: "III", anio: "2017", variacion_ivf: 4.60, ivf: 121.5 },
  { trimestre: "IV", anio: "2017", variacion_ivf: 7.09, ivf: 124.1 }
];

export default function IVFChart() {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          dataKey="trimestre"
          angle={0} 
          textAnchor="middle" 
          height={50} 
          interval={0} 
        />
        <XAxis 
          dataKey="anio" 
          axisLine={false} 
          tickLine={false} 
          height={30} 
          xAxisId="anio" 
          interval={3} 
          tick={({ x, y, payload }) => {
            return (
              <text x={x + 65} y={y + 0} textAnchor="middle" fill="#666" fontSize={12}>
                {payload.value}
              </text>
            );
          }}
        />
        <YAxis yAxisId="left" orientation="left" label={{ value: "Variación %", angle: -90, position: "insideLeft" }} domain={[-10, 15]} />
        <YAxis yAxisId="right" orientation="right" label={{ value: "Índice IVF", angle: -90, position: "insideRight" }} domain={[50, 250]} />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="variacion_ivf" fill="#4CAF50" name="Variación interanual del IVF" barSize={20} />
        <Line yAxisId="right" type="monotone" dataKey="ivf" stroke="#FF9800" name="Índice de volumen físico" strokeWidth={2} dot={{ r: 3 }} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
