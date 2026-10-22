export default function Experience() {
  return (
    <section id="experience" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20">
        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-28 lg:self-start">
            <span className="block text-berry text-sm font-medium tracking-[0.14em] uppercase">Կրթություն և Փորձ</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-plum leading-[1.1] tracking-tight text-balance">Մասնագիտական Փորձառություն</h2>
        </div>

        <div className="lg:col-span-8 divide-y divide-plum/15 border-y border-plum/15">
            {/* Card 1 */}
            <div className="py-8 grid sm:grid-cols-[3rem_1fr] gap-x-6 gap-y-2">
                <div className="w-12 h-12 rounded-full bg-rose/50 text-plum flex items-center justify-center text-lg shrink-0 sm:row-span-2">
                    <i className="fa-solid fa-graduation-cap" aria-hidden="true"></i>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-plum">Բարձրագույն Կրթություն</h3>
                <p className="text-ink/75 text-base leading-relaxed max-w-2xl">
                    Սոցիալական մանկավարժության բարձրագույն կրթություն՝ երեխաների սոցիալականացման, վարքագծային խնդիրների և ընտանեկան միջավայրի մասնագիտական ուսումնասիրությամբ։
                </p>
            </div>

            {/* Card 2 */}
            <div className="py-8 grid sm:grid-cols-[3rem_1fr] gap-x-6 gap-y-2">
                <div className="w-12 h-12 rounded-full bg-rose/50 text-plum flex items-center justify-center text-lg shrink-0 sm:row-span-2">
                    <i className="fa-solid fa-building-columns" aria-hidden="true"></i>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-plum">Պրակտիկ Փորձ</h3>
                <p className="text-ink/75 text-base leading-relaxed max-w-2xl">
                    Տարիների պրակտիկ աշխատանք դպրոցում, սոցիալական հոգածության կենտրոնում և հոգեբանամանկավարժական կենտրոնում։
                </p>
            </div>

            {/* Card 3 */}
            <div className="py-8 grid sm:grid-cols-[3rem_1fr] gap-x-6 gap-y-2">
                <div className="w-12 h-12 rounded-full bg-rose/50 text-plum flex items-center justify-center text-lg shrink-0 sm:row-span-2">
                    <i className="fa-solid fa-school" aria-hidden="true"></i>
                </div>
                <h3 className="font-serif text-2xl font-semibold text-plum">Շիրակացու Ճեմարան</h3>
                <p className="text-ink/75 text-base leading-relaxed max-w-2xl">
                    Ներկայումս աշխատանքային փորձ Շիրակացու ճեմարանում որպես մանկավարժ՝ աջակցելով աշակերտներին ու ծնողներին ամենօրյա ուսումնադաստիարակչական հարցերում։
                </p>
            </div>
        </div>
    </div>
      </div>
    </section>
  )
}
