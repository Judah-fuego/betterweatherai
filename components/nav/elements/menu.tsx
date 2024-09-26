'use client'
import React, {useState} from 'react'
import Image from "next/image";
import { motion } from 'framer-motion';
import MenuOpen from './menu-open';

export default function Menu() {
    const [isOpen, setIsOpen] = useState(false)

    const handleClick = () => {
        setIsOpen(!isOpen);
        console.log(isOpen)
    }

    return(
    <div className="flex flex-row items-center gap-1 ml-11">
            <a href='/'><Image 
            src="/logo/full-logo.png" 
            height={70}
            width={70}
            alt="Logo navbar"
            className="cursor-pointer rounded-sm"/></a>
      <div className="pt-2 relative">
        <div>
          <motion.button
        title="hamburger"
        onClick={handleClick}
        initial={{ rotate: 0 }}
        animate={{ rotate: isOpen ? 180 : 0 }} // Animate rotation when `isOpen` changes
        transition={{ duration: 0.3 }} // Control the animation speed
        >
          <Image
          src={!isOpen ? '/navbar/menu-open-circle.svg' : '/navbar/menu-close-circle.svg'}
          height={30}
          width={30}
          alt="Menu Item"
          />
        </motion.button>
        </div>
        {isOpen && <MenuOpen/>}

      </div>
        
            
     
      </div>
    )
    
}