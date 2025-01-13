import { logout } from "@/app/lib/auth";
import { BriefcaseIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  ArrowLeftStartOnRectangleIcon as LogOutIcon,
  PresentationChartLineIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import { useEffect, useRef, useState } from "react";
import { FaFishFins } from "react-icons/fa6";
import Link from "next/link";

const Header = ({ title, profile }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    setProfileMenuOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="mx-7 my-6 flex flex-row items-center justify-between">
      <div className="flex items-center gap-4">
        <MiniNav />
        <h1 className="text-3xl font-bold text-sky-950">{title}</h1>
      </div>
      <div className="relative flex items-center gap-3">
        {/* Modificação aqui: escondendo o nome em telas pequenas */}
        {profile.name && (
          <span className="hidden font-semibold text-sky-900 md:inline">
            {profile.name}
          </span>
        )}
        <img
          className="h-14 w-14 cursor-pointer rounded-full object-cover shadow-sm"
          src={profile.picture || "https://www.pudim.com.br/pudim.jpg"}
          alt="Perfil"
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
        />
        {profileMenuOpen && (
          <ul
            ref={menuRef}
            className="absolute right-0 top-10 mt-2 w-48 rounded-lg border border-gray-200 bg-white shadow-lg"
          >
            <li>
              <Link
                href="/profile"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Minha Conta
              </Link>
            </li>
            <li>
              <Link
                href="/config"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                <WrenchScrewdriverIcon className="mr-2 inline h-5 w-5" />
                Configurações
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                onClick={logout}
                className="block px-4 py-2 text-red-600 hover:bg-red-100"
              >
                <LogOutIcon className="mr-2 inline h-5 w-5" />
                Sair da Conta
              </Link>
            </li>
          </ul>
        )}
      </div>
    </header>
  );
};

function MiniNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative flex list-none flex-col items-center justify-between md:hidden">
      <img
        src="/static/logo/golden.jpg"
        alt="Logo"
        className="h-14 w-14 rounded-full border border-slate-600 p-[6px] shadow-sm"
        onClick={() => setOpen(!open)}
      />
      <ul
        className={`absolute top-[4.5rem] flex origin-top list-none flex-col items-center space-y-5 rounded-full border border-slate-400 bg-slate-100 p-3 shadow transition-transform duration-500 ease-in-out ${
          open ? "translate-y-0 scale-y-100" : "-translate-y-10 scale-y-0"
        }`}
      >
        <NavItem Icon={HomeIcon} text="Home" url="/" />
        <NavItem Icon={FaFishFins} text="Produtos" url="/prods" />
        <NavItem Icon={PresentationChartLineIcon} text="Vendas" url="/vendas" />
        <NavItem Icon={UsersIcon} text="Clientes" url="/client" />
        <NavItem Icon={BriefcaseIcon} text="Funcionários" url="/users" />
        <NavItem
          Icon={WrenchScrewdriverIcon}
          text="Configurações"
          url="/config"
        />
      </ul>
    </nav>
  );
}

function NavItem({ Icon, url }) {
  return (
    <li>
      <Link href={url}>
        <Icon className="hover:text-yellow-light h-7 w-7 text-slate-700 transition-colors duration-300" />
      </Link>
    </li>
  );
}

export default Header;
