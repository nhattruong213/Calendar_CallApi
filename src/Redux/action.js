export const addActionNext = () => {
   return {
        type: 'nextMonth',
        // payload 
   }
}
export const addActionPrev = () => {
   return {
        type: 'prevMonth',
        // payload 
   }
}
export const currentDay = () => {
   return {
        type: 'currentDay',
        // payload 
   }
}
export const nextYear = () => {
   return {
        type: 'nextYear',
        // payload 
   }
}
export const prevYear = () => {
   return {
        type: 'prevYear',
        // payload 
   }
}
export const currentYear = () => {
   return {
        type: 'currentYear',
        // payload 
   }
}
export const selectMonth = (data) => {
   return {
        type: 'selectMonth',
        payload : data
   }
}
