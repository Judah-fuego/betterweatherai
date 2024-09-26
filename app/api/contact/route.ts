import { NextResponse } from 'next/server'
import { createClient } from '@/utils/supabase/server'

export async function POST(request: Request) {
    try {
        const { name, email, message } = await request.json()

        // Basic validation
        if (!name || !email || !message) {
            return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
        }

        // Initialize Supabase client
        const supabase = createClient()

        // Insert data into the 'contact_us_form' table
        const { data, error } = await supabase
            .from('contact_us_form')
            .insert([
                { name, email, message }
            ])

        if (error) {
            console.error('Supabase Insert Error:', error)
            return NextResponse.json({ error: 'Failed to submit contact form.' }, { status: 500 })
        }


        return NextResponse.json(
            { message: 'Your message has been sent successfully!' },
            { status: 200 }
        )
    } catch (error) {
        console.error('Unexpected Error:', error)
        return NextResponse.json(
            { error: 'Something went wrong. Please try again later.' },
            { status: 500 }
        )
    }
}