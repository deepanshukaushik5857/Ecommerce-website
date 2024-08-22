import React, { Fragment,useState } from 'react';
import "./Header.css";
import {SpeedDial,SpeedDialAction} from "@material-ui/lab";
import { MdDashboard } from 'react-icons/md';
import { MdPerson } from 'react-icons/md';
import { MdExitToApp } from 'react-icons/md';
import { MdListAlt } from 'react-icons/md';
import { CgShoppingCart } from 'react-icons/cg'; 
import {useNavigate} from "react-router-dom";
import {useAlert} from "react-alert"
import { logout } from '../../../actions/userAction';
import { useDispatch,useSelector } from 'react-redux';
import { Backdrop } from '@material-ui/core';


const UserOptions = ({user}) => {
    const { cartItems} = useSelector((state) => state.cart);
    const validCartItems = cartItems || [];
    const [open, setOpen] = useState(false);
    const history = useNavigate();
    const alert = useAlert();
    const dispatch = useDispatch();
    const options = [
        ...(user.role === "admin" ? [{ icon: <MdDashboard />, name: 'Dashboard', func: dashboard }] : []),
        { icon: <MdListAlt />, name: "Orders", func: orders },
        { icon: <MdPerson />, name: "Profile", func: account },
        { icon: <CgShoppingCart />, name: `Cart(${validCartItems.length})`, func: cart },
        { icon: <MdExitToApp />, name: "Logout", func: logoutUser },
    ];

    // if(user.role === "admin"){
    //     options.unshift({
    //         icon:<MdDashboard/>,
    //         name:'Dashboard',
    //         func:dashboard

    //     })
    // }


    function dashboard() {
        history("/admin/dashboard");
      }
    function orders() {
        history("/orders");
      }
      function account() {
        history("/account");
      }
      function cart() {
        history("/cart");
      }
      function logoutUser() {
        dispatch(logout());
        alert.success("Logout Successfully");
      }



    return (
       <Fragment>
        <Backdrop open={open} style={{zIndex:"10"}}/>
            <SpeedDial
                ariaLabel='speed Dial tooltip example'
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                direction='down'
                style={{zIndex:"11"}}
                className='speedDial'
                icon={
                    <img

                        className='speedDialIcon'
                        src={user.avatar.url ? user.avatar.url : '/profile.png'}
                        alt='profile'
                    />
                }
            >
                {
                    options.map((item)=>(
                        <SpeedDialAction
                            key={item.name}
                            icon={item.icon}
                            tooltipTitle={item.name}
                            tooltipOpen={window.innerWidth<=600?true:false}
                            onClick={item.func}
                        />
                    ))
                }

            </SpeedDial>
       </Fragment>
    )
}

export default UserOptions
