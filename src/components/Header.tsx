import { Link } from '@tanstack/solid-router'

export default function Header() {
  return (
    <header class="p-2 flex gap-2 bg-white text-black justify-between">
      <nav class="flex flex-row">
        <div class="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div class="px-2 font-bold">
          <Link to="/demo/tanstack-query">TanStack Query</Link>
        </div>

        <div class="px-2 font-bold">
          <Link to="/demo/store/page1">Store Pg 1</Link>
        </div>

        <div class="px-2 font-bold">
          <Link to="/demo/store/page2">Store Pg 2</Link>
        </div>

        <div class="px-2 font-bold">
          <Link to="/demo/sentry/bad-event-handler">Sentry</Link>
        </div>

        <div class="px-2 font-bold">
          <Link to="/demo/form">Form</Link>
        </div>
      </nav>

      <div></div>
    </header>
  )
}
