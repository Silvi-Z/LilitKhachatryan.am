export default function Services({ openBookingModal }) {
  return (
    <section id="services" className="px-4 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-blush-500 text-xs font-extrabold tracking-widest uppercase">🎀 Ծառայություններ և Գներ 🎀</span>
            <h2 className="text-3xl sm:text-4xl font-black text-rosewood-800">Ինչպես Կարող Ենք Աշխատել</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="fluffy-card p-6 flex flex-col justify-between">
                <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-blush-100 text-blush-600 flex items-center justify-center text-xl font-bold">
                        💬
                    </div>
                    <h3 className="text-xl font-bold text-rosewood-800">Անհատական Խորհրդատվություն</h3>
                    <div className="text-2xl font-black text-rosewood-900">14,990 դրամ</div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                        60 րոպեանոց խորքային հանդիպում (Օնլայն կամ Անձամբ)։ Վերլուծում ենք կոնկրետ ձեր ընտանիքի խնդիրն ու կազմում գործողությունների քայլարշավ։
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 border-t border-blush-100 pt-3">
                        <li>🎀 Անհատական վերլուծություն</li>
                        <li>🎀 Գործնական քայլեր</li>
                        <li>🎀 7 օր հետադարձ կապ</li>
                    </ul>
                </div>
                <div className="pt-6">
                    <button onClick={() => openBookingModal('Անհատական Խորհրդատվություն')} className="w-full bg-blush-100 text-blush-700 font-bold py-3 rounded-2xl hover:bg-blush-200 transition-colors text-xs">
                        Գրանցվել (14,990 դրամ)
                    </button>
                </div>
            </div>

            {/* Service 2 */}
            <div className="fluffy-card p-6 flex flex-col justify-between border-2 border-blush-400 relative bg-gradient-to-b from-white to-blush-50/50">
                <div className="absolute -top-3.5 right-6 bg-blush-500 text-white text-[10px] font-black px-3 py-1 rounded-full">
                    ✨ Ամենապահանջված
                </div>
                <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl gradient-pink-btn text-white flex items-center justify-center text-xl font-bold">
                        🌸
                    </div>
                    <h3 className="text-xl font-bold text-rosewood-800">Ծնողական Ուղեկցման Փաթեթ</h3>
                    <div className="text-2xl font-black text-rosewood-900">50,000 դրամ</div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                        Երկարաժամկետ աջակցություն դպրոցական կամ դեռահասության ճգնաժամային փուլում գտնվող ընտանիքների համար։ 4 հանդիպում և ուղղորդում։
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 border-t border-blush-100 pt-3">
                        <li>🎀 4 Անհատական հանդիպում</li>
                        <li>🎀 Վարքագծի ամենօրյա շտկում</li>
                        <li>🎀 Ծնող և երեխա կապի ամրապնդում</li>
                    </ul>
                </div>
                <div className="pt-6">
                    <button onClick={() => openBookingModal('Ուղեկցման Փաթեթ')} className="w-full gradient-pink-btn text-white font-bold py-3 rounded-2xl text-xs shadow-md">
                        Ընտրել Փաթեթը (50,000 դրամ)
                    </button>
                </div>
            </div>

            {/* Service 3 */}
            <div className="fluffy-card p-6 flex flex-col justify-between">
                <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-cream-200 text-amber-700 flex items-center justify-center text-xl font-bold">
                        👭
                    </div>
                    <h3 className="text-xl font-bold text-rosewood-800">Ծնողական Վեբինարներ և Խմբեր</h3>
                    <div className="text-2xl font-black text-rosewood-900">9,990 դրամ</div>
                    <p className="text-slate-600 text-xs leading-relaxed">
                        Թեմատիկ օնլայն հանդիպումներ փոքր խմբերով, որտեղ քննարկում ենք դպրոցական, դեռահասության և վստահելի ծնողավարման թեմաները։
                    </p>
                    <ul className="space-y-2 text-xs text-slate-700 border-t border-blush-100 pt-3">
                        <li>🎀 Փորձի փոխանակում</li>
                        <li>🎀 Հարց ու պատասխան Լիլիթի հետ</li>
                        <li>🎀 Օգտակար նյութեր</li>
                    </ul>
                </div>
                <div className="pt-6">
                    <button onClick={() => openBookingModal('Ծնողական Վեբինարներ և Խմբեր')} className="w-full bg-cream-200 text-amber-800 font-bold py-3 rounded-2xl hover:bg-cream-300 transition-colors text-xs">
                        Միանալ խմբին (9,990 դրամ)
                    </button>
                </div>
            </div>
        </div>
    </section>
  )
}
