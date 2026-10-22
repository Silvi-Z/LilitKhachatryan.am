export default function Hero({ openBookingModal }) {
  return (
    <section className="relative px-4 lg:px-8 py-12 md:py-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-12 space-y-6 text-center max-w-3xl mx-auto">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full soft-ribbon-tag text-xs font-extrabold shadow-sm">
                    <span>🎀</span>
                    <span>Էմպաթիա • Ջերմություն • Խաղաղ Ծնողավարում</span>
                    <span>🎀</span>
                </div>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-rosewood-800 leading-tight">
                    Ողջո՛ւյն, ես <span className="gradient-text-pink">Լիլիթն եմ 🌸</span>
                </h1>

                <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed bg-white/60 p-6 rounded-3xl border border-blush-100 shadow-sm">
                    Որպես սոցիալական մանկավարժ և մայրիկ, ես գիտեմ, թե որքան դժվար կարող է լինել ծնողավարության ճանապարհը։ Իմ նպատակն է օգնել ծնողներին վերագտնել հանգստությունն ու վստահությունը՝ հասկանալով երեխայի վարքի պատճառները։
                </p>

                <div className="pt-2 flex flex-wrap justify-center gap-4">
                    <button onClick={() => openBookingModal()} className="gradient-pink-btn text-white font-extrabold px-8 py-4 rounded-3xl text-sm transition-all flex items-center gap-3">
                        <i className="fa-solid fa-heart"></i>
                        Անհատական Խորհրդատվություն
                    </button>
                    <a href="#topics" className="bg-white text-blush-600 font-bold px-7 py-4 rounded-3xl border-2 border-blush-200 hover:bg-blush-50 transition-all flex items-center gap-2 text-sm shadow-sm">
                        <span>🎀</span>
                        Ընտրել Տարիքը (7+)
                    </a>
                </div>
            </div>

        </div>
    </section>
  )
}
