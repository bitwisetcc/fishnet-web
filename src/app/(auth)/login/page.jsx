"use client";

import { login, STAFF_ROLES } from "@/app/lib/auth";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/outline";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const router = useRouter();
  const error = useSearchParams().get("error");
  const [errorMsg, setErrorMsg] = useState("");

  function submit(e) {
    e.preventDefault();
    const form = e.target;

    login(form.email.value, form.password.value)
      .then((role) => {
        if (STAFF_ROLES.includes(role)) router.push("/dashboard");
        else router.push("/");
      })
      .catch((e) => setErrorMsg(e.message));
  }

  useEffect(() => {
    switch (error) {
      case null:
        break;

      case "role":
        setErrorMsg("Cargo inválido");
        break;

      default:
        setErrorMsg("Erro de autenticação");
        console.log(error);
        break;
    }
  }, [error]);

  return (
    <article className="relative flex h-[100vh] items-center justify-center overflow-hidden">
      <div className="bg-blue-dark absolute inset-0"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="absolute -bottom-20 -left-20 h-[300px] w-[300px] animate-pulse rounded-full bg-[#CBAD51] opacity-30"></div>
        <div className="absolute left-40 top-40 h-[200px] w-[200px] animate-pulse rounded-full bg-[#CBAD51] opacity-20"></div>
        <div className="absolute bottom-10 right-10 h-[150px] w-[150px] animate-pulse rounded-full bg-[#CBAD51] opacity-25"></div>
        <div className="absolute left-20 top-20 h-[100px] w-[100px] animate-pulse rounded-full bg-[#CBAD51] opacity-30"></div>
        <div className="absolute bottom-40 right-40 h-[180px] w-[180px] animate-pulse rounded-full bg-[#CBAD51] opacity-20"></div>
        <div className="absolute bottom-20 left-60 h-[130px] w-[130px] animate-pulse rounded-full bg-[#CBAD51] opacity-25"></div>
        <div className="absolute right-60 top-10 h-[90px] w-[90px] animate-pulse rounded-full bg-[#CBAD51] opacity-30"></div>
      </div>

      <form
        className="z-10 flex w-[90%] max-w-[800px] flex-col rounded-lg border border-slate-400 bg-slate-100 p-9 text-slate-800 shadow-lg md:flex-row"
        onSubmit={(e) => submit(e)}
      >
        <section className="mb-8 flex flex-1 items-center justify-center border-b border-slate-300 pr-0 md:mb-0 md:mr-8 md:border-b-0 md:border-r md:pr-5">
          <img
            src="/static/logo/blue-white-bg.jpg"
            alt="Logo FishNet"
            className="h-32 w-32"
          />
        </section>

        <section className="flex-1">
          <h2 className="text-center text-2xl font-semibold md:text-left">
            Bem vindo(a)!
          </h2>

          {errorMsg && (
            <p className="mt-2 flex flex-row items-center rounded-md border border-red-500 bg-red-300 p-2 text-red-500">
              <button onClick={() => setErrorMsg(null)}>
                <XMarkIcon className="size-5 text-red-800" />
              </button>
              {errorMsg}
            </p>
          )}

          <div className="mt-4 flex flex-col gap-5">
            <div>
              <span className="flex items-center rounded-lg border border-slate-200 bg-white shadow-sm">
                <UserIcon className="size-9 py-2 text-gray-500" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="@username"
                  className="flex-1 bg-transparent p-2 outline-none"
                />
              </span>
            </div>
            <div>
              <span className="flex items-center rounded-lg border border-slate-200 bg-white shadow-sm">
                <LockClosedIcon className="size-9 py-2 text-gray-500" />
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  placeholder="password123"
                  className="flex-1 bg-transparent p-2 outline-none"
                />
              </span>
            </div>
            <a
              href="/reset-password"
              className="text-blue-dark hover:text-yellow-light w-max"
            >
              Esqueceu a senha?
            </a>
            {/* <a
              href="/users/new"
              className="text-blue-dark hover:text-yellow-light w-max"
            >
              Não tem uma conta? Crie agora!
            </a> */}
            <button
              type="submit"
              className="bg-blue-dark rounded-lg py-2 text-white shadow-sm"
            >
              Login
            </button>
          </div>
        </section>
      </form>
    </article>
  );
}
