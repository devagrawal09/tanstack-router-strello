import { createFileRoute } from '@tanstack/solid-router'
import logo from '../logo.svg'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <main class="min-h-screen flex flex-col items-center justify-center bg-[#282c34] text-white text-[calc(10px+2vmin)] text-center">
      <img
        src={logo}
        class="h-[40vmin] pointer-events-none animate-[spin_20s_linear_infinite]"
        alt="logo"
      />
      <p>
        Edit <code>src/routes/index.tsx</code> and save to reload.
      </p>
      <a
        class="text-[#61dafb] hover:underline"
        href="https://solidjs.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn Solid
      </a>
      <a
        class="text-[#61dafb] hover:underline"
        href="https://tanstack.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn TanStack
      </a>
    </main>
  )
}
