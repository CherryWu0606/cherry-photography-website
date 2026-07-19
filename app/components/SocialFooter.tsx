"use client";

import { socialGroups } from "@/content/site";
import { QRCodeSVG } from "qrcode.react";

export default function SocialFooter() {
  if (socialGroups.length === 0) {
    return (
      <div className="footer-socials footer-socials--pending" id="social">
        <p>社群連結與拍攝諮詢方式準備中，敬請期待。</p>
      </div>
    );
  }

  return (
    <div className="footer-socials" id="social">
      {socialGroups.map((group) => (
        <section className="social-group" key={group.platform}>
          <h3 className="social-group__title">{group.platform}</h3>
          <div className="social-group__items">
            {group.links.map((link) => (
              <a
                className="social-card"
                href={link.href}
                key={link.href}
                target="_blank"
                rel="noreferrer"
              >
                <span className="social-card__label">{link.label}</span>
                <div className="social-card__qr" aria-hidden="true">
                  <QRCodeSVG
                    value={link.href}
                    size={120}
                    bgColor="#f6f4ef"
                    fgColor="#4a463f"
                    level="M"
                  />
                </div>
              </a>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
