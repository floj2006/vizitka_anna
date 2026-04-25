import { useEffect, useRef, useState } from "react";

const navLinks = [
  { href: "#formats", label: "Форматы" },
  { href: "#gallery", label: "Галерея" },
  { href: "#contacts", label: "Контакты" },
];

const heroTags = [
  "Без пошлых конкурсов",
  "Гостям понятно, что происходит",
  "Тайминг под контролем",
  "Программа без суеты",
];

const formats = [
  {
    title: "Свадьба",
    text: "Помогаю сделать вечер живым: с красивыми словами, лёгким юмором и моментами, где никто не чувствует себя неловко.",
  },
  {
    title: "Юбилей",
    text: "Держу баланс между торжественностью и теплом, чтобы имениннику было приятно, а гостям было легко включаться.",
  },
  {
    title: "Семейный вечер",
    text: "Подходит для встреч, где важны близкие люди, спокойный ритм, хорошие тосты и настоящие эмоции без показухи.",
  },
  {
    title: "Частное событие",
    text: "Если нужен ведущий, который не перетягивает внимание на себя, но уверенно ведёт программу и чувствует зал.",
  },
];

const trustPoints = [
  {
    title: "Сначала разбираемся в людях",
    text: "Кто будет на празднике, какой у гостей возраст, что точно не хочется видеть и какие моменты для вас самые важные.",
  },
  {
    title: "Потом собираем понятный сценарий",
    text: "Без перегруза конкурсами. С паузами, тостами, интерактивами и переходами, которые не выбивают гостей из вечера.",
  },
  {
    title: "На празднике я держу ритм",
    text: "Слежу за таймингом, мягко направляю гостей и помогаю главным героям вечера не думать о том, что должно быть дальше.",
  },
];

const reviewNotes = [
  "Вечер прошёл легко, без пауз и неловкости.",
  "Гости участвовали сами, потому что им было комфортно.",
  "Мы смогли отдыхать, а не контролировать программу.",
];

const gallerySlides = [
  {
    src: "/assets/images/anna-portrait.jpg",
    alt: "Анна, ведущая событий",
    caption: "Портрет",
    position: "center 18%",
  },
  {
    src: "/assets/images/anna-stage.jpg",
    alt: "Анна работает на празднике",
    caption: "Работа с залом",
    position: "center 18%",
  },
  {
    src: "/assets/images/anna-bride.jpg",
    alt: "Анна с невестой",
    caption: "Рядом с парой",
    position: "center 18%",
  },
  {
    src: "/assets/images/anna-crowd.jpg",
    alt: "Анна среди гостей",
    caption: "Гости в моменте",
    position: "center 22%",
  },
  {
    src: "/assets/images/anna-gallery-pink.jpg",
    alt: "Анна с молодоженами на яркой свадебной фотозоне",
    caption: "Яркий вечер",
    position: "center 18%",
  },
  {
    src: "/assets/images/anna-gallery-team.jpg",
    alt: "Анна с молодоженами и командой на оформленной площадке",
    caption: "После праздника",
    position: "center 16%",
  },
  {
    src: "/assets/images/anna-gallery-blue.jpg",
    alt: "Анна ведет свадебный вечер в синем костюме",
    caption: "Живой момент",
    position: "center 18%",
  },
  {
    src: "/assets/images/anna-gallery-bw.jpg",
    alt: "Анна с молодоженами на черно-белом снимке",
    caption: "Настоящие эмоции",
    position: "center 20%",
  },
];

const contactConfig = {
  phone: {
    value: "+7 951 473-66-37",
    href: "tel:+79514736637",
  },
  email: {
    value: "berdnikanja@yandex.ru",
    href: "mailto:berdnikanja@yandex.ru",
  },
};

const contactActions = [
  {
    key: "phone",
    label: "Позвонить",
    note: "быстрее всего, если дата уже близко",
    variant: "primary",
    ...contactConfig.phone,
  },
  {
    key: "email",
    label: "Написать на email",
    note: "если хотите спокойно описать детали",
    variant: "secondary",
    ...contactConfig.email,
  },
  {
    key: "form",
    label: "Заявка",
    value: "оставить заявку",
    href: "#request-form",
    note: "коротко о дате и формате",
    variant: "ghost",
  },
];

