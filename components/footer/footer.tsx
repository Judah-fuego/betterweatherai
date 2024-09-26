"use client"
import { useState, useEffect } from "react";
import ContactUsForm from "./contactUsForm";
import Image from "next/image";

export default function Footer() {
    const countries = [
        "Canada",
        "Brazil",
        "Germany",
        "Australia",
        "Japan",
        "Nigeria",
        "Italy",
        "Spain",
        "India",
        "Mexico",
        "Kenya",
        "France",
        "China",
        "Egypt",
        "Sweden",
        "Argentina",
        "South Korea",
        "Netherlands",
        "Turkey",
        "Norway",
        // Add more countries as desired
    ];

    const [isHovering, setIsHovering] = useState(false);
    const [currentCountry, setCurrentCountry] = useState("Country");
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (isHovering) {
            const id = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * countries.length);
                setCurrentCountry(countries[randomIndex]);
            }, 10000); // Change country every 1 second
            setIntervalId(id);
        } else {
            setCurrentCountry("Country");
            if (intervalId) {
                clearInterval(intervalId);
                setIntervalId(null);
            }
        }

        // Cleanup on unmount
        return () => {
            if (intervalId) {
                clearInterval(intervalId);
            }
        };
    }, [isHovering, countries, intervalId]);

    return (
        <div className="flex flex-row justify-evenly gap-4 p-10 w-[90vw] flex-wrap">
            <Image 
                src="/logo/full-logo.png" 
                alt="logo"
                width={98}
                height={70}
                className="h-[70px] w-[98px] rounded-md mt-2"
            />
            <div>
                <ContactUsForm/>
            </div>
            <div>
                <h1 className="text-2xl font-bold border-b-2 border-primary-color">Follow Creator</h1>
                <div className="flex flex-col gap-4 mt-2 items-center ">
                    <div className="flex flex-row gap-2 items-center">
                        <h1 className="text-xl">Instagram:</h1>
                        <a href="https://www.instagram.com/judahfuego.build/" target="_blank" rel="noopener noreferrer">
                        <Image src="/instagram.svg" 
                            width={40}
                            height={30}
                            alt="Instagram"/>
                        </a>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <h1 className="text-xl">Github:</h1>
                        <a href="https://github.com/Judah-fuego" target="_blank" rel="noopener noreferrer">
                        <Image src="/github.svg" 
                            width={40}
                            height={30}
                            alt="Github"/>
                        </a>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                        <h1 className="text-xl">LinkedIn:</h1>
                        <a href="https://www.linkedin.com/in/judah-boyce-1a0b24301/" target="_blank" rel="noopener noreferrer">
                            <Image src="/linkedin.svg" 
                            width={40}
                            height={30}
                            alt="LinkedIn"/>
                        </a>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-2xl font-bold border-b-2 border-primary-color">Quick Links</h1>
                <div className="flex flex-col gap-4 mt-2 ">
                    <a href="/" className="text-md hover:text-primary-color hover:underline transition-all duration-300">Home</a>
                    <a href="/" className="text-md hover:text-primary-color hover:underline">About</a>
                    <a 
                        href={currentCountry === "Country" ? `/Country/` : `/Country/${currentCountry}`}
                        className="text-md hover:text-primary-color hover:underline"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                    >
                        {currentCountry}
                    </a>
                    <a href="/" className="text-md hover:text-primary-color hover:underline">U.S.A</a>
                </div>
            </div>
        </div>
    )
}