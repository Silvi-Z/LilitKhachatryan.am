export default function Contact({ handleBookingSubmit }) {
  return (
    <section id="contact" className="px-4 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-10 items-center">

            <div className="lg:col-span-6 space-y-6">
                <span className="text-blush-500 text-xs font-extrabold tracking-widest uppercase">🎀 Կապ Ինձ Հետ 🎀</span>
                <h2 className="text-3xl sm:text-4xl font-black text-rosewood-800">Վերագտնենք խաղաղությունը միասին</h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                    Դուք մենակ չեք այս ճանապարհին։ Զանգահարեք կամ գրեք ինձ էլ․ փոստին, և ես սիրով կօգնեմ ձեր ընտանիքին։
                </p>

                <div className="space-y-4">
                    <a href="tel:+37477716614" className="fluffy-card p-5 flex items-center gap-4 block hover:border-blush-400">
                        <div className="w-12 h-12 rounded-2xl bg-blush-100 text-blush-600 flex items-center justify-center text-xl font-bold">
                            📞
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 font-bold">Զանգահարել անմիջապես</div>
                            <div className="text-base font-black text-rosewood-800">+374 (77) 71-66-14</div>
                        </div>
                    </a>

                    <a href="mailto:poghosyanlilit05@gmail.com" className="fluffy-card p-5 flex items-center gap-4 block hover:border-blush-400">
                        <div className="w-12 h-12 rounded-2xl bg-cream-200 text-amber-700 flex items-center justify-center text-xl font-bold">
                            💌
                        </div>
                        <div>
                            <div className="text-xs text-slate-400 font-bold">Էլ․ Փոստ</div>
                            <div className="text-sm font-black text-rosewood-800">poghosyanlilit05@gmail.com</div>
                        </div>
                    </a>
                </div>
            </div>

            {/* Fast Form */}
            <div className="lg:col-span-6">
                <div className="fluffy-card p-6 sm:p-8 space-y-4">
                    <h3 className="text-xl font-black text-rosewood-800">Ուղարկել Հայտ 🎀</h3>
                    <p className="text-xs text-slate-500">Լրացրեք տվյալները, և ես անձամբ կկապնվեմ ձեզ հետ։</p>

                    <form onSubmit={handleBookingSubmit} className="space-y-3">
                        <div>
                            <label className="text-xs font-bold text-slate-700 block mb-1">Ձեր Անունը</label>
                            <input type="text" required placeholder="Օրինակ՝ Աննա" className="w-full px-4 py-3 rounded-2xl bg-blush-50/50 border border-blush-200 text-slate-800 text-xs focus:outline-none focus:border-blush-500" />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Հեռախոսահամար</label>
                                <input type="tel" required placeholder="+374 77 716614" className="w-full px-4 py-3 rounded-2xl bg-blush-50/50 border border-blush-200 text-slate-800 text-xs focus:outline-none focus:border-blush-500" />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-700 block mb-1">Երեխայի Տարիքը</label>
                                <select className="w-full px-3 py-3 rounded-2xl bg-blush-50/50 border border-blush-200 text-slate-800 text-xs focus:outline-none focus:border-blush-500">
                                    <option>7 - 12 տարեկան</option>
                                    <option>12 - 18 տարեկան</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-700 block mb-1">Համառոտ նկարագրեք հարցը</label>
                            <textarea rows={3} placeholder="Դպրոցական հարմարում, դեռահասություն, գաջեթներ..." className="w-full px-4 py-2.5 rounded-2xl bg-blush-50/50 border border-blush-200 text-slate-800 text-xs focus:outline-none focus:border-blush-500 resize-none"></textarea>
                        </div>

                        <button type="submit" className="w-full gradient-pink-btn text-white font-extrabold py-3.5 rounded-2xl text-xs shadow-md">
                            Ուղարկել Հայտը 🎀
                        </button>
                    </form>
                </div>
            </div>

        </div>
    </section>
  )
}
