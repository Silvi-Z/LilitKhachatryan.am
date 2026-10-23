export default function Hero({ openBookingModal }) {
  return (
    <section className="bg-ivory relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-14 md:py-24 lg:py-28">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-8 items-center">

            <div className="lg:col-span-7 space-y-8 text-left">
                <div className="inline-flex items-center gap-3 text-sm font-medium uppercase tracking-[0.14em] text-berry before:content-[''] before:block before:w-10 before:h-px before:bg-berry">
                    <span>Էմպաթիա • Ջերմություն • Խաղաղ Ծնողավարում</span>
                    
                </div>

                <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold text-plum leading-[1.05] tracking-tight">
                    Ողջո՛ւյն, ես <span className="block text-berry">Լիլիթն եմ</span>
                </h1>

                <p className="text-ink/75 text-lg sm:text-xl leading-relaxed max-w-xl">
                    Որպես սոցիալական մանկավարժ և մայրիկ, ես գիտեմ, թե որքան դժվար կարող է լինել ծնողավարության ճանապարհը։ Իմ նպատակն է օգնել ծնողներին վերագտնել հանգստությունն ու վստահությունը՝ հասկանալով երեխայի վարքի պատճառները։
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button onClick={() => openBookingModal()} className="btn-primary font-medium px-9 py-4 text-base flex items-center justify-center gap-3">
                        Անհատական Խորհրդատվություն
                        <i className="fa-solid fa-arrow-right text-sm" aria-hidden="true"></i>
                    </button>
                    <a href="#topics" className="btn-secondary font-medium px-9 py-4 text-base flex items-center justify-center gap-2">
                        
                        Ընտրել Տարիքը (7+)
                    </a>
                </div>
            </div>

                    {/* Portrait placeholder (decorative, no photo yet): replace the inner arch with Lilit's photo,
                e.g. <img src="..." alt="..." className="w-full h-full object-cover" /> */}
            <div className="lg:col-span-5 relative mx-auto w-full max-w-xs sm:max-w-sm lg:max-w-none" aria-hidden="true">
                <div className="absolute -top-8 -right-6 sm:-right-10 w-2/3 aspect-square rounded-full bg-rose/70"></div>
                <div className="absolute -bottom-6 -left-6 w-1/2 h-2/5 bg-plum rounded-tr-[4rem]"></div>
                <div className="relative aspect-[4/5] rounded-t-full overflow-hidden bg-rose flex items-end justify-center">
                    <i className="fa-solid fa-user text-plum/20 text-[10rem] sm:text-[13rem] translate-y-8"></i>
                </div>
            </div>
        </div>
    </div>
    </section>
  )
}
