import axios from "axios";
import React, { useState, useEffect } from "react";
const AddModal = (props) => {
    const [job, setJob] = useState('');
    const [typeJob, setTypeJob] = useState('');
    // const [img, setImg] = useState('');
    const [taskByDate, setTaskByDate] = useState([]);
    const dataid = props.dataKey
    const [isShow, setIsShow] = useState(true);
    const [event, setEvent] = useState([]);
    const [err, setErr] = useState();
    const handleSubmit = () => {
        const data = {
            event_id: typeJob,
            content: job,
            date: dataid
        }
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }
        axios.post('http://127.0.0.1:8000/api/calendar/store', data, config)
            .then(res => {
                props.changeIsShow();
                setJob('')
                props.closeShow();
            })
            .catch(err => {
                setErr(err.response.data.message)
            })
        
    }
    const handleEditTask = (e, id) => {
        props.showEdit(id);
    }
    const handleDeleteTask = (e, id) => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            }
        }
        axios.delete(`http://127.0.0.1:8000/api/calendar/delete/${id}`, config)
            .then(res => {
                props.changeIsShow();
                setIsShow(!isShow)
            })
            .catch(err => {
                console.log(err)
            })
    }

    useEffect(() => {
        const config = {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }
        axios.get(`http://127.0.0.1:8000/api/calendar/${dataid}`, config)
            .then(res => {
                setTaskByDate(res.data);
            })
            .catch(err => {
                console.log(err)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isShow]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/getEvent')
            .then(res => {
                setEvent(res.data);
            })
            .catch(err => {
                console.log(err)
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function showTasks() {
        const result = taskByDate.map((element, index) => {
            return (
                <li style={{background: element.events.color}} key={index}>
                    {element.content}
                    <button className="btnEdit"><i onClick={(e) => handleEditTask(e, element.id)} className="fa-solid fa-pen-to-square"></i></button>
                    <span className="icon"><i onClick={(e) => handleDeleteTask(e, element.id)} className="fas fa-trash"></i></span>
                </li>
            )
        });
        return result


    }
    return (
        <div className="modalAdd">
            <div className="container">
                <div className="showTask">
                    <div className="icon"><i onClick={props.closeShow} className="fa-solid fa-xmark"></i></div>
                    <h1 className="mt-5">To do list</h1>
                    <div className="aa">
                        <p>{props.dataKey}</p>
                    </div>
                    <div className="inputField">
                        <label htmlFor="task">Enter Task <span className="required">(*)</span></label>
                        <input id="task" className="w-100" value={job} onChange={(e) => setJob(e.target.value)} type="text" placeholder="Enter New Task"></input> <br />
                        <label className="mt-2" htmlFor="type">Select type <span className="required">(*)</span> </label>
                        <select id="type" className="w-100 custom-select p-1" value={typeJob} onChange={(e) => setTypeJob(e.target.value)}>
                            <option>Type job </option>
                            {event.length > 0 && event.map((item) => (
                                 <option key={item.id} value={item.id}>{item.type}</option>
                            ))}
                        </select>
                        <br />
                        {err ? <p className="errRequired">{err}</p> : ''}
                        <button onClick={handleSubmit} className="btn btn-secondary mt-3 w-100">Add</button>
                    </div>
                    <ul className="todoList mt-5">
                        {showTasks()}
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default AddModal