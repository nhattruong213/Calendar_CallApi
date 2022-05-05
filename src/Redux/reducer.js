const initState = {
    month : new Date().getMonth(),
    year : new Date().getFullYear(),
    yearByShow : new Date().getFullYear()
}

const rootReducer = (state = initState, action) => {
    switch(action.type) {
        case 'nextMonth':
            return {
                ...state,
                month: ( state.month >= 0 && state.month <= 10 ? (++ state.month ) : ( state.month=0 )),
                year: ( state.month > 0 && state.month <= 11 ? (state.year ) : ( ++state.year )),
            }
        case 'prevMonth':
            return {
                ...state,
                month: ( state.month > 0 && state.month <= 11 ? (-- state.month ) : ( state.month=11 )),
                year: ( state.month >= 0 && state.month < 11 ?  (state.year) :( --state.year ) )
            }
        case 'currentDay':
            return {
                ...state,
                month: new Date().getMonth(),
                year : new Date().getFullYear()
            }
        case 'nextYear':
            return {
                ...state,
                yearByShow: state.yearByShow + 1
            }
        case 'prevYear':
            return {
                ...state,
                yearByShow: state.yearByShow - 1
            }
        case 'currentYear':
            return {
                ...state,
                yearByShow : new Date().getFullYear()
            }
        case 'selectMonth':
            // console.log('day')
            return {
                ...state,
                month: action.payload,
                year : state.yearByShow
            }
        default:
        return state;
    }
}
export default rootReducer