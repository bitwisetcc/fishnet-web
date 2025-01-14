import { useEffect, useId, useRef, useState } from "react";
import { API_URL } from "@/app/lib/query";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function RegisterProductModal() {
  const dialogRef = useRef(null);

  function submit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    // data.pictures = [];

    // for (const key in data) {
    //   if (key.startsWith("image-")) {
    //     data.pictures.push(data[key]);
    //     delete data[key];
    //   }
    // }

    fetch(`${API_URL}/prods/new`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(console.log)
      .catch(console.error);
  }

  return (
    <dialog ref={dialogRef} className="modal" id="md-register-prod">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            <XMarkIcon className="size-5 text-slate-800" />
          </button>
        </form>

        <form
          className="space-y-2 overflow-y-scroll px-2 text-stone-900"
          onSubmit={submit}
        >
          <FormField name="name" label="Nome" placeholder="Glowlight Tetra" />
          <FormField
            name="scientificName"
            label="Nome científico"
            placeholder="Hemigrammus erythrozonus"
          />
          <FormField
            name="price"
            label="Preço"
            placeholder="29.95"
            type="number"
          />

          <FormField name="origin" label="Origem" placeholder="Guiana" />

          <div className="field">
            <label htmlFor="txt-ph">pH ideal do ambiente</label>
            <input
              type="text"
              name="ph"
              id="txt-ph"
              placeholder="5.5 - 7.5"
              maxLength={12}
            />
          </div>
          <div className="field">
            <label htmlFor="txt-ph">Tamanho mínimo de tanque</label>
            <input
              type="text"
              name="tank_size"
              id="txt-tank_size"
              placeholder="6L"
              maxLength={7}
            />
          </div>
          <div className="field">
            <label htmlFor="txt-temperature">Temperatura</label>
            <input
              type="text"
              name="temperature"
              id="txt-temperature"
              placeholder="15 - 20ºC"
              maxLength={12}
            />
          </div>
          <div className="field">
            <label htmlFor="txt-expectancy">Expectativa de vida (meses)</label>
            <input
              type="number"
              name="expectancy"
              id="txt-expectancy"
              placeholder="30"
              max={1000}
            />
          </div>
          <div className="field">
            <label htmlFor="size">Tamanho Adulto</label>
            <input
              type="text"
              name="size"
              id="size"
              placeholder="1.3 - 2.5cm"
              maxLength={20}
            />
          </div>
          <div className="field">
            <label htmlFor="sl-feeding">Alimentação</label>
            <select name="feeding" id="sl-feeding">
              <option value="Omnivorous">Onívoro</option>
              <option value="Carnivorous">Carnívoro</option>
              <option value="Herbivorous">Herbívoro</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="txt-desc">Descrição</label>
            <input type="text" name="desc" id="txt-desc" />
          </div>

          {/* <div className="field">
            <label>Imagens</label>
            {images.map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <input
                  type="url"
                  name={`image-${i}`}
                  id={`txt-img-${i}`}
                  placeholder="URL da imagem"
                />
                <button
                  type="button"
                  onClick={() => {
                    const newImages = images.slice();
                    newImages.splice(i, 1); // Remove a imagem da lista
                    setImages(newImages);
                  }}
                  className="text-red-500 transition-colors hover:text-red-700"
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setImages([...images, ""])}
              className="mt-2 flex items-center gap-1 text-blue-dark transition-colors hover:text-sky-800"
            >
              <PlusIcon className="size-4" />
              Adicionar Imagem
            </button>
          </div> */}
          <div className="mt-2 flex flex-row justify-end gap-4">
            <button className="action" type="submit">
              Cadastrar
            </button>
            <button className="alternate" type="reset">
              Limpar
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
}

function FormField({ name, label, placeholder, type = "text" }) {
  const id = useId();

  return (
    <label className="form-control w-full" htmlFor={id}>
      <div className="label pb-1">
        <span className="label-text text-stone-600">{label}</span>
      </div>
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        className="input input-sm input-bordered w-full max-w-xs bg-slate-100"
        id={id}
      />
    </label>
  );
}
