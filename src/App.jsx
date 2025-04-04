import { useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import authServices from "./appwrite/auth/auth"
import {logIn , logOut} from "./store/authSlice"
import {Header ,Fotter} from "./components"
import { Outlet } from "react-router-dom";


function App() {
  const [Loading, SetLoading] = useState(true);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   authServices.getCurrentUser()
  //   .then((userData) => {
  //     if(userData){
  //       dispatch(logIn({userData}));        
  //     }
  //     else{
  //       dispatch(logOut());
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("error in getting the user", err );
  //   })
  //   .finally(
  //     () => SetLoading(false)
  //   )
  // },[])

 return !Loading ?
  <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
    <div className="w-full block">
      < Header/>
      <main>
       Todo : {/* <Outlet /> */}
      </main>
      <Fotter />
    </div>    
 </div> 
 : null
}

export default App
