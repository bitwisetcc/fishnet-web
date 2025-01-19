import { phone } from "@/app/lib/format";
import { User } from "../lib";

interface UserLineProps {
  user: User;
}

export default function UserLine({ user }: UserLineProps) {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{phone(user.phone)}</td>
      <td>{user.email}</td>
      <td>{user.cpf ?? user.cnpj}</td>
      <td>
        <span className="badge badge-outline">{user.uf}</span>
      </td>
      <td>
        <button className="btn btn-ghost">...</button>
      </td>
    </tr>
  );
}
