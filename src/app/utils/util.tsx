export const sleep = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

export const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const hexToRgba = (hex: string, alpha: number): string => {
  const [r, g, b] = hex.match(/\w\w/g)!.map(x => parseInt(x, 16));
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};


export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}/${month}/${day}`;
};

export function timeAgo(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "hace unos segundos";
  if (diffMinutes < 60) return `hace ${diffMinutes} minuto${diffMinutes === 1 ? "" : "s"}`;
  if (diffHours < 24) return `hace ${diffHours} hora${diffHours === 1 ? "" : "s"}`;
  return `hace ${diffDays} día${diffDays === 1 ? "" : "s"}`;
}

interface FormatItemOptions {
  originalItem: Record<string, any>;
  decimal?: number;
  keysDecimals?: Record<string, number>;
}

export const formatItem = ({
  originalItem,
  decimal = 1,
  keysDecimals = {},
}: FormatItemOptions): Record<string, any> => {
  const newItem: Record<string, any> = { ...originalItem };

  Object.keys(originalItem).forEach((key) => {
    if (typeof originalItem[key] === "number") {
      const valor = originalItem[key];
      const decimales = keysDecimals[key] ?? decimal;

      // Redondeo clásico con corrección de precisión
      function roundToDecimals(value: number, decimals = 1) {
        const factor = Math.pow(10, decimals);
        return Math.round((value + Number.EPSILON) * factor) / factor;
      }

      const rounded = roundToDecimals(valor, decimales);

      // Formateo del número
      let valorStr = rounded.toFixed(decimales).replace(".", ",");

      // 🔧 Quitar ceros innecesarios, pero mantener al menos 1 decimal
      valorStr = valorStr.replace(/,(\d*?)0+$/, ",$1"); // quita ceros extra
      valorStr = valorStr.replace(/,$/, ",0");          // asegura al menos 1 decimal

      // Separador de miles con espacio
      valorStr = valorStr.replace(
        /^(-?\d+)(,\d+)?$/,
        (_, intPart, decPart) => {
          intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
          return decPart ? intPart + decPart : intPart;
        }
      );

      newItem[key] = valorStr;
    }
  });

  return newItem;
};


export function hexToARGB(hexColor: any, alpha = 'FF') {
  // Remueve el # si lo tiene
  const cleanHex = hexColor.replace('#', '');
  return alpha + cleanHex.toUpperCase();
}

