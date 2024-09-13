'use client'
import { useEffect, useState } from "react";
import Image from 'next/image';
import { createClient } from "@/utils/supabase/client";

import {useRouter} from 'next/navigation';
import AvatarSkeleton from "@/components/skeletons/avatar";


export default function Auth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [userName, setUserName] = useState<string | null>(null)
    const router = useRouter();

    const supabase = createClient();

    useEffect(() => {
        const checkAuthStatus = async () => {
            const {data: {user } } = await supabase.auth.getUser();
            if(user){
                setIsAuthenticated(true);
                setUserName(user.email ?? "Anonymous User");
                setProfileImage('/navbar/profile.svg'); // Fetch additional profile data like profile image
            } else {
                setIsAuthenticated(false);
                setProfileImage(null);
                setUserName(null);
            }
                 
        };
        
        checkAuthStatus();
    }
    )
    const handleSignIn = () => {
        router.push('/sign-in'); // Redirect to sign-in page
      };
    
      // Handle user sign-out
      const handleSignOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
          console.error('Error signing out:', error.message);
        } else {
          setIsAuthenticated(false);
          setProfileImage('/profile.svg'); // Reset to default SVG when signing out
          router.push('/sign-in'); // Redirect to sign-in page after sign out
        }
      };
      

    if(isAuthenticated){ 
      return (
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Image
              src={profileImage || ''} // Fallback to a default profile image if none exists
              height={30}
              width={30}
              alt="Profile"
              className="rounded-full cursor-pointer"
              onClick={handleSignOut} // Clicking the profile image will sign the user out
            />
          </div>

        </div>
      )
  } else {
    return(
      <>
        <AvatarSkeleton />
      </>
    )
  }
}
