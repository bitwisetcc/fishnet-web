export default function Footer() {
  return (
    <div>
      <section className="section-footer bg-slate-50">
        <div className="wave wave1">
          <img className="" />
        </div>
        <div className="wave wave2">
          <img className="" />
        </div>
        <div className="wave wave3">
          <img className="" />
        </div>
        <div className="wave wave4">
          <img className="" />
        </div>
      </section>

      <section className="bg-accent p-5 text-white md:p-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="flex items-center justify-center">
            <img
              src="/static/logo/white.png"
              alt="Logo FishNet"
              className="size-56 bg-transparent brightness-[96.5%]"
            />
          </div>
          <div className="flex items-center justify-center">
            <ul className="text-center">
              <li className="font-semibold">Nossos Contatos</li>
              <li>FishNet@gmail.com</li>
              <li>+55 11 96954-4326</li>
            </ul>
          </div>
          <div className="flex items-center justify-center">
            <ul className="text-center">
              <li className="transform transition duration-300 hover:scale-105 hover:text-golden-fish">
                <a href="/admin">
                  Entre como Funcionário Aqui
                </a>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
        <div className="flex justify-center space-x-5 pb-2 pt-4">
          <a href="//www.instagram.com">
            <img
              src="/static/icons/instagram.png"
              alt="Instagram Icon"
              className="size-10 bg-transparent brightness-[96.5%]"
            />
          </a>
          <a href="//www.whatsapp.com">
            <img
              src="/static/icons/whatsapp.png"
              alt="Whatsapp Icon"
              className="size-10 bg-transparent brightness-[96.5%]"
            />
          </a>
          <a href="//www.facebook.com">
            <img
              src="/static/icons/facebook.png"
              alt="Facebook Icon"
              className="size-10 bg-transparent brightness-[96.5%]"
            />
          </a>
          <a href="//youtube.com">
            <img
              src="/static/icons/youtube.png"
              alt="Youtube Icon"
              className="size-10 bg-transparent brightness-[96.5%]"
            />
          </a>
        </div>
        <div className="flex pb-8 pt-6">
          <hr className="flex w-full border-golden-fish" />
        </div>
      </section>
    </div>
  );
}
