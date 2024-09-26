'use client'
import {useState, useEffect} from 'react'
import Image from 'next/image'
import {createClient} from '@/utils/supabase/client'
import {toast, Toaster} from 'sonner'

export default function Home({params}: {params: {city: string, region: string}}){
    if(!params || !params.city || !params.region) {
        console.error("Params not working")
    }
    const [isHome, setIsHome] = useState(false)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const supabase = createClient();

    useEffect(() => {
        const checkAuth = async () => {
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            setIsAuthenticated(true);
            // Load user's existing favorites
            loadHome();
          }
        };
        checkAuth();
      }, []);
  
    const loadHome = async () => {
        const {data: {user}, error: userError} = await supabase.auth.getUser();

        if (userError) {
            console.error("Error fetching user:", userError.message);
            return;
          }

        
        if(user){

            const { error: homeError, data: homeData } = await supabase
            .from('profiles')
            .select('home')
            .eq('email', user.email ?? '') // Use eq instead of ilike and provide a fallback empty string
            .single();

            if (homeError) {
                console.error("Error fetching profile:", homeError);
                console.error("Supabase Response:", homeData);
                return;
            }

            if (homeData && homeData.home) {
                setIsHome(homeData.home === `${params.city}, ${params.region}`);
            }
        }

    }

    const changeHome = async () => {
       if(!isAuthenticated){
        toast.error("Please login to add Home");
        return;
       }
       if(isHome){
            const {data: {user} } = await supabase.auth.getUser();
            if(user){
            const{error} = await supabase
            .from('profiles')
            .update({home: " "})
            .eq('email', user.email)
            if(error) {
                console.error("Error updating favorites:", error.message);
                toast.error("Failed to update favorites");
        
               }
            }
            toast.error("Removed as Home");
            setIsHome(false)
       } else {
            toast.success("Added as Home")
            setIsHome(true)
            const cityRegion = `${params.city}, ${params.region}`;

        const {data: {user} } = await supabase.auth.getUser();
        if(user){
            const {error} = await supabase
            .from('profiles')
            .update({home: cityRegion})
            .eq('email', user.email)
            
        
        if(error) {
            console.error("Error updating favorites:", error.message);
            toast.error("Failed to update favorites");
    
           }
       }
       }

       

       

    }


    return(
        <>
            <Image 
            src={ isHome ? `/home/add_home.svg`:`/home/smile_home.svg`}
            alt="home"
            width={20}
            height={20}
            className='cursor-pointer mb-1'
            onClick={changeHome}
            />
            <Toaster richColors/>

        </>
    )
}