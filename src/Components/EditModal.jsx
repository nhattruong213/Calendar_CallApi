import axios from "axios";
import { useState, useEffect } from "react"
const EditModal = (props) => {
  const index = props.dataIndex;
  const [contentEdit, setContentEdit] = useState(props.content);
  const [typeJob, setTypeJob] = useState('');
  const [event, setEvent] = useState([]);
  const [err, setErr] = useState();
  const handleEdit = () => {

    const data = {
      event_id: typeJob,
      content: contentEdit,
      // img: img
    }
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    }
    axios.put(`http://127.0.0.1:8000/api/calendar/edit/${index}`, data, config)
      .then(res => {
        props.changeIsShow();
        props.closeEdit()
      })
      .catch(err => {
        setErr(err.response.data.message)
      })
 
  }
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
  return (
    <div className="modalAdd">
      <div className="container">
        <div className="showTask">
          <div className="icon"><i onClick={props.closeEdit} className="fa-solid fa-xmark"></i></div>
          <h1 className="mt-5">Edit Task</h1>
          <div className="aa">
            <p>{props.dataKey}</p>
          </div>
          <div className="inputField">
            <label htmlFor="task">Enter Task <span className="required">(*)</span></label>
            <input id="task" className="w-100" onChange={(e) => setContentEdit(e.target.value)} value={contentEdit} type="text" placeholder="Enter New Task"></input> <br />
            <label className="mt-2" htmlFor="type">Select type <span className="required">(*)</span> </label>
            <select className="w-100 custom-select mt-2 p-1" value={typeJob} onChange={(e) => setTypeJob(e.target.value)}>
              <option>Loại công việc</option>
              {event.length > 0 && event.map((item) => (
                <option key={item.id} value={item.id}>{item.type}</option>
              ))}
            </select>
            {err ? <p className="errRequired">{err}</p> : ''}
            <button onClick={handleEdit} className="btn btn-secondary w-100 mt-3">Edit</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditModal