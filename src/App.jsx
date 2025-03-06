
import './App.css'
import Footer from './components/Footer'
import Manager from './components/Manager'
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow  bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <Manager />
      </main>
      <Footer />
    </div>
    </>
  )
}

export default App