const directContacts = [
  {
    key: "phone",
    label: "Телефон",
    ...contactConfig.phone,
  },
  {
    key: "email",
    label: "Email",
    ...contactConfig.email,
  },
];

const requestFormInitialState = {
  name: "",
  phone: "",
  eventType: "Свадьба",
  eventDate: "",
  message: "",
};

const eventOptions = [
  "Свадьба",
  "Юбилей",
  "Семейный вечер",
  "Частное событие",
  "Другое",
];

const introBursts = [
  {
    x: "14%",
    y: "22%",
    size: "8.5rem",
    delay: "0.08s",
    color: "rgba(255, 214, 168, 0.96)",
  },
  {
    x: "84%",
    y: "20%",
    size: "9rem",
    delay: "0.22s",
    color: "rgba(255, 196, 138, 0.96)",
  },
  {
    x: "28%",
    y: "58%",
    size: "7.2rem",
    delay: "0.38s",
    color: "rgba(255, 234, 196, 0.92)",
  },
  {
    x: "74%",
    y: "60%",
    size: "8rem",
    delay: "0.52s",
    color: "rgba(255, 222, 186, 0.94)",
  },
  {
    x: "52%",
    y: "34%",
    size: "10rem",
    delay: "0.68s",
    color: "rgba(255, 208, 160, 0.98)",
  },
];

const revealStyle = (delay) => ({
  "--delay": `${delay}ms`,
});

function ContactAction({ action, className = "" }) {
  const classes = [
    "contact-action",
    `contact-action-${action.variant}`,
    action.disabled ? "is-disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{action.label}</span>
      <strong>{action.value}</strong>
      <small>{action.note}</small>
    </>
  );

  if (action.disabled) {
    return (
      <div aria-disabled="true" className={classes}>
        {content}
      </div>
    );
  }

  return (
    <a className={classes} href={action.href}>
      {content}
    </a>
  );
}

