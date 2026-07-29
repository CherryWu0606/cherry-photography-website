"use client";

import { siteConfig } from "@/content/site";
import { useEffect, useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > 8);
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => window.removeEventListener("scroll", updateScrolled);
  }, []);

  return (
    <header className={`topbar ${scrolled ? "is-scrolled" : ""}`}>
      <div className="brand">
        <span className="brand-main">{siteConfig.brand.name}</span>
        <span className="brand-sub">{siteConfig.brand.tagline}</span>
      </div>

      <button
        type="button"
        className="menu-toggle"
        aria-expanded={open}
        aria-controls="site-nav"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className="menu-toggle__bar" />
        <span className="menu-toggle__bar" />
        <span className="menu-toggle__label">{open ? "關閉" : "選單"}</span>
      </button>

      <nav id="site-nav" className={`nav ${open ? "is-open" : ""}`}>
        {siteConfig.nav.map((item) => (
          <a href={item.href} key={item.label} onClick={() => setOpen(false)}>
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
