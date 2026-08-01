import Header from "./components/Header";
import HeroCarousel from "./components/HeroCarousel";
import MarqueeGallery from "./components/MarqueeGallery";
import SocialFooter from "./components/SocialFooter";
import TintedImage from "./components/TintedImage";
import { siteConfig } from "@/content/site";

export default function Home() {
  const galleryImages = siteConfig.featured.map((src) => ({
    fileName: src.split("/").at(-1) ?? "精選作品",
    src
  }));

  return (
    <main className="site">
      <Header />

      <section className="hero" id="home">
        <div className="hero-visual">
          <div className="hero-image-frame">
            <HeroCarousel slides={siteConfig.hero.slides} />
          </div>
        </div>

        <div className="hero-copy">
          <h1>{siteConfig.hero.title}</h1>
          <p className="hero-title-en">{siteConfig.hero.titleEn}</p>
        </div>
      </section>

      <section className="section" id="portfolio">
        <div className="section-head">
          <div>
            <p className="eyebrow">攝影作品</p>
            <h2>Photography Works</h2>
          </div>
        </div>

        <div className="cards">
          {siteConfig.categories.map((category) => (
            <article className={`category-card category-card--${category.slug}`} key={category.title}>
              <div className="category-image">
                <TintedImage
                  src={category.image}
                  alt={category.title}
                  fill
                  sizes="(max-width: 1100px) 50vw, 25vw"
                  imageClassName="category-photo"
                />
                <span className="category-image__label">{category.title}</span>
              </div>
              <div className="category-copy">
                <h2>{category.title}</h2>
                <p className="category-subtitle">{category.subtitle}</p>
                <p className="category-description">{category.description}</p>
                <a className="category-link" href="#portfolio">
                  View more →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section featured">
        <div className="section-head">
          <div>
            <p className="eyebrow">精選作品</p>
            <h2>Featured Works</h2>
          </div>
          <a className="section-link" href="#portfolio">
            觀看更多作品 →
          </a>
        </div>

        <MarqueeGallery images={galleryImages} />

        <p className="featured-hint">滑鼠移入可暫停輪播；手機可點一下暫停或繼續播放。</p>
      </section>

      <section className="about section" id="about">
        <div className="about-photo about-photo-left">
          <TintedImage
            src={siteConfig.about.mainImage}
            alt="攝影師 Jim"
            fill
            sizes="(max-width: 760px) 100vw, 33vw"
            imageClassName="cover-image"
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">{siteConfig.about.eyebrow}</p>
          <h2>{siteConfig.about.title}</h2>
          {siteConfig.about.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <a className="button button-outline" href="#contact">
            {siteConfig.about.cta}
          </a>
        </div>
        <aside className="about-note">
          <p className="eyebrow">{siteConfig.about.detailTitle}</p>
          <p>{siteConfig.about.detailText}</p>
        </aside>
      </section>

      <section className="section" id="services">
        <div className="section-head">
          <div>
            <p className="eyebrow">服務項目</p>
            <h2>Services</h2>
          </div>
        </div>

        <div className="footer-section">
          <div className="footer-intro">
            <p className="script">{siteConfig.footer.script}</p>
            <p>{siteConfig.footer.text}</p>
          </div>
          <SocialFooter />
        </div>
      </section>

      <section className="section contact" id="contact">
        <div className="contact-card">
          <p className="eyebrow">{siteConfig.contact.eyebrow}</p>
          <h2>{siteConfig.contact.title}</h2>
          <p>{siteConfig.contact.description}</p>
        </div>
      </section>

      <footer className="site-footer">
        <p>{siteConfig.footer.copyright}</p>
        <a className="back-to-top" href="#home" aria-label="回到頂部">
          ↑
        </a>
      </footer>
    </main>
  );
}
