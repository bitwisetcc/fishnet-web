import { useRouter } from "next/navigation";
import { API_URL } from "./query";
import { useEffect } from "react";

export function logout() {
  localStorage.removeItem("token");
  window.location.reload();
}

//Conexão onde retorna o erro pelo console da API
export async function login(email, password) {
  try {
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

    const data = await res.json();
    const { token } = data;

    if (!token) throw new Error("Credenciais inválidas");

    localStorage.setItem("token", token);
    console.log("Autenticação completa");
  } catch (error) {
    console.error("Erro durante o login:", error);
  }
}
