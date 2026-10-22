import { useEffect, useRef, useState } from 'react'

export default function Header({ openBookingModal }) {
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  const copySiteLink = () => {
    const dummy = document.createElement('input')
    document.body.appendChild(dummy)
    dummy.value = window.location.href
    dummy.select()
    document.execCommand('copy')
    document.body.removeChild(dummy)

    setCopied(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 2000)
  }

  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-blush-100 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <a href="#" className="flex items-center gap-3 group">
                <div className="w-11 h-11 rounded-2xl gradient-pink-btn flex items-center justify-center text-white text-xl shadow-md transform group-hover:rotate-6 transition-transform">
                    🎀
                </div>
                <div>
                    <span className="text-lg font-black tracking-tight text-rosewood-800 block leading-none">Մանկավարժ Մայրիկ</span>
                    <span className="text-[11px] text-blush-500 font-bold">Լիլիթ Խաչատրյան</span>
                </div>
            </a>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-bold text-slate-600">
                <a href="#about" className="hover:text-blush-500 transition-colors flex items-center gap-1.5">
                    <span>🎀</span> Իմ մասին
                </a>
                <a href="#experience" className="hover:text-blush-500 transition-colors flex items-center gap-1.5">
                    <span>🌸</span> Փորձ
                </a>
                <a href="#topics" className="hover:text-blush-500 transition-colors flex items-center gap-1.5">
                    <span>💕</span> Տարիքային խմբեր
                </a>
                <a href="#services" className="hover:text-blush-500 transition-colors flex items-center gap-1.5">
                    <span>✨</span> Ծառայություններ
                </a>
                <a href="#contact" className="hover:text-blush-500 transition-colors flex items-center gap-1.5">
                    <span>💌</span> Կապ
                </a>
            </nav>

            <div className="flex items-center gap-3">
                <button onClick={() => copySiteLink()} id="copy-link-btn" className="px-4 py-2 rounded-full text-xs font-bold bg-blush-100 text-blush-600 hover:bg-blush-200 transition-all border border-blush-200 hidden sm:flex items-center gap-2">
                    <i className={`fa-solid fa-heart ${copied ? 'text-blush-500' : 'text-blush-400'}`}></i>
                    <span>{copied ? 'Պատճենված է' : 'Կիսվել'}</span>
                </button>
                <button onClick={() => openBookingModal()} className="gradient-pink-btn text-white px-5 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2">
                    <span>🎀</span>
                    <span>Գրանցվել</span>
                </button>
            </div>
        </div>
    </header>
  )
}
