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
    <header className="sticky top-0 z-40 bg-ivory/90 backdrop-blur border-b border-plum/10 px-4 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
            <a href="#" className="flex items-center gap-3 group">
                <div>
                    <span className="font-serif text-xl font-semibold text-plum block leading-tight">Մանկավարժ Մայրիկ</span>
                    <span className="text-sm font-medium text-berry">Լիլիթ Խաչատրյան</span>
                </div>
            </a>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-ink/75">
                <a href="#about" className="hover:text-plum hover:underline decoration-berry decoration-2 underline-offset-8 transition-colors flex items-center gap-1.5">
                    Իմ մասին
                </a>
                <a href="#experience" className="hover:text-plum hover:underline decoration-berry decoration-2 underline-offset-8 transition-colors flex items-center gap-1.5">
                    Փորձ
                </a>
                <a href="#topics" className="hover:text-plum hover:underline decoration-berry decoration-2 underline-offset-8 transition-colors flex items-center gap-1.5">
                    Տարիքային խմբեր
                </a>
                <a href="#services" className="hover:text-plum hover:underline decoration-berry decoration-2 underline-offset-8 transition-colors flex items-center gap-1.5">
                    Ծառայություններ
                </a>
                <a href="#contact" className="hover:text-plum hover:underline decoration-berry decoration-2 underline-offset-8 transition-colors flex items-center gap-1.5">
                    Կապ
                </a>
            </nav>

            <div className="flex items-center gap-3">
                <button onClick={() => copySiteLink()} id="copy-link-btn" className="btn-secondary px-4 py-2 text-sm font-medium hidden sm:flex items-center gap-2">
                    <i className={`fa-solid ${copied ? 'fa-check' : 'fa-link'} text-berry`}></i>
                    <span>{copied ? 'Պատճենված է' : 'Կիսվել'}</span>
                </button>
                <button onClick={() => openBookingModal()} className="btn-primary px-5 py-2.5 text-sm font-medium flex items-center gap-2">
                    
                    <span>Գրանցվել</span>
                </button>
            </div>
        </div>
    </header>
  )
}
