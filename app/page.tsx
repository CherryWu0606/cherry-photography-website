import Header from "./components/Header";
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
        <div className="hero-copy">
          <p className="script hero-script">{siteConfig.hero.script}</p>
          <h1>{siteConfig.hero.title}</h1>
          <p className="hero-text">{siteConfig.hero.description}</p>
          <div className="hero-actions">
            <a className="button button-solid" href="#portfolio">
              {siteConfig.hero.cta}
              <span aria-hidden="true"> →</span>
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-image-frame">
            <TintedImage
              src={siteConfig.hero.image}
              alt="Cherry WoO Photography 主視覺"
              fill
              priority
              sizes="(max-width: 1100px) 100vw, 58vw"
              frameClassName="hero-tint"
              imageClassName="hero-image"
            />
          </div>
        </div>
      </section>

      <section className="section cards" id="portfolio">
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

      <section className="footer-section" id="services">
        <div className="footer-intro">
          <p className="script">{siteConfig.footer.script}</p>
          <p>{siteConfig.footer.text}</p>
        </div>
        <SocialFooter />
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
