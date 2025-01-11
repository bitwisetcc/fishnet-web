import { useRouter } from "next/navigation";
import { API_URL } from "./query";
import { useContext, useEffect } from "react";
import { ProfileContext } from "./stores";

export const STAFF_ROLES = ["admin", "staff"];

export function logout() {
  localStorage.removeItem("token");
  window.location.reload();
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Erro na resposta da API:", errorText);
    throw new Error(`Erro na API: ${res.status}`);
  }

  const { token, role } = await res.json();

  if (token === undefined) throw Error("Credenciais inválidas");
  if (!STAFF_ROLES.includes(role)) throw Error("Cargo inválido");

  localStorage.setItem("token", token);
  return role;
}

export function useAuth(setter = null, staffOnly = false) {
  const router = useRouter();

  const setProfile = useContext(ProfileContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token === null) {
      router.push("/login");
      return () => {};
    }

    fetch(`${API_URL}/auth/check`, { headers: { Authorization: token } })
      .then((res) => res.json())
      .then((data) => {
        if (staffOnly && !allowed_roles.includes(data.role)) router.push("/");
        setProfile(data);
        if (setter !== null) setter(data);
      })
      .catch(() => router.push("/login"));
  }, [router, setProfile, setter]);
}
