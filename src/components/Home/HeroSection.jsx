export default function HeroSection() {
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'בוקר טוב' : hour < 17 ? 'צהריים טובים' : 'ערב טוב'

  return (
    <div className="relative h-[280px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=400&fit=crop"
        alt="אוכל בריא"
        className="w-full h-full object-cover"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Logo */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/20 backdrop-blur-sm rounded-full py-1 pl-3 pr-1">
        <span className="text-white font-bold text-sm">דובון</span>
        <img src="/dubon-icon-512.png" alt="דובון" className="w-8 h-8 rounded-full" />
      </div>

      {/* Greeting */}
      <div className="absolute bottom-6 right-6 left-6">
        <p className="text-white/80 text-sm mb-1">{greeting} ✦</p>
        <h1 className="text-white text-2xl font-bold">מה נבשל היום?</h1>
      </div>
    </div>
  )
}
