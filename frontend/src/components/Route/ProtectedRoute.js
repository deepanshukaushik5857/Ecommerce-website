// import React, { Fragment } from 'react';
// import { useSelector } from 'react-redux';
// import { Route,Routes,useNavigate } from 'react-router-dom';

// const ProtectedRoute = ({element:Component,...rest}) => {
//     const Navigate = useNavigate();
//     const {user,isAuthenticated,loading} = useSelector(state=>state.user);
//     return (
//         <Fragment>
//             {!loading && (
//                 <Routes>
//                     <Route
//                     {...rest}
//                     render={(props)=>{
//                         if(!isAuthenticated){
//                             return <Navigate to="/login"/>
//                         }
//                         return <Component {...props}/>
//                     }}
//                 />
//                 </Routes>
//             )
//             }
//         </Fragment>
//     )
// }

// export default ProtectedRoute













// import { Navigate, Route } from "react-router-dom";

// const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
//   const { loading, isAuthenticated } = useSelector((state) => state.user);

//   return (
//     <Fragment>
//       {loading === false && (
//         <Route
//           {...rest}
//           render={(props) => {
//             if (isAuthenticated === false) {
//               return <Navigate to="/login" />;
//             }

//             // if (isAdmin === true && user.role !== "admin") {
//             //   return <Navigate to="/login" />;
//             // }

//             return <Component {...props} />;
//           }}
//         />
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;




// import React, { Fragment } from "react";
// import { useSelector } from "react-redux";
// import { Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ isAdmin, element: Component, ...rest }) => {
//   const { loading, isAuthenticated } = useSelector((state) => state.user);
//   return (
//     <Fragment>
//       {loading === false && (
       
//          <Route
//         {...rest}
//         element={isAuthenticated ? <Component /> : <Navigate to="/login" replace />}
//       />
       
//       )}
//     </Fragment>
//   );
// };

// export default ProtectedRoute;


import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
  const { isAuthenticated } = useSelector((state) => state.user);
  if(isAuthenticated === false){
    return <Navigate to={"/login"}/>
  }
  return children;
}

export default ProtectedRoute

