export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-rose-50 via-white to-orange-50">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-8 border border-rose-100 text-center space-y-6">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-rose-100 rounded-full text-4xl shadow-inner animate-bounce">
          🍅
        </div>
        
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Enhanced Tomato Math Game
          </h1>
          <p className="text-slate-500 font-medium">
            CIS046-3 – Software for Enterprise Assignment
          </p>
        </div>

        <div className="p-4 bg-rose-50/70 border border-rose-200/60 rounded-2xl text-left space-y-2">
          <div className="flex items-center gap-2 text-rose-700 font-semibold text-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Phase 1: Project Setup &amp; Architecture Established
          </div>
          <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
            <li>Next.js App Router &amp; TypeScript initialized</li>
            <li>Tailwind CSS configured with custom color palettes</li>
            <li>Original Java reference architecture analyzed &amp; preserved</li>
            <li>Folder structure created for components, services, hooks, and utils</li>
          </ul>
        </div>

        <div className="text-xs text-slate-400">
          Ready for Phase 2: Banana API Integration &amp; Puzzle Display
        </div>
      </div>
    </main>
  );
}
