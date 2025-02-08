export default function LoadingUI() {
  return (
    <div className="h-[600px] rounded-3xl overflow-hidden backdrop-blur-xl bg-black/30 border border-white/10 shadow-2xl flex items-center justify-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin [animation-delay:0.2s]"></div>
      </div>
    </div>
  )
}

