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
    <ul className="hidden h-full list-none flex-col items-center justify-start gap-6 bg-blue-dark p-4 pb-8 md:flex">
      <img
        src="/static/logo/blue-white-bg.jpg"
        alt="Logo"
        className="h-14 w-14 rounded-full border-2 border-slate-600 p-[6px] shadow-sm"
      />
      <NavItem Icon={HomeIcon} text="Início" url="/dashboard" />
      <NavItem Icon={FaFishFins} text="Produtos" url="/prods" />
      <NavItem Icon={PresentationChartLineIcon} text="Vendas" url="/vendas" />
      <NavItem Icon={UsersIcon} text="Clientes" url="/client" />
      <NavItem Icon={BriefcaseIcon} text="Staff" url="/users" />
      <NavItem Icon={WrenchScrewdriverIcon} text="Configurar" url="/config" />
      <NavItem
        Icon={ArrowLeftStartOnRectangleIcon}
        text="Log out"
        url="/login"
      />
    </ul>
  );
}

function NavItem({ Icon, text, url }) {
  return (
    <li className="items-end last:flex last:flex-1">
      <Link
        href={url}
        className="tooltip tooltip-top flex items-center before:z-10"
        data-tip={text}
      >
        <Icon className="h-7 w-7 text-yellow-light transition-colors duration-300 hover:text-gray-light" />
      </Link>
    </li>
  );
}
