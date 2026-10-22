import { useRef, useState } from 'react'
import AnnouncementBanner from './components/AnnouncementBanner'
import Header from './components/Header'
import Hero from './components/Hero'
import Experience from './components/Experience'
import AgeGroups from './components/AgeGroups'
import Services from './components/Services'
import Materials from './components/Materials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'

const SUBMIT_ERROR_MESSAGE = 'Չհաջողվեց ուղարկել հայտը։ Խնդրում ենք փորձել կրկին մի փոքր ուշ։'

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submittingRef = useRef(false)
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

  const handleBookingSubmit = async (event) => {
    event.preventDefault()
    if (submittingRef.current) return // ignore repeated clicks while a request is in flight

    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))

    submittingRef.current = true
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('request failed')

      // Shown only after the server confirms Telegram accepted the message.
      alert('Շնորհակալություն գրանցման համար։ Լիլիթ Խաչատրյանը կապ կհաստատի ձեզ հետ։')
      closeBookingModal()
      form.reset()
    } catch {
      // Form stays open and filled in so the visitor can try again.
      alert(SUBMIT_ERROR_MESSAGE)
    } finally {
      submittingRef.current = false
      setIsSubmitting(false)
    }
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
        <Materials />
        <Contact handleBookingSubmit={handleBookingSubmit} isSubmitting={isSubmitting} />
      </main>

      <Footer />

      <BookingModal
        isOpen={isModalOpen}
        ageSelectRef={ageSelectRef}
        closeBookingModal={closeBookingModal}
        handleBookingSubmit={handleBookingSubmit}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
