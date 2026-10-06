"use client";

import { FormEvent, useState } from "react";
import styles from "./page.module.css";

const services = [
  {
    title: "AI Chatbot",
    description:
      "Müşterilerinizin sorularını hızlı ve doğal şekilde yanıtlayan yapay zekâ destekli asistanlar.",
  },
  {
    title: "RAG & Bilgi Asistanı",
    description:
      "Şirket dokümanlarınızı ve kurum içi bilgilerinizi yapay zekâ ile erişilebilir hale getirin.",
  },
  {
    title: "AI Otomasyonu",
    description:
      "Tekrarlayan iş süreçlerini yapay zekâ ile otomatikleştirerek zaman kazanın.",
  },
  {
    title: "Veri & AI Çözümleri",
    description:
      "Verilerinizden anlamlı içgörüler ve tahmin modelleri oluşturan çözümler geliştirin.",
  },
];

const serviceOptions = [
  "AI Chatbot",
  "RAG & Bilgi Asistanı",
  "AI Otomasyonu",
  "Veri & AI Çözümleri",
];

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setMessage("");
    setMessageType("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const service = String(formData.get("service") || "").trim();
    const description = String(formData.get("description") || "").trim();

    // Client-side validation
    if (!name || !email || !service || !description) {
      setMessage("Lütfen tüm alanları doldurun.");
      setMessageType("error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setMessage("Lütfen geçerli bir e-posta adresi girin.");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          service,
          description,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Talep gönderilemedi.");
      }

      setMessage(
        "Talebiniz başarıyla alındı. Sizinle en kısa sürede iletişime geçeceğiz.",
      );
      setMessageType("success");

      form.reset();
    } catch (error) {
      console.error("Form submission error:", error);

      setMessage(
        error instanceof Error
          ? error.message
          : "Talep gönderilirken bir hata oluştu.",
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main>
      <header className={styles.header}>
        <div className={styles.container}>
          <a href="#" className={styles.logo}>
            Prompt<span>Lab</span>
          </a>

          <nav className={styles.nav}>
            <a href="#services">Hizmetler</a>
            <a href="#process">Nasıl Çalışır?</a>
            <a href="#contact">İletişim</a>
          </nav>

          <a href="#contact" className={styles.headerButton}>
            Projenizi Anlatın
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <div className={styles.badge}>
              ✦ AI destekli teknoloji çözümleri
            </div>

            <h1>
              Yapay zekâyı
              <br />
              <span>işinize uyarlayın.</span>
            </h1>

            <p>
              Chatbotlardan kurumsal bilgi asistanlarına kadar, işletmeniz için
              uygulanabilir AI çözümleri geliştiriyoruz.
            </p>

            <div className={styles.heroActions}>
              <a href="#contact" className={styles.primaryButton}>
                Projenizi Anlatın →
              </a>

              <a href="#services" className={styles.secondaryButton}>
                Çözümleri İnceleyin
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.glow}></div>

            <div className={styles.aiCard}>
              <div className={styles.aiCardTop}>
                <span className={styles.statusDot}></span>
                PromptLab AI
              </div>

              <div className={styles.aiOrb}>
                <span>✦</span>
              </div>

              <p>İşiniz için doğru AI çözümünü birlikte tasarlayalım.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className={styles.services}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span>ÇÖZÜMLER</span>

            <h2>İhtiyacınıza uygun AI çözümleri.</h2>

            <p>
              İş süreçlerinizi daha hızlı, akıllı ve verimli hale getirmek için
              farklı kullanım alanlarına yönelik çözümler.
            </p>
          </div>

          <div className={styles.serviceGrid}>
            {services.map((service, index) => (
              <article key={service.title} className={styles.serviceCard}>
                <div className={styles.serviceNumber}>0{index + 1}</div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <span className={styles.arrow}>↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className={styles.process}>
        <div className={styles.container}>
          <div className={styles.sectionHeading}>
            <span>SÜREÇ</span>
            <h2>Fikirden çalışan çözüme.</h2>
          </div>

          <div className={styles.processGrid}>
            <div>
              <strong>01</strong>

              <h3>İhtiyacı anlayalım</h3>

              <p>
                İş sürecinizi, hedefinizi ve karşılaştığınız problemi birlikte
                netleştiriyoruz.
              </p>
            </div>

            <div>
              <strong>02</strong>

              <h3>Çözümü tasarlayalım</h3>

              <p>
                İhtiyaca uygun AI yaklaşımını belirleyip uygulanabilir bir çözüm
                planı oluşturuyoruz.
              </p>
            </div>

            <div>
              <strong>03</strong>

              <h3>Hayata geçirelim</h3>

              <p>
                Çözümü geliştiriyor, test ediyor ve kullanıma hazır hale
                getiriyoruz.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT / REQUEST FORM */}
      <section id="contact" className={styles.contact}>
        <div className={styles.container}>
          <div className={styles.contactIntro}>
            <span className={styles.contactLabel}>PROJENİZİ ANLATIN</span>

            <h2>Bir fikriniz mi var?</h2>

            <p>
              İhtiyacınızı kısaca anlatın. Size uygun AI çözümünü birlikte
              değerlendirelim.
            </p>
          </div>

          <form className={styles.contactForm} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Ad Soyad</label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Adınız ve soyadınız"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">E-posta</label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="ornek@email.com"
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="service">Hizmet</label>

              <select id="service" name="service" defaultValue="" required>
                <option value="" disabled>
                  Bir hizmet seçin
                </option>

                {serviceOptions.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Projenizi anlatın</label>

              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="İhtiyacınızı veya projenizi kısaca anlatın..."
                required
              />
            </div>

            <button
              type="submit"
              className={styles.formButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Gönderiliyor..." : "Talebi Gönder →"}
            </button>

            {message && (
              <p
                role="alert"
                style={{
                  margin: "4px 0 0",
                  color: messageType === "success" ? "#8ff0b0" : "#ff9d9d",
                  fontSize: "14px",
                  lineHeight: 1.5,
                }}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* Scroll buffer */}
      <div className={styles.scrollBuffer}></div>

      {/* FOOTER */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <span>© 2026 PromptLab</span>
          <span>AI destekli teknoloji çözümleri.</span>
        </div>
      </footer>
    </main>
  );
}
