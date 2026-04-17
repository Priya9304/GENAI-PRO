import {RouterProvider} from "react-router-dom";
import { router } from "./app.routes.jsx";
import { AuthProvider } from "./features/auth/auth.context.jsx";
function App() {
  return (
    // This will give the access of user,setUser,loading,setloading
    <AuthProvider>
      <RouterProvider router = {router}/>
    </AuthProvider>
  )
}
export default App
