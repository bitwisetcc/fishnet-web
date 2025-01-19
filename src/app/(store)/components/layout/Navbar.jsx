"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { listProductNames } from "../../../lib/query";
import debounce from "lodash.debounce";
import { Squares2X2Icon } from "@heroicons/react/24/outline";

export default function Nav() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileSearchVisible, setIsMobileSearchVisible] = useState(false);
  const searchRef = useRef(null);
  const resultsRef = useRef(null);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // Função para busca de produtos
  const fetchProducts = useCallback(
    debounce(async (query) => {
      if (query) {
        try {
          const products = await listProductNames(query, 1, 10);
          setResults(products);
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
        }
      } else {
        setResults([]);
      }
    }, 500),
    [],
  );

  useEffect(() => {
    if (searchTerm) {
      fetchProducts(searchTerm);
    } else {
      setResults([]);
    }
  }, [searchTerm, fetchProducts]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        resultsRef.current &&
        !resultsRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    setIsDropdownVisible(!!value);
  };

  const handleInputFocus = () => {
    if (searchTerm) {
      setIsDropdownVisible(true);
    }
  };

  const handleNavigateToProducts = () => {
    navigate("/products");
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchVisible(!isMobileSearchVisible);
  };

  return (
    <div className="group sticky inset-x-0 top-0 z-50 text-slate-200">
      <header className="relative mx-auto h-16 text-nowrap border-b border-slate-900 bg-accent px-4 duration-200 sm:h-20 sm:px-10">
        <nav className="content-container flex h-full items-center justify-between text-sm">
          {/* Logo */}
          <div className="flex items-center">
            <a
              href="/"
              className="flex items-center gap-3 text-sm font-semibold text-golden-fish duration-150 hover:text-yellow-600"
            >
              <Image
                src="/static/logo/blue-white-bg.jpg"
                alt="Logo da FishNet"
                width={32}
                height={32}
                className="rounded-full sm:h-10 sm:w-10"
              />
              <span className="hidden sm:block">FISHNET STORE</span>
            </a>
          </div>

          {/* Campo de busca: visível em telas grandes, escondido em telas pequenas */}
          <div
            className="relative ml-5 hidden items-center sm:flex"
            ref={searchRef}
          >
            <input
              type="text"
              name="search"
              placeholder="O que você procura?"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="w-96 rounded-full border border-stone-600 px-3 py-2 text-black focus:border-stone-500 focus:outline-none"
            />
            <MagnifyingGlassIcon className="absolute right-3 top-1/2 h-5 -translate-y-1/2 transform text-black" />

            {isDropdownVisible && results.length > 0 && (
              <div
                className="absolute top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg"
                ref={resultsRef}
              >
                <ul className="divide-y divide-gray-300">
                  {results.map((result, index) => (
                    <a
                      key={index}
                      className="text-black"
                      href={`/products/${result.id}`}
                    >
                      <li className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:rounded-lg hover:bg-gray-200">
                        <MagnifyingGlassIcon className="h-4 text-black" />
                        {result.name}
                      </li>
                    </a>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Ícones compactos e busca para telas pequenas */}
          <div className="flex h-full items-center gap-x-4 sm:gap-x-6">
            <button className="block sm:hidden" onClick={toggleMobileSearch}>
              <MagnifyingGlassIcon className="h-6 w-6 text-golden-fish transition hover:text-yellow-400" />
            </button>

            <a
              href="/products"
              className="flex items-center gap-2 text-golden-fish hover:text-yellow-400"
              title="Catálogo"
            >
              <Squares2X2Icon className="h-6 w-6 transition" /> Catálogo
            </a>

            <a href="/cart" className="flex items-center">
              <ShoppingCartIcon className="h-6 w-6 text-golden-fish transition hover:text-yellow-400" />
            </a>

            {!isLoggedIn ? (
              <a href="/login" className="flex items-center gap-2">
                <UserCircleIcon className="h-6 w-6 text-golden-fish transition" />
              </a>
            ) : (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:text-red-400"
              >
                Sair
              </button>
            )}
          </div>
        </nav>

        {/* Campo de busca para telas pequenas */}
        {isMobileSearchVisible && (
          <div className="flex items-center p-4 sm:hidden">
            <input
              type="text"
              name="mobile-search"
              placeholder="O que você procura?"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="flex-1 rounded-full border border-stone-600 px-3 py-2 text-black focus:outline-none"
            />
            {isDropdownVisible && results.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full z-50 mt-20 max-h-60 overflow-y-auto rounded-lg border border-gray-300 bg-white shadow-lg"
                ref={resultsRef}
              >
                <ul className="divide-y divide-gray-300">
                  {results.map((result, index) => (
                    <a
                      key={index}
                      className="text-black"
                      href={`/products/${result.id}`}
                    >
                      <li className="flex cursor-pointer items-center gap-2 px-4 py-2 hover:rounded-lg hover:bg-gray-200">
                        <MagnifyingGlassIcon className="h-4 text-black" />
                        {result.name}
                      </li>
                    </a>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </header>
    </div>
  );
}
