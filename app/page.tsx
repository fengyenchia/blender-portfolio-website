import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col flex-1 items-center justify-center bg-zinc-50 text-neutral-900">
      <div className="relative w-full h-screen bg-[url('/images/banner.png')] bg-cover bg-center">
           <p>Yen-Chia &apos;s Blender Portfolio Website</p>
           <Link
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xs text-[12px] px-4 py-3 font-semibold border-2 border-zinc-50 bg-zinc-50 hover:text-zinc-50 hover:border-zinc-50 hover:bg-black/20 transition-all duration-600"
             href="https://drive.google.com/drive/u/1/folders/1nl7SOeFJaE3tn8cVk4DDU983IRiVFVir?usp=sharing"
           >
            電腦動畫 - 雲端總連結 
           </Link> 
      </div>
    </div>
  );
}
