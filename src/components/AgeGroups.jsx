import { useState } from 'react'

export default function AgeGroups({ openBookingModal }) {
  const [activeGroup, setActiveGroup] = useState('age712')

  const switchAgeGroup = (groupId) => setActiveGroup(groupId)

  // Class sets the original script toggled on the tab buttons.
  // (The original markup gave only the 12-18 tab a hover:bg-blush-50 class, and
  // the script never added/removed it, so that quirk is preserved per tab.)
  const TAB_BASE = 'age-tab px-6 py-3.5 rounded-2xl font-bold text-xs sm:text-sm transition-all'
  const TAB_ACTIVE = 'gradient-pink-btn text-white shadow-md'
  const TAB_INACTIVE = 'border-2 border-blush-200 text-slate-700 bg-white'

  return (
    <section id="topics" className="px-4 lg:px-8 py-16 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
            <span className="text-blush-500 text-xs font-extrabold tracking-widest uppercase">🎀 Տարիքային Փուլեր 🎀</span>
            <h2 className="text-3xl sm:text-4xl font-black text-rosewood-800">Աջակցություն 7-18 Տարեկան Երեխաների Ծնողներին</h2>
            <p className="text-slate-600 text-xs sm:text-sm">Ընտրեք համապատասխան տարիքային խումբը․</p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-10">
            <button onClick={() => switchAgeGroup('age712')} id="tab-age712" className={`${TAB_BASE} active ${activeGroup === 'age712' ? TAB_ACTIVE : TAB_INACTIVE} flex items-center gap-2`}>
                <span>👧🎈</span> 7 - 12 Տարեկան (Կրտսեր Դպրոցական)
            </button>
            <button onClick={() => switchAgeGroup('age1218')} id="tab-age1218" className={`${TAB_BASE} ${activeGroup === 'age1218' ? TAB_ACTIVE : TAB_INACTIVE} hover:bg-blush-50 flex items-center gap-2`}>
                <span>🎒🎧</span> 12 - 18 Տարեկան (Դեռահասություն)
            </button>
        </div>

        {/* Age 7-12 Content */}
        <div id="group-age712" className={`age-group-content ${activeGroup === 'age712' ? '' : 'hidden'} space-y-6`}>
            <div className="fluffy-card p-6 sm:p-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <span className="soft-ribbon-tag px-3 py-1 rounded-full text-xs font-bold">7 - 12 Տարեկան</span>
                        <h3 className="text-2xl font-bold text-rosewood-800">Դպրոցական Հարմարվում և Ուսումնական Մոտիվացիա</h3>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                            Այս փուլում երեխան անցնում է դպրոցական նոր կյանքի։ Հաճախ առաջանում են տնային աշխատանքների շուրջ վեճեր, ուշադրության շեղում, էկրանային կախվածություն և հասակակիցների հետ կոնֆլիկտներ։
                        </p>

                        <ul className="space-y-2.5 text-xs text-slate-700">
                            <li className="flex items-center gap-2.5"><span className="text-blush-500">🎀</span> Դպրոցական միջավայրին հարմարվելու դժվարություններ</li>
                            <li className="flex items-center gap-2.5"><span className="text-blush-500">🎀</span> Տնային դասերի պատրաստման ինքնուրույնություն</li>
                            <li className="flex items-center gap-2.5"><span className="text-blush-500">🎀</span> Էկրանային ժամանակի առողջ սահմանափակում</li>
                            <li className="flex items-center gap-2.5"><span className="text-blush-500">🎀</span> Κոնֆլիկտների հաղթահարում ընկերների հետ</li>
                        </ul>

                        <div className="pt-2">
                            <button onClick={() => openBookingModal('7-12 տարեկան')} className="gradient-pink-btn text-white px-6 py-3 rounded-2xl text-xs font-bold">
                                Գրանցվել խորհրդատվության (7-12 տարեկան)
                            </button>
                        </div>
                    </div>

                    <div className="bg-blush-50/80 p-6 rounded-3xl border border-blush-200 space-y-3">
                        <div className="text-2xl">💡</div>
                        <h4 className="font-bold text-rosewood-800 text-sm">Մանկավարժական Խորհուրդ</h4>
                        <p className="text-xs text-slate-600 italic leading-relaxed">
                            «Դպրոցական տարիքում երեխային պետք չէ ստիպել սովորել, այլ պետք է օգնել ձևավորել պատասխանատվություն։ Երբ ծնողը դառնում է աջակից, տնայինների շուրջ վեճերը դադարում են։»
                        </p>
                    </div>
                </div>
            </div>
        </div>

        {/* Age 12-18 Content */}
        <div id="group-age1218" className={`age-group-content ${activeGroup === 'age1218' ? '' : 'hidden'} space-y-6`}>
            <div className="fluffy-card p-6 sm:p-10">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                        <span className="soft-ribbon-tag px-3 py-1 rounded-full text-xs font-bold">12 - 18 Տարեկան</span>
                        <h3 className="text-2xl font-bold text-rosewood-800">Դեռահասության Ճգնաժամ և Սահմաններ</h3>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                            Դեռահասությունը ինքնության փնտրտուքի փուլն է։ Ծնողները բախվում են փակվածության, տրամադրության տատանումների, ինքնուրույնության պահանջի և անձնական սահմանների պաշտպանության։
                        </p>

                        <ul className="space-y-2.5 text-xs text-slate-700">
                            <li className="flex items-center gap-2.5"><span className="text-blush-500">🎀</span> Դեռահասի հետ վստահելի կապի պահպանում</li>
                            <li className="flex items-center gap-2.5"><span className="text-blush-500">🎀</span> Անձնական սահմանների հարգում առանց վերահսկողության</li>
                            <li className="flex items-center gap-2.5"><span className="text-blush-500">🎀</span> Էմոցիոնալ տատանումների հանգիստ ընդունում</li>
                            <li className="flex items-center gap-2.5"><span className="text-blush-500">🎀</span> Ինքնագնահատականի բարձրացում</li>
                        </ul>

                        <div className="pt-2">
                            <button onClick={() => openBookingModal('12-18 տարեկան')} className="gradient-pink-btn text-white px-6 py-3 rounded-2xl text-xs font-bold">
                                Գրանցվել խորհրդատվության (12-18 տարեկան)
                            </button>
                        </div>
                    </div>

                    <div className="bg-blush-50/80 p-6 rounded-3xl border border-blush-200 space-y-3">
                        <div className="text-2xl">✨</div>
                        <h4 className="font-bold text-rosewood-800 text-sm">Դեռահասի հետ կապը</h4>
                        <p className="text-xs text-slate-600 italic leading-relaxed">
                            «Դեռահասի հետ աշխատելիս ամենակարևորը նրան լսելն է, այլ ոչ թե քննադատելը։ Խորհրդատվության ընթացքում մենք գտնում ենք այն լեզուն, որով դեռահասը կրկին սկսում է վստահել ծնողին։»
                        </p>
                    </div>
                </div>
            </div>
        </div>

    </section>
  )
}
