"use client"
import { useState, useEffect, useRef } from 'react'

export default function ContactUsForm() {
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [hour, setHour] = useState(new Date().getHours()-1)

    
    


    



    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setError(null)
        setSuccess(null)
        setIsSubmitting(true)

        const formData = new FormData(event.currentTarget)
        const data = {
            name: formData.get('name')?.toString() || '',
            email: formData.get('email')?.toString() || '',
            message: formData.get('message')?.toString() || '',
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            const result = await response.json()

            if (response.ok) {
                setHour(new Date().getHours())
                setSuccess(result.message)
                event.currentTarget.reset()
                // Set cooldown
                
                // Reset interval if not already running
            } else {
                setError(result.error || 'Something went wrong. Please try again.')
            }
        } catch (err) {
            console.error(err)
            setError('An unexpected error occurred. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    // Helper function to format cooldown time
    return (
        <div>
            <h1 className="text-2xl font-bold border-b-2 border-primary-color">Contact Us</h1>
            <form className="flex flex-col gap-2 mt-5" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    className="border px-2 py-1 rounded"
                    type="text"
                    placeholder="Name"
                    name="name"
                    required
                />
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    className="border px-2 py-1 rounded"
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                />
                <label htmlFor="message">Message</label>
                <textarea
                    id="message"
                    className="border px-2 py-1 rounded"
                    placeholder="Message"
                    name="message"
                    required
                />
                <button
                    type="submit"
                    className={`bg-primary-color text-white w-fit px-2 py-2 rounded ${
                        isSubmitting || hour === new Date().getHours()
                            ? 'opacity-50 cursor-not-allowed'
                            : ''
                    }`}
                    disabled={isSubmitting || hour === new Date().getHours()}
                >
                    {isSubmitting
                        ? 'Submitting...'
                        : hour === new Date().getHours()
                        ? `One hour cooldown`
                        : 'Submit'}
                </button>
            </form>
            {error && !success && <p className="text-red-500 mt-2">{error}</p>}
            {success && <p className="text-green-500 mt-2">{success}</p>}
        </div>
    )
}