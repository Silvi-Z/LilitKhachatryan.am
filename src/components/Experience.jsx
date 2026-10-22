export default function Experience() {
  return (
    <section id="experience" className="px-4 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
            <span className="text-blush-500 text-xs font-extrabold tracking-widest uppercase">🎀 Կրթություն և Փորձ 🎀</span>
            <h2 className="text-3xl sm:text-4xl font-black text-rosewood-800">Մասնագիտական Փորձառություն</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="fluffy-card p-6 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blush-100 text-blush-600 flex items-center justify-center text-2xl font-bold">
                    🎓
                </div>
                <h3 className="text-lg font-bold text-rosewood-800">Բարձրագույն Կրթություն</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                    Սոցիալական մանկավարժության բարձրագույն կրթություն՝ երեխաների սոցիալականացման, վարքագծային խնդիրների և ընտանեկան միջավայրի մասնագիտական ուսումնասիրությամբ։
                </p>
            </div>

            {/* Card 2 */}
            <div className="fluffy-card p-6 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-cream-200 text-amber-700 flex items-center justify-center text-2xl font-bold">
                    🏛️
                </div>
                <h3 className="text-lg font-bold text-rosewood-800">Պրակտիկ Փորձ</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                    Տարիների պրակտիկ աշխատանք դպրոցում, սոցիալական հոգածության կենտրոնում և հոգեբանամանկավարժական կենտրոնում։
                </p>
            </div>

            {/* Card 3 */}
            <div className="fluffy-card p-6 space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl font-bold">
                    🏫
                </div>
                <h3 className="text-lg font-bold text-rosewood-800">Շիրակացու Ճեմարան</h3>
                <p className="text-slate-600 text-xs leading-relaxed">
                    Ներկայումս աշխատանքային փորձ Շիրակացու ճեմարանում որպես մանկավարժ՝ աջակցելով աշակերտներին ու ծնողներին ամենօրյա ուսումնադաստիարակչական հարցերում։
                </p>
            </div>
        </div>
    </section>
  )
}
