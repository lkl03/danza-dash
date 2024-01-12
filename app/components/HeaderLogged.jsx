import { MdLogout } from "react-icons/md";
import Link from "next/link";

const HeaderLogged = () => {
    return (
      <header className="flex items-center justify-between w-full p-6 px-10 bg-white border-b">
        <Link href='/home'>
          <h1 className="text-2xl font-bold text-[#211f1f]">Danza</h1>
        </Link>
        <Link href='/' className="text-red-500 text-2xl">
          <MdLogout />
        </Link>
      </header>
    );
  };
  
  export default HeaderLogged;