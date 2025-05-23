import { format } from "date-fns";
import { es } from "date-fns/locale";

export const formatDay = (day) => {
  return format(new Date(day), "dd 'de' MMMM", { locale: es });
};

export const formatFullDate = (day) => {
  return format(new Date(day), "dd 'de' MMMM 'de' yyyy", { locale: es });
};
