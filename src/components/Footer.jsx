export default function Footer() {
  return (
    <footer className="bg-rosewood-900 text-blush-100 py-10 px-4 lg:px-8 border-t border-rosewood-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <div className="flex items-center gap-3">
                <span className="text-2xl">🎀</span>
                <div>
                    <span className="text-base font-black text-white block">Լիլիթ Խաչատրյան</span>
                    <span className="text-[11px] text-blush-200">«Մանկավարժ Մայրիկ» • Սոցիալական Մանկավարժ</span>
                </div>
            </div>

            <div className="text-xs text-blush-200 space-y-1">
                <div>+374 (77) 71-66-14 | poghosyanlilit05@gmail.com</div>
                <div>© 2026 Լիլիթ Խաչատրյան։ Բոլոր իրավունքները պաշտպանված են։</div>
            </div>
        </div>
    </footer>
  )
}
