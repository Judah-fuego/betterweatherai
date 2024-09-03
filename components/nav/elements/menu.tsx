'use client'
import React, {useState} from 'react'
import Image from "next/image";
import { motion } from 'framer-motion';

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    }

    return(
        <div className="flex flex-row gap-1 ml-11">
            <Image 
            src="/logo/full-logo.png" 
            height={70}
            width={70}
            alt="Logo navbar"/>
            <motion.button
        title="hamburger"
        onClick={handleClick}
        initial={{ rotate: 0 }}
        animate={{ rotate: isOpen ? 180 : 0 }} // Animate rotation when `isOpen` changes
        transition={{ duration: 0.3 }} // Control the animation speed
      >
        <Image
          src={isOpen ? '/navbar/menu-open-circle.svg' : '/navbar/menu-close-circle.svg'}
          height={30}
          width={30}
          alt="Menu Item"
        />
      </motion.button>
        </div>
    )
    
}