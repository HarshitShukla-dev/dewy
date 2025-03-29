import Navbar from "./components/Navbar"
import MainSection from "./sections/MainSection"

function App() {
  return (
    <div className="flex flex-col bg-zinc-200 dark:bg-zinc-950 min-h-dvh font-mono text-zinc-900 dark:text-zinc-100 transition-colors">
      <Navbar />
      <MainSection />
    </div>
  )
}

export default App
