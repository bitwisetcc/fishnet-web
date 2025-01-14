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
            <XMarkIcon className="size-5 text-slate-800" />
          </button>
        </form>

        <form
          className="grid grid-cols-2 gap-2 overflow-y-scroll px-2 text-stone-900"
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
