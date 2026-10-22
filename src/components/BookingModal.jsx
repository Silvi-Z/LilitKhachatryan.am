export default function BookingModal({ isOpen, ageSelectRef, closeBookingModal, handleBookingSubmit }) {
  return (
    <div id="booking-modal" className={`fixed inset-0 z-50 bg-rosewood-900/60 backdrop-blur-sm ${isOpen ? '' : 'hidden'} flex items-center justify-center p-4`}>
        <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border-2 border-blush-200 relative">
            <button onClick={() => closeBookingModal()} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blush-100 text-blush-600 flex items-center justify-center hover:bg-blush-200">
                ✕
            </button>

            <div className="text-center space-y-1">
                <div className="text-2xl">🎀</div>
                <h3 className="text-xl font-black text-rosewood-800">Ամրագրել Խորհրդատվություն</h3>
                <p className="text-xs text-slate-500">Լիլիթ Խաչատրյան</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-3">
                <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Ձեր Անունը</label>
                    <input type="text" required className="w-full px-4 py-2.5 rounded-xl bg-blush-50 border border-blush-200 text-slate-800 text-xs" />
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Հեռախոս</label>
                        <input type="tel" required placeholder="+374 77 716614" className="w-full px-3 py-2.5 rounded-xl bg-blush-50 border border-blush-200 text-slate-800 text-xs" />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-slate-700 block mb-1">Տարիքը</label>
                        <select ref={ageSelectRef} id="modal-age-select" className="w-full px-2 py-2.5 rounded-xl bg-blush-50 border border-blush-200 text-slate-800 text-xs">
                            <option>7 - 12 տարեկան</option>
                            <option>12 - 18 տարեկան</option>
                        </select>
                    </div>
                </div>

                <button type="submit" className="w-full gradient-pink-btn text-white font-bold py-3 rounded-xl text-xs shadow-md mt-2">
                    Հաստատել Գրանցումը 🎀
                </button>
            </form>
        </div>
    </div>
  )
}
