import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <div className="bg-background min-h-screen text-gray-900 dark:text-white transition-colors duration-300">
      <div className="mx-auto p-4 container">
        <div className="flex justify-end">
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}

export default App
