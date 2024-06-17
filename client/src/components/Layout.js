import React from 'react';
import '../styles/LayoutStyles.css'
import {adminMenu, userMenu} from '../Data/data';
import {Link,useLocation,useNavigate} from 'react-router-dom'
import { useSelector } from 'react-redux';
import {message,Badge} from 'antd'


const Layout = ({children}) => {
    const {user}=useSelector(state=>state.user)
    const location=useLocation()
    const navigate=useNavigate()

    //logout function
    const handleLogout=()=>{
        localStorage.clear()
        message.success('Logout Successfully')
        navigate('/login')
    }

//doctor menu
const trainerMenu=[
    {
        name:"Home",
        path:"/",
        icon:"fa-solid fa-house",
    },
    {
        name:"Appointment",
        path:"/trainer-appointments",
        icon:"fa-solid fa-list"
    },
    {
        name:"Profile",
        path:`/trainer/profile/${user?._id}`,
        icon:"fa-solid fa-user"
    },
];
//doctor menu

    //rendering menu list
    const SidebarMenu=user?.isAdmin? adminMenu:user?.isTrainer?trainerMenu:userMenu;
  return (
    <>
    <div className="main">
        <div className="layout">
            <div className="sidebar">
                <div className="logo">
                    <h6>WORKOUT BUDDY</h6>
                    <hr/>
                </div>
                <div className="menu">
                    {SidebarMenu.map(menu =>{
                        const isActive=location.pathname===menu.path
                        return(
                            <>
                            <div className={`menu-item ${isActive && "active"}`}>
                                <i className={menu.icon}></i>
                                <Link to={menu.path}>{menu.name}</Link>
                            </div>
                            </>
                        )
                    })}
                    <div className={`menu-item `} onClick={handleLogout}>
                                <i className="fa-solid fa-right-from-bracket"></i>
                                <Link to="/login">Logout</Link>
                            </div>
                </div>
            </div>
            <div className="content">
                <div className="header">
                    <div className="header-content" style={{cursor:"pointer"}}>
                    <Badge count={user && user.notification.length} onClick={()=>{
                        navigate('/notification')
                    }}
                    
                    >
                    <i class="fa-solid fa-bell"></i>
                    </Badge>
                    
                    <Link to="/profile">{user?.name}</Link>
                    </div>
                </div>
                <div className="body">{children}</div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Layout