import Honeypot from './Honeypot'

export default function Contact({ handleBookingSubmit, isSubmitting }) {
  return (
    <section id="contact" className="bg-berry text-ivory relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 -bottom-24 w-80 h-80 rounded-full border border-ivory/25" aria-hidden="true"></div>
      <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-20 sm:py-28">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">

            <div className="lg:col-span-6 space-y-8">
                <span className="block text-ivory text-sm font-medium tracking-[0.14em] uppercase">Կապ Ինձ Հետ</span>
                <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-ivory leading-[1.1] tracking-tight text-balance">Վերագտնենք խաղաղությունը միասին</h2>
                <p className="text-ivory text-lg leading-relaxed">
                    Դուք մենակ չեք այս ճանապարհին։ Զանգահարեք կամ գրեք ինձ էլ․ փոստին, և ես սիրով կօգնեմ ձեր ընտանիքին։
                </p>

                <div className="space-y-4">
                    <a href="tel:+37477716614" className="group flex items-center gap-4 py-4 border-b border-ivory/30 hover:border-ivory transition-colors block">
                        <div className="w-12 h-12 rounded-full bg-ivory/15 text-ivory flex items-center justify-center text-lg shrink-0 group-hover:bg-ivory group-hover:text-berry transition-colors">
                            <i className="fa-solid fa-phone" aria-hidden="true"></i>
                        </div>
                        <div className="min-w-0">
                            <div className="text-sm text-ivory">Զանգահարել անմիջապես</div>
                            <div className="text-xl font-semibold text-white">+374 (77) 71-66-14</div>
                        </div>
                    </a>

                    <a href="mailto:poghosyanlilit05@gmail.com" className="group flex items-center gap-4 py-4 border-b border-ivory/30 hover:border-ivory transition-colors block">
                        <div className="w-12 h-12 rounded-full bg-ivory/15 text-ivory flex items-center justify-center text-lg shrink-0 group-hover:bg-ivory group-hover:text-berry transition-colors">
                            <i className="fa-solid fa-envelope" aria-hidden="true"></i>
                        </div>
                        <div className="min-w-0">
                            <div className="text-sm text-ivory">Էլ․ Փոստ</div>
                            <div className="text-base sm:text-lg font-semibold text-white [overflow-wrap:anywhere]">poghosyanlilit05@gmail.com</div>
                        </div>
                    </a>
                </div>
            </div>

            {/* Fast Form */}
            <div className="lg:col-span-6">
                <div className="bg-white text-ink p-7 sm:p-10 rounded-3xl shadow-2xl shadow-plum/30 space-y-4">
                    <h3 className="font-serif text-2xl font-semibold text-plum">Ուղարկել Հայտ</h3>
                    <p className="text-sm text-ink/75">Լրացրեք տվյալները, և ես անձամբ կկապնվեմ ձեզ հետ։</p>

                    <form onSubmit={handleBookingSubmit} className="space-y-3">
                        <div>
                            <label className="text-sm font-medium text-ink block mb-1.5">Ձեր Անունը</label>
                            <input type="text" name="name" maxLength={100} required placeholder="Օրինակ՝ Աննա" className="field" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                                <label className="text-sm font-medium text-ink block mb-1.5">Հեռախոսահամար</label>
                                <input type="tel" name="phone" maxLength={30} required placeholder="+374 77 716614" className="field" />
                            </div>
                            <div>
                                <label className="text-sm font-medium text-ink block mb-1.5">Երեխայի Տարիքը</label>
                                <select name="age" className="field">
                                    <option>7 - 12 տարեկան</option>
                                    <option>12 - 18 տարեկան</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-sm font-medium text-ink block mb-1.5">Համառոտ նկարագրեք հարցը</label>
                            <textarea name="message" maxLength={1500} rows={3} placeholder="Դպրոցական հարմարում, դեռահասություն, գաջեթներ..." className="field resize-none"></textarea>
                        </div>

                        <button type="submit" disabled={isSubmitting} className="btn-primary w-full font-medium py-3.5 text-sm disabled:opacity-70 disabled:cursor-not-allowed">
                            Ուղարկել Հայտը
                        </button>
                        <Honeypot />
                    </form>
                </div>
            </div>

        </div>
    </div>
    </section>
  )
}
