import Honeypot from './Honeypot'

export default function BookingModal({ isOpen, ageSelectRef, closeBookingModal, handleBookingSubmit, isSubmitting }) {
  return (
    <div id="booking-modal" className={`fixed inset-0 z-50 bg-plum/60 backdrop-blur-sm ${isOpen ? '' : 'hidden'} flex items-center justify-center p-4`}>
        <div className="bg-white rounded-3xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-4 shadow-2xl border border-plum/10 relative">
            <button onClick={() => closeBookingModal()} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-ivory text-plum flex items-center justify-center hover:bg-rose transition-colors">
                ✕
            </button>

            <div className="text-center space-y-1">
                <h3 className="font-serif text-2xl font-semibold text-plum">Ամրագրել Խորհրդատվություն</h3>
                <p className="text-sm text-ink/75">Լիլիթ Խաչատրյան</p>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-3">
                <div>
                    <label className="text-sm font-medium text-ink block mb-1.5">Ձեր Անունը</label>
                    <input type="text" name="name" maxLength={100} required className="field" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                        <label className="text-sm font-medium text-ink block mb-1.5">Հեռախոս</label>
                        <input type="tel" name="phone" maxLength={30} required placeholder="+374 77 716614" className="field" />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-ink block mb-1.5">Տարիքը</label>
                        <select ref={ageSelectRef} name="age" id="modal-age-select" className="field">
                            <option>7 - 12 տարեկան</option>
                            <option>12 - 18 տարեկան</option>
                        </select>
                    </div>
                </div>

                <button type="submit" disabled={isSubmitting} className="btn-primary w-full font-medium py-3 text-sm mt-2 disabled:opacity-70 disabled:cursor-not-allowed">
                    Հաստատել Գրանցումը
                </button>
                <Honeypot />
            </form>
        </div>
    </div>
  )
}
