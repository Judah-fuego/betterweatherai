'use client'
import {useRouter} from 'next/navigation';

export default function NotAuth(){
    const router = useRouter();
    const handleSignIn = () => {
        router.push('/sign-in'); // Redirect to sign-in page
      };

    return (
        <button className="mt-2 bg-slate-600 text-sm text-white rounded px-2 h-10 hover:bg-slate-500" onClick={handleSignIn}>
            Sign In / Sign Up
        </button>
    )
}