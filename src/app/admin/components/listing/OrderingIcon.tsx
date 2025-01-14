import {
  ArrowDownIcon,
  ArrowsUpDownIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";

interface OrderingIconProps {
  variants: {
    default: any;
    ascending: any;
    descending: any;
  };

  state: any;
}

export default function OrderingIcon({ variants, state }: OrderingIconProps) {
  switch (state) {
    case variants.ascending:
      return <ArrowUpIcon className="size-5" />;
    case variants.descending:
      return <ArrowDownIcon className="size-5" />;
    default:
      return <ArrowsUpDownIcon className="size-5" />;
  }
}
