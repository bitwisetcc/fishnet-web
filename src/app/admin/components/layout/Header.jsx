import { logout } from "@/app/lib/auth";
import {
  ArrowLeftStartOnRectangleIcon,
  BriefcaseIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  HomeIcon,
  PresentationChartLineIcon,
  UsersIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { useState } from "react";
import { FaFishFins } from "react-icons/fa6";

const Header = ({ title, profile }) => {
  return (
    <header className="mx-7 my-6 flex flex-row items-center justify-between">
      <div className="flex items-center gap-4">
        <MiniNav />
        <h1 className="text-3xl font-bold text-sky-950">{title}</h1>
      </div>
      <div className="relative flex items-center gap-3">
        {profile.name && (
          <span className="hidden font-semibold text-sky-900 md:inline">
            {profile.name}
          </span>
        )}
        <div className="dropdown dropdown-end">
          <img
            className="h-14 w-14 cursor-pointer rounded-full object-cover shadow-sm"
            tabIndex={0}
            role="button"
            src={profile.picture || "https://www.pudim.com.br/pudim.jpg"}
            alt="Perfil"
          />
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-52 rounded-box bg-base-200 p-2 shadow"
          >
            <li>
              <Link href="/profile">
                <UserIcon className="mr-2 inline size-5" />
                Minha Conta
              </Link>
            </li>
            <li>
              <Link href="/config">
                <WrenchScrewdriverIcon className="mr-2 inline h-5 w-5" />
                Configurações
              </Link>
            </li>
            <li onClick={logout}>
              <a href="" target="_self">
                <ArrowLeftStartOnRectangleIcon className="mr-2 inline size-5" />
                Sair da conta
              </a>
            </li>
          </ul>
        </div>
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
        <Icon className="h-7 w-7 text-slate-700 transition-colors duration-300 hover:text-yellow-light" />
      </Link>
    </li>
  );
}

export default Header;
