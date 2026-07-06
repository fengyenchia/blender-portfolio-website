'use client';

import { MdOutlineMail } from "react-icons/md";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";


import Link from "next/link";

export default function Footer() {
 
  return (
    <div className="w-full h-full bg-neutral-900  text-gray-400 py-8">

      <div className="flex flex-col items-center justify-center gap-4">
        {/* icon */}
        <div className="text-md flex justify-center items-center gap-4">
          <Link href="mailto:yanjia20050504@gmail.com" className="hover:text-white transition-all duration-600" target="_blank">
          <MdOutlineMail />
          </Link>
          <Link href="https://www.linkedin.com/in/fengyenchia" className="hover:text-white transition-all duration-600" target="_blank" >
            <FaLinkedin />
          </Link>
          <Link href="https://www.instagram.com/yenchia._.0504" className="hover:text-white transition-all duration-600" target="_blank">
          <FaInstagram />
          </Link>
          <Link href="https://github.com/fengyenchia" className="hover:text-white transition-all duration-600" target="_blank">
            <FaGithub />
          </Link>          
        </div>
        <div className="text-xs flex flex-col items-center justify-center gap-1">
          <p>
            &copy; 2026 Yen-Chia, Feng. All rights reserved.
          </p>
        </div>

      </div>

    </div>
  );
}