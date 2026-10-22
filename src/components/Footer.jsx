import SocialLinks from './SocialLinks'

export default function Footer() {
  return (
    <footer className="bg-plum text-ivory py-14 px-4 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            <div className="flex items-center gap-3">
                <div>
                    <span className="font-serif text-xl font-semibold text-ivory block">Լիլիթ Խաչատրյան</span>
                    <span className="text-sm text-rose">«Մանկավարժ Մայրիկ» • Սոցիալական Մանկավարժ</span>
                </div>
            </div>

            <div className="text-sm text-ivory/80 space-y-1 [overflow-wrap:anywhere]">
                <div>+374 (77) 71-66-14 | poghosyanlilit05@gmail.com</div>
                <div>© 2026 Լիլիթ Խաչատրյան։ Բոլոր իրավունքները պաշտպանված են։</div>
            </div>

            <SocialLinks />
        </div>
    </footer>
  )
}
