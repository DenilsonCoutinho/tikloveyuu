import { MemoriesForm } from "./components/memories-form";

export default function Home() {
  return (
    <main className="flex min-h-dvh justify-center px-4 py-10 md:py-16 bg-defaultBg">
      <div className="w-full max-w-[700px]">
        <MemoriesForm />
      </div>
    </main>
  )
}