function App() {
  const headerRef = useRef(null);
  const [introDone, setIntroDone] = useState(false);
  const [requestForm, setRequestForm] = useState(requestFormInitialState);
  const [formStatus, setFormStatus] = useState("idle");
  const [formMessage, setFormMessage] = useState("");

  const handleRequestChange = ({ target }) => {
    const { name, value } = target;

    if (formStatus !== "idle") {
      setFormStatus("idle");
      setFormMessage("");
    }

    setRequestForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleRequestSubmit = async (event) => {
    event.preventDefault();

    setFormStatus("submitting");
    setFormMessage("");

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestForm),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Не удалось отправить заявку");
      }

      setRequestForm(requestFormInitialState);
      setFormStatus("success");
      setFormMessage("Заявка отправлена. Я свяжусь с вами по указанному телефону.");
    } catch (error) {
      setFormStatus("error");
      setFormMessage(
        error.message ||
          "Не получилось отправить заявку. Попробуйте ещё раз или позвоните."
      );
    }
  };

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reduceMotion.matches) {
      setIntroDone(true);
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      setIntroDone(true);
      document.body.style.overflow = previousOverflow;
    }, 2300);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const header = headerRef.current;
    const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
    const parallaxItems = Array.from(
      document.querySelectorAll("[data-parallax]")
    );
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const setHeaderState = () => {
      if (!header) {
        return;
      }

      header.classList.toggle("is-scrolled", window.scrollY > 24);
    };

    let revealObserver;

    if ("IntersectionObserver" in window) {
      revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          });
        },
        {
          threshold: 0.18,
          rootMargin: "0px 0px -8% 0px",
        }
      );

      revealItems.forEach((item) => revealObserver.observe(item));
    } else {
      revealItems.forEach((item) => item.classList.add("is-visible"));
    }

    let ticking = false;

    const updateParallax = () => {
      parallaxItems.forEach((item) => {
        if (reduceMotion.matches || window.innerWidth < 760) {
          item.style.setProperty("--parallax-y", "0px");
          return;
        }

        const speed = Number.parseFloat(item.dataset.parallax || "0.04");
        const rect = item.getBoundingClientRect();
        const elementMid = rect.top + rect.height / 2;
        const viewportMid = window.innerHeight / 2;
        const shift = (viewportMid - elementMid) * speed;

        item.style.setProperty("--parallax-y", `${shift.toFixed(1)}px`);
      });

      ticking = false;
    };

    const requestParallaxUpdate = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateParallax);
    };

    const handleScroll = () => {
      setHeaderState();
      requestParallaxUpdate();
    };

    setHeaderState();
    requestParallaxUpdate();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", requestParallaxUpdate);

    if (typeof reduceMotion.addEventListener === "function") {
      reduceMotion.addEventListener("change", requestParallaxUpdate);
    } else if (typeof reduceMotion.addListener === "function") {
      reduceMotion.addListener(requestParallaxUpdate);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", requestParallaxUpdate);

      if (revealObserver) {
        revealObserver.disconnect();
      }

      if (typeof reduceMotion.removeEventListener === "function") {
        reduceMotion.removeEventListener("change", requestParallaxUpdate);
      } else if (typeof reduceMotion.removeListener === "function") {
        reduceMotion.removeListener(requestParallaxUpdate);
      }
    };
  }, []);

  return (
    <>
      <div
        className={`intro-splash${introDone ? " is-hidden" : ""}`}
        aria-hidden="true"
      >
        <div className="intro-shimmer"></div>
        <div className="intro-center-glow"></div>

        <div className="intro-brand">
          <strong>Анна Гатауллина</strong>
          <span>ведущая красивых событий</span>
        </div>

        {introBursts.map((burst, index) => (
          <div
            className="intro-burst"
            key={`${burst.x}-${burst.y}-${index}`}
            style={{
              "--x": burst.x,
              "--y": burst.y,
              "--size": burst.size,
              "--delay": burst.delay,
              "--burst-color": burst.color,
            }}
          >
            {Array.from({ length: 8 }).map((_, sparkIndex) => (
              <span
                key={sparkIndex}
                style={{ "--angle": `${sparkIndex * 45}deg` }}
              />
            ))}
          </div>
        ))}
      </div>

      <header className="site-header" ref={headerRef}>
        <div className="header-inner">
          <a
            className="brand"
            href="#hero"
            aria-label="Анна Гатауллина — ведущая событий"
          >
            <span className="brand-mark">Анна Гатауллина</span>
            <span className="brand-role">ведущая событий</span>
          </a>

          <nav className="site-nav" aria-label="Навигация по странице">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="page">
        <section className="hero" id="hero">
          <div className="section-shell section-shell-wide hero-layout">
            <div className="hero-copy">
              <p
                className="section-kicker hero-kicker"
                data-reveal
                style={revealStyle(0)}
              >
                Ведущая свадеб, юбилеев и семейных вечеров
              </p>
              <h1 data-reveal style={revealStyle(80)}>
                Анна Гатауллина
              </h1>

              <p className="hero-text" data-reveal style={revealStyle(140)}>
                Помогу провести праздник спокойно: с понятной программой,
                живыми разговорами, лёгким юмором и без моментов, за которые
                потом неудобно.
              </p>

              <div className="hero-actions" data-reveal style={revealStyle(160)}>
                {contactActions.map((action) => (
                  <ContactAction action={action} key={action.key} />
                ))}
              </div>

              <p className="hero-helper" data-reveal style={revealStyle(220)}>
                Для первого сообщения достаточно даты, города, формата события
                и примерного числа гостей.
              </p>

              <ul className="hero-tags" data-reveal style={revealStyle(360)}>
                {heroTags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="overview" id="formats">
          <div className="section-shell overview-grid">
            <div className="formats-panel">
              <div className="section-intro">
                <p
                  className="section-kicker"
                  data-reveal
                  style={revealStyle(0)}
                >
                  Форматы
                </p>
                <h2 data-reveal style={revealStyle(80)}>
                  Не веду два одинаковых вечера. Сначала понимаю гостей, потом
                  собираю программу.
                </h2>
              </div>

              <div className="formats-grid">
                {formats.map((item, index) => (
                  <article
                    className="format-item"
                    data-reveal
                    key={item.title}
                    style={revealStyle(140 + index * 70)}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="benefits-panel">
              <p
                className="section-kicker"
                data-reveal
                style={revealStyle(120)}
              >
                Подготовка
              </p>

              <div className="benefits-list">
                {trustPoints.map((item, index) => (
                  <article
                    className="benefit-item"
                    data-reveal
                    key={item.title}
                    style={revealStyle(180 + index * 70)}
                  >
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                ))}
              </div>
            </aside>

            <div className="reviews-panel">
              <p
                className="section-kicker"
                data-reveal
                style={revealStyle(120)}
              >
                Что обычно отмечают после праздника
              </p>

              <div className="reviews-grid">
                {reviewNotes.map((note, index) => (
                  <article
                    className="review-card"
                    data-reveal
                    key={note}
                    style={revealStyle(180 + index * 70)}
                  >
                    <p>«{note}»</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="gallery" id="gallery">
          <div className="section-shell gallery-header">
            <div>
              <p className="section-kicker" data-reveal style={revealStyle(0)}>
                Галерея
              </p>
              <h2 data-reveal style={revealStyle(80)}>
                Несколько кадров с вечеров.
              </h2>
            </div>

            <p className="gallery-text" data-reveal style={revealStyle(140)}>
              Оставила только живые моменты: работа с залом, рядом с парой,
              улыбки гостей и немного закулисья.
            </p>
          </div>

          <div className="section-shell gallery-showcase">
            <div className="gallery-grid" data-reveal style={revealStyle(180)}>
              {gallerySlides.map((slide, index) => (
                <figure
                  className="gallery-card"
                  key={slide.src}
                  style={{ "--tile-delay": `${index * 45}ms` }}
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    style={{ objectPosition: slide.position }}
                  />
                  <figcaption>{slide.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="cta" id="contacts">
          <div className="section-shell">
            <div className="cta-layout" data-reveal style={revealStyle(80)}>
              <div className="cta-copy">
                <p className="section-kicker">Контакты</p>
                <h2>Напишите дату, город и формат события.</h2>
                <p>
                  Я отвечу, свободна ли дата, и подскажу, с чего начать
                  подготовку. Можно написать коротко, без идеального технического
                  задания.
                </p>

                <ul className="cta-points">
                  <li>Дата или месяц праздника</li>
                  <li>Город и площадка, если они уже выбраны</li>
                  <li>Формат события и примерное число гостей</li>
                </ul>
              </div>

              <div className="contact-links">
                <div className="contact-shortcuts">
                  {directContacts.map((contact) => (
                    <a
                      className="contact-shortcut"
                      href={contact.href}
                      key={contact.key}
                    >
                      <span>{contact.label}</span>
                      <strong>{contact.value}</strong>
                    </a>
                  ))}
                </div>

                <form
                  className="request-form"
                  id="request-form"
                  onSubmit={handleRequestSubmit}
                >
                  <label className="form-field">
                    <span>Как к вам обращаться</span>
                    <input
                      name="name"
                      onChange={handleRequestChange}
                      placeholder="Ваше имя"
                      required
                      type="text"
                      value={requestForm.name}
                    />
                  </label>

                  <label className="form-field">
                    <span>Телефон</span>
                    <input
                      name="phone"
                      onChange={handleRequestChange}
                      placeholder="+7"
                      required
                      type="tel"
                      value={requestForm.phone}
                    />
                  </label>

                  <div className="form-row">
                    <label className="form-field">
                      <span>Формат</span>
                      <select
                        name="eventType"
                        onChange={handleRequestChange}
                        value={requestForm.eventType}
                      >
                        {eventOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label className="form-field">
                      <span>Дата</span>
                      <input
                        name="eventDate"
                        onChange={handleRequestChange}
                        type="date"
                        value={requestForm.eventDate}
                      />
                    </label>
                  </div>

                  <label className="form-field">
                    <span>Коротко о событии</span>
                    <textarea
                      name="message"
                      onChange={handleRequestChange}
                      placeholder="Город, площадка, примерное число гостей или любые детали, которые уже есть"
                      rows="4"
                      value={requestForm.message}
                    />
                  </label>

                  <button
                    className="button button-primary request-form-button"
                    disabled={formStatus === "submitting"}
                    type="submit"
                  >
                    {formStatus === "submitting"
                      ? "Отправляю заявку..."
                      : "Отправить заявку"}
                  </button>

                  <p
                    className={`request-form-note request-form-note-${formStatus}`}
                    aria-live="polite"
                  >
                    {formMessage ||
                      "После отправки я свяжусь с вами и уточню детали. Если удобнее, можно просто позвонить."}
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Анна Гатауллина • ведущая свадеб и теплых событий</p>
        <a href="#hero">Наверх</a>
      </footer>
    </>
  );
}

export default App;
