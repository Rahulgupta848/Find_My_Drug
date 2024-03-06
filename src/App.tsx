import NavBar from "./common/NavBar"
import Message from "./common/message"
import RootRoutes from "./routes"

function App() {
  return (
    <div className="">
      <Message/>
      <NavBar />
      <RootRoutes />
    </div>
  )
}

export default App
