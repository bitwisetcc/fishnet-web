import {
  BriefcaseIcon,
  HomeIcon,
  ArrowLeftStartOnRectangleIcon as LogOutIcon,
  PresentationChartLineIcon,
  UsersIcon
} from "@heroicons/react/24/solid";
import Tippy from "@tippyjs/react";
import Link from "next/link";
import { FaFishFins } from "react-icons/fa6";
import "tippy.js/dist/tippy.css";

export default function NavBar() {
  return (
    <nav className="md:flex hidden sticky flex-col justify-between items-center list-none pb-12 p-5 mr-2 h-[100vh] top-0 left-0 bg-blue-dark shadow-right-lg">
      <ul className="list-none flex flex-col space-y-7 items-center">
        <img
          src="/static/logo/blue-white-bg.png"
          alt="Logo"
          className="rounded-full border-2 border-slate-600 shadow-sm p-[6px] w-14 h-14"
        />
        <NavItem Icon={HomeIcon} text="Dashboard" url="/dashboard" />
        <NavItem Icon={FaFishFins} text="Produtos" url="/prods" />
        <NavItem Icon={PresentationChartLineIcon} text="Vendas" url="/vendas" />
        <NavItem Icon={UsersIcon} text="Clientes" url="/client" />
        <NavItem Icon={BriefcaseIcon} text="Funcionários" url="/users" />
        {/* <NavItem Icon={WrenchScrewdriverIcon} text="Configurações" url="/config" /> */}
      </ul>
      <NavItem Icon={LogOutIcon} text="Sair" url="/login" />
    </nav>
  );
};

function NavItem({ Icon, text, url }) {
  return (
    <li className="only-of-type:stroke-[10px]">
      <Tippy content={text} placement="bottom" delay={50} arrow>
        <Link href={url} className="flex items-center">
          <Icon className="w-7 h-7 text-yellow-light hover:text-gray-light transition-colors duration-300" />
        </Link>
      </Tippy>
    </li>
  );
}
