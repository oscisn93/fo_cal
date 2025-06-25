import reactLogo from '@/assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ModeToggle } from '@/components/mode-toggle'
import { Counter } from '@/features/counter/Counter'
import  Navbar, { type NavbarItem } from "@/components/navbar";

const navbarItems = [
  {
    text: "Vite",
    link: "https://vite.dev",
    iconURL: viteLogo
  },
  {
    text: "React",
    link: "https://react.dev",
    iconURL: reactLogo
  }
] as NavbarItem[];

function App() {
  return (
    <div className='w-svw h-svh'>
      <Navbar items={navbarItems}>
        <ModeToggle />
      </Navbar>
      <h1>Vite + React</h1>
      <div className="card">
        <Counter /> 
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  )
}

export default App
