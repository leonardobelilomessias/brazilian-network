import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(dateString: string) {
  const date = parseISO(dateString);

  return {
    extendTime: format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR }),
    time: format(date, 'HH:mm'),
    minutes: format(date, 'mm'),
    hours: format(date, 'HH'),
    dateBR: format(date, 'dd/MM/yyyy'),
    day: format(date, 'dd'),
    monthFull: format(date, 'MMMM', { locale: ptBR }),
    year: format(date, 'yyyy'),
    timestamp: date.getTime()
  };
}

// Exemplo de uso
// export function exampleUsage() {
//   const formattedDate = formatDate('2025-03-04T18:53:31.058082');
  
//   console.log(formattedDate.extendTime);   // 04 de março de 2025
//   console.log(formattedDate.time);         // 18:53
//   console.log(formattedDate.minutes);      // 53
//   console.log(formattedDate.hours);        // 18
// }


// Exemplo de uso:


// const dateInfo = formatDate('2025-03-04T18:53:31.058082');

// console.log(dateInfo.extendTime);  // 04 de março de 2025
// console.log(dateInfo.time);        // 18:53
// console.log(dateInfo.minutes);     // 53
// console.log(dateInfo.hours);       // 18

