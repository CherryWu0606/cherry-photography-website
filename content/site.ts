export const siteConfig = {
  brand: {
    name: "Cherry WoO",
    tagline: "PHOTOGRAPHY"
  },
  hero: {
    script: "Every fleeting moment, made timeless.",
    title: "用細膩視角，收藏每一個不經意的瞬間。",
    description:
      "嗨，我是 Cherry。一名在台南接案的攝影師，十年來以溫暖而真實的影像，記錄人與人之間值得珍藏的故事。",
    image: "/cherry/photos/hero/hero-01.jpg",
    cta: "探索作品集"
  },
  categories: [
    {
      slug: "new-chinese",
      title: "新中式",
      subtitle: "New Chinese Style",
      description: "在傳統與現代之間，找到屬於你的東方韻味。",
      image: "/cherry/photos/categories/image.jpg"
    },
    {
      slug: "wedding",
      title: "婚禮攝影",
      subtitle: "Wedding Stories",
      description: "把一日的歡笑、眼淚與相望，留成多年後仍能感受的幸福。",
      image: "/cherry/photos/categories/image-2.jpg"
    },
    {
      slug: "portrait",
      title: "職人形象照",
      subtitle: "Professional Portraits",
      description: "用貼近你的畫面，讓專業與個性自然地被看見。",
      image: "/cherry/photos/categories/image-3.jpg"
    },
    {
      slug: "event",
      title: "活動攝影",
      subtitle: "Event Photography",
      description: "掌握現場節奏與每一個重要片刻，完整記錄活動的溫度。",
      image: "/cherry/photos/categories/image-4.jpg"
    },
    {
      slug: "family",
      title: "全家福寫真",
      subtitle: "Family Portraits",
      description: "把日常裡最自在的笑容，拍成一家人共同的珍貴回憶。",
      image: "/cherry/photos/categories/image-5.jpg"
    },
    {
      slug: "fashion",
      title: "時尚寫真",
      subtitle: "Editorial Portraits",
      description: "以光線、造型與情緒，呈現只屬於你的鮮明風格。",
      image: "/cherry/photos/categories/image-6.jpg"
    }
  ],
  featured: [
    "/cherry/photos/featured/01.jpg",
    "/cherry/photos/featured/02.jpg",
    "/cherry/photos/featured/03.jpg",
    "/cherry/photos/featured/04.jpg",
    "/cherry/photos/featured/05.jpg",
    "/cherry/photos/featured/06.jpg",
    "/cherry/photos/featured/07.jpg",
    "/cherry/photos/featured/08.jpg",
    "/cherry/photos/featured/09.jpg",
    "/cherry/photos/featured/10.jpg"
  ],
  about: {
    eyebrow: "關於我",
    title: "About Cherry",
    paragraphs: [
      "嗨，我是 Cherry，一名接案攝影師。十年來，我持續以女性獨特而細膩的視角，捕捉人們最自然、最動人的瞬間。",
      "主要服務於台南，也可配合外縣市拍攝。從婚禮的感動、家人的陪伴，到品牌與個人的自信樣貌，我相信每個故事都值得被溫柔而真實地記住。"
    ],
    mainImage: "/cherry/photos/about/about-main.jpg",
    detailTitle: "台南・可外縣市",
    detailText: "每一個重要時刻，都值得被溫柔而真實地記住。",
    cta: "預約拍攝諮詢"
  },
  footer: {
    script: "Keep the moment, tell the story.",
    text: "讓每一段相遇，都成為日後想起時仍會微笑的畫面。",
    copyright: "© 2026 Cherry WoO Photography. All Rights Reserved."
  },
  contact: {
    eyebrow: "聯絡我",
    title: "一起留下值得回看的瞬間",
    description: "歡迎透過 Instagram 私訊拍攝需求，或追蹤我的社群帳號，看見最新的影像故事。"
  },
  nav: [
    { label: "首頁", href: "#home" },
    { label: "作品集", href: "#portfolio" },
    { label: "關於我", href: "#about" },
    { label: "拍攝服務", href: "#services" },
    { label: "聯絡我", href: "#contact" }
  ]
} as const;

export type SocialLink = {
  platform: string;
  label: string;
  href: string;
};

// 個人資料以 website/sns.pages 為準。
export const socialGroups: { platform: string; links: SocialLink[] }[] = [
  {
    platform: "Instagram",
    links: [
      {
        platform: "Instagram",
        label: "@cherrywu0606",
        href: "https://www.instagram.com/cherrywu0606/"
      }
    ]
  },
  {
    platform: "Threads",
    links: [
      {
        platform: "Threads",
        label: "@cherrywu0606",
        href: "https://www.threads.com/@cherrywu0606"
      }
    ]
  },
  {
    platform: "Facebook",
    links: [
      {
        platform: "Facebook",
        label: "Cherry Wu",
        href: "https://www.facebook.com/cherry.wu.96742s"
      }
    ]
  }
];
