'use client';
import { contactUsFormSubmit } from "@/app/actions";
import { useRef } from "react";
import { Toaster, toast } from "sonner";

export default function Form(){
const formRef = useRef<HTMLFormElement>(null); // Create a ref to refer to the form

const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 

    const formData = new FormData(event.currentTarget);
    const response = await contactUsFormSubmit(formData);

    if (response.success) {
        toast.success("Form submitted successfully!");
        
        // Use formRef to reset the form
        if (formRef.current) {
            formRef.current.reset();
        }
    } else {
        toast.error("Failed to submit form, please try again.");
    }
};


    return(
        <>
             <Toaster richColors /> {/* Toast container to display notifications */}

        <form ref={formRef} className='flex flex-col gap-4' onSubmit={handleFormSubmit}>
            <input name="name" type='text' placeholder='name' className='border-2 p-[2px] w-fill max-w-[200px]' required />
            <input name="email" type='email' placeholder='email' className='border-2 p-[2px] w-fill max-w-[300px]' required />
            <input name="phone" type='tel' placeholder='phone' className='border-2 p-[2px] w-fill max-w-[200px]' required />
            <textarea name="message" placeholder='message' className='border-2 p-[2px]' required />
            <button 
                className="primary-color p-2 bg-slate-100/50 w-fit rounded-md hover:bg-slate-100"
                type="submit"
            >
                Submit
            </button>
        </form>
        </>)
}