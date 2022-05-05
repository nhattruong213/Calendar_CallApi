
import './App.css';
import Canlendar from './Components/Calendar';
import AddModal from './Components/AddModal';
import './Styles/index.css';
import { useState,useEffect } from 'react';
import EditModal from './Components/EditModal';
import CanlendarByYear from './Components/CalendarYear';
import LoginModal from './Components/Login';
import axios from 'axios';
function App() {
  const [key, setKey] = useState('')
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [indexEdit, setIndexEdit] = useState();
  const [content, setContent] = useState('');
  const [showYear, setShowYear] = useState(false);
  const [isLogin, setIsLogin] = useState(localStorage.getItem('token') != null);
  const [task, setTask] = useState([]);
  const [isShow, setIsShow] = useState(false);

  const handleClick = (data) => {
    setKey(data)
    setShow(true);
  }
  const handleClose = () => {
    setShow(false)
  }
  const handleChange = () => {
    setIsShow(!isShow);
  }
  const showCanlendar = () => {
    setIsLogin(true);
  }
  const handleShowLogin = () => {
    setIsLogin(false);
  }
  const handleShowEdit = (id) => {
    setShowEdit(!showEdit)
    setIndexEdit(id)
    setShow(!show)
    const findId = task.filter(function (item) {
      return item.id === id
    });
    if (findId.length) {
      let check = findId.map((item) => {
        return item.content;
      })
      setContent(check)
    }
  }
  const handleCloseEdit = () => {
    setShowEdit(!showEdit);
  }
  const handleShowYear = () => {
    setShowYear(!showYear);
  }
  useEffect(() => {
    const config = {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    }
    axios.get('http://127.0.0.1:8000/api/calendar/getTaskByUser',config)
    .then(res => {
        setTask(res.data);
    })
    .catch(err => {
        // console.log(err.response.data.message)
        if(err.response.data.message === "Unauthenticated.") {
          localStorage.removeItem('token')
        }
    })
  }, [isShow]);
  return (
    <div>
      {isLogin ? 
        <Canlendar
          showByYear={handleShowYear}
          onShow={handleClick}
          showLogin = {handleShowLogin}
          allTask = {task}
        /> :
        <LoginModal showCalendar = {showCanlendar}
        isChange ={handleChange}
        />
      } 
      {show && <AddModal
        closeShow={handleClose}
        changeIsShow = {handleChange}
        showEdit={handleShowEdit}
        dataKey={key} 
        />}
      {showEdit && <EditModal
        content={content}
        dataKey={key}
        dataIndex={indexEdit}
        closeEdit={handleCloseEdit}
        changeIsShow = {handleChange}
      />}
      {showYear && <CanlendarByYear showByYear={handleShowYear} />}
    </div>
  );
}

export default App;
