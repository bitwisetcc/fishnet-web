import { API_URL } from "@/app/lib/query";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import FormField from "../../components/form/InputField";
import SelectField from "../../components/form/SelectField";

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
      <div className="modal-box w-2/3 max-w-3xl bg-base-100">
        <form method="dialog">
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
            <XMarkIcon className="size-5 text-base-content" />
          </button>
        </form>

        <form
          className="grid grid-cols-2 gap-2 overflow-y-scroll px-2 text-stone-900"
          onSubmit={submit}
        >
          <h2 className="col-span-2 text-lg font-semibold">
            Informações Gerais
          </h2>

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
            unit="R$"
          />

          <FormField name="origin" label="Origem" placeholder="Guiana" />

          <FormField
            name="ph"
            label="pH ideal"
            placeholder="6.5"
            type="number"
            unit="pH"
          />

          <FormField
            name="tankSize"
            label="Tamanho mínimo do tanque"
            placeholder="8"
            type="number"
            unit="L"
          />

          <FormField
            name="temperature"
            label="Temperatura ideal"
            placeholder="17.5"
            type="number"
            unit="ºC"
          />

          <FormField
            name="lifeSpan"
            label="Expectativa de vida"
            placeholder="18"
            type="number"
            unit="meses"
          />

          <FormField
            name="size"
            label="Tamanho adulto"
            placeholder="4.5"
            type="number"
            unit="cm"
          />

          <SelectField
            name="feeding"
            label="Alimentação"
            options={{
              herbivorous: "Herbívoro",
              carnivorous: "Carnívoro",
              omnivorous: "Onívoro",
            }}
          />

          <hr className="col-span-2 my-3" />

          <h2 className="col-span-2 text-lg font-semibold">Descrição</h2>

          <textarea
            name="description"
            id="txt-description"
            rows={3}
            className="textarea textarea-bordered col-span-2"
          ></textarea>

          <hr className="col-span-2 my-3" />

          <h2 className="col-span-2 text-lg font-semibold">Imagens</h2>

          <section className="col-span-2 space-y-2">
            <input
              type="file"
              className="file-input file-input-bordered file-input-sm w-full"
            />
            <input
              type="file"
              className="file-input file-input-bordered file-input-sm w-full"
            />
            <input
              type="file"
              className="file-input file-input-bordered file-input-sm w-full"
            />
            <input
              type="file"
              className="file-input file-input-bordered file-input-sm w-full"
            />
          </section>

          <hr className="col-span-2 my-3" />

          <button className="btn btn-primary" type="submit">
            Cadastrar
          </button>
          <button className="btn btn-outline btn-error" type="reset">
            Limpar
          </button>
        </form>
      </div>
    </dialog>
  );
}
