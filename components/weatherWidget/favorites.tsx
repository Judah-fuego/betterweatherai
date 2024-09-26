'use client'

import Image from "next/image";
import { Toaster, toast } from "sonner";
import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

interface FavoritesProps {
  city: string;
  region: string;
}

export const Favorites: React.FC<FavoritesProps> = ({ city, region }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const supabase = createClient();

  // Check if the user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        setIsAuthenticated(true);
        // Load user's existing favorites
        loadFavorites();
      }
    };
    checkAuth();
  }, []);



  const loadFavorites = async () => {
    // Fetch the current authenticated user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
  
    // Handle any authentication errors
    if (userError) {
      console.error("Error fetching user:", userError.message);
      return;
    }
    console.log("User:", user);
  
    // Proceed only if a user is found
    if (user) {
      // Attempt to fetch the user's profile based on their email
      const {  error: profileError, data: profile, } = await supabase
        .from('profiles')
        .select('favorites')
        .eq('email', user.email ?? '') // Use eq instead of ilike and provide a fallback empty string
        .maybeSingle(); // Use maybeSingle to handle cases with no or multiple rows
        
      // Handle any profile fetching errors
      if (profileError ) {
  console.error("Error fetching profile:", profileError);
  console.error("Supabase Response:", profile);
  return;
}
console.log("Profile:", profile);
  
      // If a profile is found and it has favorites, check if a specific city-country string is included
      if (profile) {
        // Check if the specific city-country combination exists in the favorites array
        const searchString = `${city}, ${region}`;
        const isFavoriteExists = profile.favorites.includes(searchString);
  
        setFavorites(profile.favorites); // Set favorites state
        setIsFavorite(isFavoriteExists); // Set whether the specific favorite exists
      } else {
        console.log("No profile or favorites found.");
        setFavorites([]); // Clear favorites if no data is found
        setIsFavorite(false); // Reset favorite state
      }
    }
  };

  // Function to add or remove a favorite
  const setFavorite = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to add to favorites");
      return;
    }

    const cityRegion = `${city}, ${region}`;
    let updatedFavorites;

    if (isFavorite) {
      // Remove from favorites
      updatedFavorites = favorites.filter(fav => fav !== cityRegion);
      toast.error("Removed from favorites");
    } else {
      // Add to favorites
      updatedFavorites = [...favorites, cityRegion];
      toast.success("Added to favorites");
    }

    setIsFavorite(!isFavorite);
    setFavorites(updatedFavorites);

    // Update Supabase with new favorites array
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from('profiles')
        .update({ favorites: updatedFavorites })
        .eq('email', user.email); // Adjust if you use another column for identification

      if (error) {
        console.error("Error updating favorites:", error.message);
        toast.error("Failed to update favorites");
        // Revert local state on failure
        setFavorites(favorites);
        setIsFavorite(!isFavorite);
      }
    }
  };

  return (
    <>
      <Image
        src={isFavorite ? "/favorite/filled.svg" : "/favorite/empty.svg"}
        width={20}
        height={20}
        alt="Favorites"
        className="cursor-pointer"
        onClick={setFavorite}
      />
      <Toaster richColors/>
    </>
  );
};