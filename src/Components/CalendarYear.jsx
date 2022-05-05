

import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { nextYear, prevYear, currentYear, selectMonth } from "../Redux/action";
const CalendarByYear = (props) => {
    const dispatch = useDispatch();
    const year = useSelector((state) => state.yearByShow);
    const dateSave = new Date()
    const date = new Date(year, dateSave.getMonth(), dateSave.getDate());
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    const handleNextYear = () => {
        dispatch(nextYear())
    }
    const handlePrevYear = () => {
        dispatch(prevYear())
    }
    const handleCurrentYear = () => {
        dispatch(currentYear())
    }
    const handleSelectMonth = (e,index) => {
        dispatch(selectMonth(index))
        // console.log(index)
        props.showByYear()
    }
    date.setDate(1);
    const showCalendar = () => {
        const prevDay = new Date(date.getFullYear(), date.getMonth(), 0).getDate(); // số ngày tháng trước đó
        const currentDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
        const firstDayIndex = date.getDay(); // trả ngày trong tuần (0 đến 6, cn là 0)
        const lastDayIndex = new Date(date.getFullYear(), date.getMonth(), 0).getDay();

        const nextDays = 7 - (lastDayIndex + 1);
        const arrDay = [];
        for (let x = firstDayIndex; x > 0; x--) {
            arrDay.push(prevDay - x + 1)
        }
        for (let i = 1; i <= currentDay; i++) {
            arrDay.push(i)
        }
        for (let j = 1; j <= nextDays; j++) {
            arrDay.push(j)
        }
        const result = arrDay.map((item, index) => {
            if (item === new Date().getDate() &&
                date.getMonth() === new Date().getMonth() && date.getFullYear() === new Date().getFullYear()) {
                return (
                    <div className="todayByYear" key={index}>
                        <div>{item}</div>
                    </div>
                )
            } else {
                return (
                    <div className="" key={index}>
                        <div>{item}</div>
                    </div>
                )
            }
        })
        return result
    }
    const showCalendarByYear = () => {
        let arrMonth = []
        for (let i = 1; i <= 12; i++) {
            date.setMonth(i - 1);
            arrMonth.push(showCalendar())
        }
        const result = arrMonth.map((item, index) => {
            return (
                <div onClick={(e) => handleSelectMonth(e,index)} key={index} className="border-radius border border-1 m-2 p-3">
                    <div className="monthStyle text-center ">{months[index]}</div>
                    <div className="dayss">
                        <div>Sun</div>
                        <div>Mon</div>
                        <div>Tue</div>
                        <div>Wed</div>
                        <div>Thu</div>
                        <div>Fri</div>
                        <div>Sat</div>
                    </div>
                    <div className="monthbyyear mt-2" key={index}>
                        {item}
                    </div>
                </div>
            )
        })
        return result
    }
    return (
        
            <div className="calendarByYear">
                <div className="container">
                    <div className="d-flex justify-content-end mt-4">
                        <button onClick={props.showByYear} className="btn-color btn btn-secondary">Month</button>
                        {/* &emsp;
                        <button className="btn-color btn btn-secondary ml-3">Year</button> */}
                    </div>
                    <div className="yearNext d-flex align-items-center justify-content-between mt-4">
                        <i onClick={handlePrevYear} className="fas fa-angle-left prevYear"></i>
                        <div className="Year">
                            <h1 onClick={handleCurrentYear}>{year}</h1>
                        </div>
                        <i onClick={handleNextYear} className="fas fa-angle-right nextYear"></i>
                    </div>
                    <div className="grid-calendar">
                        {showCalendarByYear()}
                    </div>
                </div>
            </div>
     
    )
}
export default CalendarByYear

