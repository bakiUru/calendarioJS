const year1 = 2024
const locale = 'es'
//internalizacion del calendario 
//primer parametro lenguaje, segundo nombre del mes

const createCalendar = ({locale,year}) =>{
    const intlMonth = new Intl.DateTimeFormat(locale,{ month: 'long'})
    const intlWeek = new Intl.DateTimeFormat(locale,{weekday: 'short'})
    const months = [...Array(12).keys()]
    const week = [...Array(7).keys()]
    
    const WeekDaysNames=(monthKey) =>{
       return   week.map(weekKey=> intlWeek.format(new Date(year,monthKey,weekKey +1))
        )
    
    } 
        
    
    const calendar = months.map(monthKey=>{
        let monthName = intlMonth.format(new Date(year,monthKey))
        const nextMonthIndex = monthKey +1
        const dayOfMonth = new Date(year,nextMonthIndex,0).getDate()
        const startMonth = WeekDaysNames(monthKey)
        //console.log(startMonth)
        //Para que empiece con mayus el mes
        monthName = [...monthName]
        monthName[0] = monthName[0].toUpperCase()
        monthName = monthName.join('')
    
        return {
            year,
            monthName,
            dayOfMonth,
            startMonth,
        }
    })
    
    const renderCalendar =calendar.map(({dayOfMonth,startMonth, monthName})=>{
        const days = [...Array(dayOfMonth).keys()]
        const renderWeek = startMonth.map(dayWeek => `<li>${dayWeek}</li>`).join('')
        
        const renderDays = days.map(day=>`<li  value=${day+1}>${day+1}</li>`).join('')
        const calendarTitle = `<h1>${monthName} ${year}</h1>` 
        
        return  `${calendarTitle}<div class='day-name'>${renderWeek}</div><ol>${renderDays}</ol>`
    
    }).join('')
    
    document.querySelector('div').innerHTML = renderCalendar
    
    //prueba evento en el DOM
    document.addEventListener('click',event =>{
        console.log(event.target.value)
    })
    
    
    //devuelvo el Calendario
    return calendar
    

}
/*
let timeMonth = new Date()
console.log(timeMonth)
timeMonth = intlMonth.format(new Date(year,timeMonth.getMonth()))
console.log(timeMonth)

*/
const calendar = createCalendar({locale:'es',year:2000})
console.log(calendar)

const renderOnlyMonth = (calendar,nameMonth) =>{
    const year = calendar[0].year
    let days =[]
    let weeks = []
    calendar.map(({dayOfMonth,startMonth, monthName})=>{
        dayOfMonth = [...Array(dayOfMonth).keys()]
        const renderWeek = startMonth.map(dayWeek =>{ 
            `<li>${dayWeek}</li>`
            
        }).join('')
        const renderDays = dayOfMonth.map((day)=>{
            `<li value=${day+1} >${day+1}</li>`
        }).join('')
        const newDivMonth = document.createElement('div')
        newDivMonth.innerHTML = 
        `
        <h1>${monthName} ${year}</h1>
        <div class='day-name'>${renderWeek}</div><ol>${renderDays}</ol>`
        
        if(monthName.toLowerCase() === nameMonth)
        document.querySelector('div').append(newDivMonth)
        days = dayOfMonth.map(day => day)
        weeks = startMonth.map(daysW => daysW)
        })    
        return {weeks,days}
        
                
        
 
}

const objetoMes = renderOnlyMonth(calendar,'julio')
console.log(objetoMes)