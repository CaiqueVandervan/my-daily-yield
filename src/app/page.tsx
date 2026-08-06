import NavBar from "@/components/NavBar";
import Content from "@/components/Content";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <NavBar />
      <Content />
    </main>
  )
}
