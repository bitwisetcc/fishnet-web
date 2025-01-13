import {
  ArrowLeftStartOnRectangleIcon,
  BriefcaseIcon,
  HomeIcon,
  PresentationChartLineIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { FaFishFins } from "react-icons/fa6";

export default function NavBar() {
  return (
    <nav className="sticky left-0 top-0 mr-2 hidden h-[100vh] list-none flex-col items-center justify-between bg-blue-dark p-5 pb-12 md:flex">
      <ul className="flex list-none flex-col items-center space-y-7">
        <img
          src="/static/logo/blue-white-bg.jpg"
          alt="Logo"
          className="h-14 w-14 rounded-full border-2 border-slate-600 p-[6px] shadow-sm"
        />
        <NavItem Icon={HomeIcon} text="Dashboard" url="/dashboard" />
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
      <NavItem Icon={ArrowLeftStartOnRectangleIcon} text="Sair" url="/login" />
    </nav>
  );
}

function NavItem({ Icon, text, url }) {
  return (
    <li className="only-of-type:stroke-[10px]">
      <div className="tooltip tooltip-right" data-tip={text}>
        <Link href={url} className="flex items-center">
          <Icon className="h-7 w-7 text-yellow-light transition-colors duration-300 hover:text-gray-light" />
        </Link>
      </div>
    </li>
  );
}
