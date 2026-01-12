import Portfolio from "./portfolio/Portfolio"

export default function Home() {
  return (
    <div className="flex w-full justify-between">
      <div className="flex w-full justify-center pt-2 md:pt-8">
        <Portfolio />
      </div>
    </div>
  )
}
