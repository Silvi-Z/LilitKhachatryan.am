import { useRef, useState } from 'react'
import AnnouncementBanner from './components/AnnouncementBanner'
import Header from './components/Header'
import Hero from './components/Hero'
import Experience from './components/Experience'
import AgeGroups from './components/AgeGroups'
import Services from './components/Services'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ageSelectRef = useRef(null)

  const openBookingModal = (ageGroup) => {
    if (ageGroup) {
      const select = ageSelectRef.current
      if (select) {
        for (let i = 0; i < select.options.length; i++) {
          if (select.options[i].text.includes(ageGroup)) {
            select.selectedIndex = i
            break
          }
        }
      }
    }
    setIsModalOpen(true)
  }

  const closeBookingModal = () => setIsModalOpen(false)

  const handleBookingSubmit = (event) => {
    event.preventDefault()
    const form = event.currentTarget
    alert('Շնորհակալություն գրանցման համար։ Լիլիթ Խաչատրյանը կապ կհաստատի ձեզ հետ։')
    closeBookingModal()
    form.reset()
  }

  return (
    <>
      <AnnouncementBanner />
      <Header openBookingModal={openBookingModal} />

      <main className="flex-grow">
        <Hero openBookingModal={openBookingModal} />
        <Experience />
        <AgeGroups openBookingModal={openBookingModal} />
        <Services openBookingModal={openBookingModal} />
        <Contact handleBookingSubmit={handleBookingSubmit} />
      </main>

      <Footer />

      <BookingModal
        isOpen={isModalOpen}
        ageSelectRef={ageSelectRef}
        closeBookingModal={closeBookingModal}
        handleBookingSubmit={handleBookingSubmit}
      />
    </>
  )
}
