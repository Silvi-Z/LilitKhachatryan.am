import { useState } from 'react'

export default function AgeGroups({ openBookingModal }) {
  const [activeGroup, setActiveGroup] = useState('age712')

  const switchAgeGroup = (groupId) => setActiveGroup(groupId)

  // Visual classes for the age tabs (active / inactive). Only styling lives here;
  // the tab-switching logic is unchanged.
  const TAB_BASE = 'age-tab px-1 py-3 -mb-px border-b-2 font-semibold text-base sm:text-lg transition-colors w-full sm:w-auto text-left sm:text-center'
  const TAB_ACTIVE = 'border-berry text-plum'
  const TAB_INACTIVE = 'border-transparent text-ink/70 hover:text-plum'

  return (
    <section id="topics" className="bg-ivory">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-16 sm:py-24">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
            <span className="block text-berry text-sm font-medium tracking-[0.14em] uppercase">Տարիքային Փուլեր</span>
            <h2 className="font-serif text-4xl sm:text-5xl font-semibold text-plum leading-[1.1] tracking-tight text-balance">Աջակցություն 7-18 Տարեկան Երեխաների Ծնողներին</h2>
            <p className="text-ink/75 text-sm sm:text-base">Ընտրեք համապատասխան տարիքային խումբը․</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row sm:justify-center gap-x-12 gap-y-1 mb-12 border-b border-plum/15">
            <button onClick={() => switchAgeGroup('age712')} id="tab-age712" className={`${TAB_BASE} ${activeGroup === 'age712' ? TAB_ACTIVE : TAB_INACTIVE} flex items-center gap-2`}>
                7 - 12 Տարեկան (Կրտսեր Դպրոցական)
            </button>
            <button onClick={() => switchAgeGroup('age1218')} id="tab-age1218" className={`${TAB_BASE} ${activeGroup === 'age1218' ? TAB_ACTIVE : TAB_INACTIVE} flex items-center gap-2`}>
                12 - 18 Տարեկան (Դեռահասություն)
            </button>
        </div>

        {/* Age 7-12 Content */}
        <div id="group-age712" className={`age-group-content ${activeGroup === 'age712' ? '' : 'hidden'} space-y-6`}>
            <div className="relative">
                <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
                    <div className="space-y-6 md:col-span-7">
                        <span className="tag px-3 py-1 rounded-full text-sm font-medium">7 - 12 Տարեկան</span>
                        <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-plum leading-tight">Դպրոցական Հարմարվում և Ուսումնական Մոտիվացիա</h3>
                        <p className="text-ink/75 text-sm sm:text-base leading-relaxed">
                            Այս փուլում երեխան անցնում է դպրոցական նոր կյանքի։ Հաճախ առաջանում են տնային աշխատանքների շուրջ վեճեր, ուշադրության շեղում, էկրանային կախվածություն և հասակակիցների հետ կոնֆլիկտներ։
                        </p>

                        <ul className="space-y-3 text-sm sm:text-base text-ink">
                            <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-berry shrink-0" aria-hidden="true"></span> Դպրոցական միջավայրին հարմարվելու դժվարություններ</li>
                            <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-berry shrink-0" aria-hidden="true"></span> Տնային դասերի պատրաստման ինքնուրույնություն</li>
                            <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-berry shrink-0" aria-hidden="true"></span> Էկրանային ժամանակի առողջ սահմանափակում</li>
                            <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-berry shrink-0" aria-hidden="true"></span> Κոնֆլիկտների հաղթահարում ընկերների հետ</li>
                        </ul>

                        <div className="pt-2">
                            <button onClick={() => openBookingModal('7-12 տարեկան')} className="btn-primary px-7 py-3.5 text-base font-medium">
                                Գրանցվել խորհրդատվության (7-12 տարեկան)
                            </button>
                        </div>
                    </div>

                    <div className="md:col-span-5 bg-plum text-ivory p-8 sm:p-10 rounded-tl-[3rem] rounded-br-[3rem] space-y-4">
                        <div className="text-2xl text-rose"><i className="fa-regular fa-lightbulb" aria-hidden="true"></i></div>
                        <h4 className="font-serif font-semibold text-ivory text-xl">Մանկավարժական Խորհուրդ</h4>
                        <p className="text-base text-ivory/90 leading-relaxed">
                            «Դպրոցական տարիքում երեխային պետք չէ ստիպել սովորել, այլ պետք է օգնել ձևավորել պատասխանատվություն։ Երբ ծնողը դառնում է աջակից, տնայինների շուրջ վեճերը դադարում են։»
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Age 12-18 Content */}
        <div id="group-age1218" className={`age-group-content ${activeGroup === 'age1218' ? '' : 'hidden'} space-y-6`}>
            <div className="relative">
                <div className="grid md:grid-cols-12 gap-10 md:gap-16 items-center">
                    <div className="space-y-6 md:col-span-7">
                        <span className="tag px-3 py-1 rounded-full text-sm font-medium">12 - 18 Տարեկան</span>
                        <h3 className="font-serif text-3xl sm:text-4xl font-semibold text-plum leading-tight">Դեռահասության Ճգնաժամ և Սահմաններ</h3>
                        <p className="text-ink/75 text-sm sm:text-base leading-relaxed">
                            Դեռահասությունը ինքնության փնտրտուքի փուլն է։ Ծնողները բախվում են փակվածության, տրամադրության տատանումների, ինքնուրույնության պահանջի և անձնական սահմանների պաշտպանության։
                        </p>

                        <ul className="space-y-3 text-sm sm:text-base text-ink">
                            <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-berry shrink-0" aria-hidden="true"></span> Դեռահասի հետ վստահելի կապի պահպանում</li>
                            <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-berry shrink-0" aria-hidden="true"></span> Անձնական սահմանների հարգում առանց վերահսկողության</li>
                            <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-berry shrink-0" aria-hidden="true"></span> Էմոցիոնալ տատանումների հանգիստ ընդունում</li>
                            <li className="flex items-start gap-3"><span className="w-1.5 h-1.5 mt-[0.6rem] rounded-full bg-berry shrink-0" aria-hidden="true"></span> Ինքնագնահատականի բարձրացում</li>
                        </ul>

                        <div className="pt-2">
                            <button onClick={() => openBookingModal('12-18 տարեկան')} className="btn-primary px-7 py-3.5 text-base font-medium">
                                Գրանցվել խորհրդատվության (12-18 տարեկան)
                            </button>
                        </div>
                    </div>

                    <div className="md:col-span-5 bg-plum text-ivory p-8 sm:p-10 rounded-tl-[3rem] rounded-br-[3rem] space-y-4">
                        <div className="text-2xl text-rose"><i className="fa-regular fa-comment-dots" aria-hidden="true"></i></div>
                        <h4 className="font-serif font-semibold text-ivory text-xl">Դեռահասի հետ կապը</h4>
                        <p className="text-base text-ivory/90 leading-relaxed">
                            «Դեռահասի հետ աշխատելիս ամենակարևորը նրան լսելն է, այլ ոչ թե քննադատելը։ Խորհրդատվության ընթացքում մենք գտնում ենք այն լեզուն, որով դեռահասը կրկին սկսում է վստահել ծնողին։»
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </section>
  )
}
