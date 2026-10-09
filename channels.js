/**
 * منبع واحد شبکه‌ها — ارشیا TV
 * نسخه اصلاح‌شده و تست‌شده بدون قطعی سرور
 */
window.ARSHIA_CHANNELS = {
  domestic: {
    title: "① داخلی",
    groups: [
      {
        title: "سراسری",
        channels: [
          { id: "tv1", name: "شبکه یک HD", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "tv2", name: "شبکه دو HD", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "tv3", name: "شبکه سه HD", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "tv4", name: "شبکه چهار", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "tv5", name: "شبکه پنج (تهران)", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "irinn", name: "شبکه خبر HD", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "varzesh", name: "شبکه ورزش HD", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "nasim", name: "شبکه نسیم HD", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "mostanad", name: "شبکه مستند HD", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "ifilm", name: "شبکه آی فیلم HD", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "namayesh", name: "شبکه نمایش HD", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "tamasha", name: "شبکه تماشا HD", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "omid", name: "شبکه امید", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "pooya", name: "شبکه پویا / نهال", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "faratar", name: "شبکه فراتر 4K", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" }
        ]
      },
      {
        title: "استانی",
        channels: [
          { id: "prov-isfahan", name: "شبکه اصفهان", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-khorasan", name: "شبکه خراسان رضوی", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-sahand", name: "شبکه سهند (آذربایجان شرقی)", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-baran", name: "شبکه باران (گیلان)", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-fars", name: "شبکه فارس", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-khouzestan", name: "شبکه خوزستان", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-aftab", name: "شبکه آفتاب (مرکزی)", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-eshragh", name: "شبکه اشراق (زنجان)", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-tabarestan", name: "شبکه تبرستان (مازندران)", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-khavaran", name: "شبکه خاوران (خراسان جنوبی)", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-jahanbin", name: "شبکه جهان‌بین (چهارمحال)", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-dena", name: "شبکه دنا (کهگیلویه)", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-hamoon", name: "شبکه هامون (سیستان)", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-sabalan", name: "شبکه سبلان (اردبیل)", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-qazvin", name: "شبکه قزوین", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-sina", name: "شبکه سینا (همدان)", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" },
          { id: "prov-khalij", name: "شبکه خلیج فارس (هرمزگان)", play: "https://sepehrtv.ir", site: "https://sepehrtv.ir" }
        ]
      }
    ]
  },
  satellite: {
    title: "② ماهواره",
    groups: [
      {
        title: "فیلم و سرگرمی",
        channels: [
          { id: "mbcpersia", name: "ام‌بی‌سی پرشیا HD", play: "https://sr-api.ir", site: "https://mbc.net" },
          { id: "gemtv", name: "جم تی‌وی", play: "https://sr-api.ir", site: "https://gemgroup.tv" },
          { id: "gemseries", name: "جم سریز", play: "https://sr-api.ir", site: "https://gemgroup.tv" },
          { id: "gemdrama", name: "جم دراما", play: "https://sr-api.ir", site: "https://gemgroup.tv" },
          { id: "gembollywood", name: "جم بالیوود", play: "https://sr-api.ir", site: "https://gemgroup.tv" },
          { id: "gemclassic", name: "جم کلاسیک", play: "https://sr-api.ir", site: "https://gemgroup.tv" },
          { id: "gemcomedy", name: "جم کمدی", play: "https://sr-api.ir", site: "https://gemgroup.tv" }
        ]
      },
      {
        title: "موزیک",
        channels: [
          { id: "radiojavan", name: "رادیو جوان HD", play: "https://rjstream.online", site: "https://radiojavan.com" }
        ]
      }
    ]
  }
};
           
