export default function Services({ openBookingModal }) {
  return (
    <section id="services" className="bg-plum text-ivory relative overflow-hidden">
      <div className="pointer-events-none absolute -right-32 -top-32 w-[28rem] h-[28rem] rounded-full bg-berry/25" aria-hidden="true"></div>
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20 sm:py-28">
        <div className="max-w-2xl mb-14 space-y-4">
            <span className="block text-rose text-sm font-medium tracking-[0.14em] uppercase">Ծառայություններ և Գներ</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-ivory leading-[1.1] tracking-tight text-balance">Ինչպես Կարող Ենք Աշխատել</h2>
        </div>

        <div className="grid md:grid-cols-3 md:items-stretch gap-y-10 md:gap-y-0">
            {/* Service 1 */}
            <div className="md:p-10 flex flex-col justify-between md:border-r md:border-ivory/15">
                <div className="space-y-4">
                    <div className="w-11 h-11 rounded-full bg-ivory/10 text-rose flex items-center justify-center text-lg shrink-0">
                        <i className="fa-solid fa-comments" aria-hidden="true"></i>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold">Անհատական Խորհրդատվություն</h3>
                    <div className="font-serif text-4xl font-semibold">14,990 դրամ</div>
                    <p className="text-ivory/80 text-base leading-relaxed">
                        60 րոպեանոց խորքային հանդիպում (Օնլայն կամ Անձամբ)։ Վերլուծում ենք կոնկրետ ձեր ընտանիքի խնդիրն ու կազմում գործողությունների քայլարշավ։
                    </p>
                    <ul className="space-y-3 text-base text-ivory border-t border-ivory/20 pt-5">
                        <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-rose shrink-0" aria-hidden="true"></span><span>Անհատական վերլուծություն</span></li>
                        <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-rose shrink-0" aria-hidden="true"></span><span>Գործնական քայլեր</span></li>
                        <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-rose shrink-0" aria-hidden="true"></span><span>7 օր հետադարձ կապ</span></li>
                    </ul>
                </div>
                <div className="pt-6">
                    <button onClick={() => openBookingModal('Անհատական Խորհրդատվություն')} className="btn-light w-full font-medium py-3.5 text-base">
                        Գրանցվել (14,990 դրամ)
                    </button>
                </div>
            </div>

            {/* Service 2 */}
            <div className="relative bg-ivory text-ink p-8 md:p-10 md:-my-8 flex flex-col justify-between shadow-2xl shadow-black/30">
                <div className="absolute -top-3.5 right-8 bg-berry text-white text-xs font-medium px-3 py-1 rounded-full">
                   Ամենապահանջված
                </div>
                <div className="space-y-4">
                    <div className="w-11 h-11 rounded-full bg-rose/60 text-plum flex items-center justify-center text-lg shrink-0">
                        <i className="fa-solid fa-calendar-check" aria-hidden="true"></i>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold text-plum">Ծնողական Ուղեկցման Փաթեթ</h3>
                    <div className="font-serif text-4xl font-semibold text-berry">50,000 դրամ</div>
                    <p className="text-ink/75 text-base leading-relaxed">
                        Երկարաժամկետ աջակցություն դպրոցական կամ դեռահասության ճգնաժամային փուլում գտնվող ընտանիքների համար։ 4 հանդիպում և ուղղորդում։
                    </p>
                    <ul className="space-y-3 text-base text-ink border-t border-plum/15 pt-5">
                        <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-berry shrink-0" aria-hidden="true"></span><span>4 Անհատական հանդիպում</span></li>
                        <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-berry shrink-0" aria-hidden="true"></span><span>Վարքագծի ամենօրյա շտկում</span></li>
                        <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-berry shrink-0" aria-hidden="true"></span><span>Ծնող և երեխա կապի ամրապնդում</span></li>
                    </ul>
                </div>
                <div className="pt-6">
                    <button onClick={() => openBookingModal('Ուղեկցման Փաթեթ')} className="btn-primary w-full font-medium py-3.5 text-base">
                        Ընտրել Փաթեթը (50,000 դրամ)
                    </button>
                </div>
            </div>

            {/* Service 3 */}
            <div className="pt-10 border-t border-ivory/15 md:border-t-0 md:p-10 flex flex-col justify-between">
                <div className="space-y-4">
                    <div className="w-11 h-11 rounded-full bg-ivory/10 text-rose flex items-center justify-center text-lg shrink-0">
                        <i className="fa-solid fa-users" aria-hidden="true"></i>
                    </div>
                    <h3 className="font-serif text-2xl font-semibold">Ծնողական Վեբինարներ և Խմբեր</h3>
                    <div className="font-serif text-4xl font-semibold">9,990 դրամ</div>
                    <p className="text-ivory/80 text-base leading-relaxed">
                        Թեմատիկ օնլայն հանդիպումներ փոքր խմբերով, որտեղ քննարկում ենք դպրոցական, դեռահասության և վստահելի ծնողավարման թեմաները։
                    </p>
                    <ul className="space-y-3 text-base text-ivory border-t border-ivory/20 pt-5">
                        <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-rose shrink-0" aria-hidden="true"></span><span>Փորձի փոխանակում</span></li>
                        <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-rose shrink-0" aria-hidden="true"></span><span>Հարց ու պատասխան Լիլիթի հետ</span></li>
                        <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-rose shrink-0" aria-hidden="true"></span><span>Օգտակար նյութեր</span></li>
                    </ul>
                </div>
                <div className="pt-6">
                    <button onClick={() => openBookingModal('Ծնողական Վեբինարներ և Խմբեր')} className="btn-light w-full font-medium py-3.5 text-base">
                        Միանալ խմբին (9,990 դրամ)
                    </button>
                </div>
            </div>
        </div>
        <div className="mt-16 pt-8 border-t border-ivory/20">
            <p className="flex items-start gap-3 max-w-2xl text-base text-ivory/85 leading-relaxed">
                <i className="fa-solid fa-lock text-rose mt-1" aria-hidden="true"></i>
                <span>Բոլոր հանդիպումները և քննարկվող ընտանեկան հարցերը խիստ գաղտնի են և պաշտպանված պրոֆեսիոնալ էթիկայով։</span>
            </p>
        </div>
    </div>
    </section>
  )
}
