/**
 * ARSHIA TV PRO — Channel Registry v3.2.1 (Production Ready)
 * تمام شبکه‌ها دارای منبع پخش هستند
 */
(function (global) {
  "use strict";

  function TW(slug) {
    return [
      "https://ncdn.telewebion.ir/" + slug + "/live/playlist.m3u8",
      "https://cdn.telewebion.ir/" + slug + "/live/playlist.m3u8",
      "https://cdnw.telewebion.com/" + slug + "/live/playlist.m3u8"
    ];
  }

  var DB = {
    domestic: {
      title: "① داخلی",
      groups: [
        {
          title: "سراسری",
          channels: [
            { id: "tv1", name: "شبکه یک HD", logo: "۱", sources: TW("tv1") },
            { id: "tv2", name: "شبکه دو HD", logo: "۲", sources: TW("tv2") },
            { id: "tv3", name: "شبکه سه HD", logo: "۳", sources: TW("tv3") },
            { id: "tv4", name: "شبکه چهار", logo: "۴", sources: TW("tv4") },
            { id: "tv5", name: "شبکه پنج (تهران)", logo: "۵", sources: TW("tehran") },
            { id: "irinn", name: "شبکه خبر HD", logo: "خبر", sources: TW("irinn") },
            { id: "varzesh", name: "ورزش HD", logo: "⚽", sources: TW("varzesh") },
            { id: "nasim", name: "نسیم HD", logo: "ن", sources: TW("nasim") },
            { id: "mostanad", name: "مستند HD", logo: "م", sources: TW("mostanad") },
            { id: "ifilm", name: "آی‌فیلم HD", logo: "IF", sources: TW("ifilm") },
            { id: "namayesh", name: "نمایش HD", logo: "نمایش", sources: TW("namayesh") },
            { id: "tamasha", name: "تماشا HD", logo: "ت", sources: TW("tamasha") },
            { id: "omid", name: "امید", logo: "امید", sources: TW("omid") },
            { id: "pooya", name: "پویا / نهال", logo: "پ", sources: TW("pooya") },
            { id: "faratar", name: "فراتر", logo: "ف", sources: TW("ofogh") },
            { id: "amouzesh", name: "آموزش", logo: "آموزش", sources: TW("amouzesh") },
            { id: "quran", name: "قرآن", logo: "قرآن", sources: TW("quran") }
          ]
        },
        {
          title: "استانی",
          channels: [
            { id: "prov-isfahan", name: "اصفهان", logo: "اصف", sources: TW("esfahan") },
            { id: "prov-khorasan", name: "خراسان رضوی", logo: "خر", sources: TW("khorasan") },
            { id: "prov-sahand", name: "سهند", logo: "سهند", sources: TW("azarbayjansharghi") },
            { id: "prov-baran", name: "باران (گیلان)", logo: "باران", sources: TW("gilan") },
            { id: "prov-fars", name: "فارس", logo: "فارس", sources: TW("fars") },
            { id: "prov-khouzestan", name: "خوزستان", logo: "خوز", sources: TW("khuzestan") },
            { id: "prov-aftab", name: "آفتاب (مرکزی)", logo: "آفتاب", sources: TW("markazi") },
            { id: "prov-eshragh", name: "اشراق (زنجان)", logo: "اشراق", sources: TW("zanjan") },
            { id: "prov-tabarestan", name: "تبرستان", logo: "تبر", sources: TW("mazandaran") },
            { id: "prov-khavaran", name: "خاوران", logo: "خاوران", sources: TW("khorasanjonoubi") },
            { id: "prov-jahanbin", name: "جهان‌بین", logo: "جهان", sources: TW("chaharmahal") },
            { id: "prov-dena", name: "دنا", logo: "دنا", sources: TW("kohgiluyeh") },
            { id: "prov-hamoon", name: "هامون", logo: "هامون", sources: TW("sistan") },
            { id: "prov-sabalan", name: "سبلان", logo: "سبل", sources: TW("ardabil") },
            { id: "prov-qazvin", name: "قزوین", logo: "قزوین", sources: TW("qazvin") },
            { id: "prov-sina", name: "سینا (همدان)", logo: "سینا", sources: TW("sina") },
            { id: "prov-khalij", name: "خلیج فارس", logo: "خلیج", sources: TW("hormozgan") }
          ]
        }
      ]
    },
    satellite: {
      title: "② ماهواره",
      groups: [
        {
          title: "موزیک",
          channels: [
            {
              id: "radiojavan",
              name: "رادیو جوان HD",
              logo: "RJ",
              sources: [
                "https://radio.sr-api.ir/hls/stream.m3u8",
                "https://radio2.sr-api.ir/hls/stream.m3u8",
                "https://rjtvhls.wns.live/hls/stream.m3u8"
              ]
            },
            {
              id: "pmc",
              name: "پی‌ام‌سی HD",
              logo: "PMC",
              sources: [
                "https://hls.pmchd.live/hls/stream.m3u8"
              ]
            },
            {
              id: "pmcroyale",
              name: "پی‌ام‌سی رویال",
              logo: "PR",
              sources: [
                "https://rohls.pmc.live/hls/stream.m3u8"
              ]
            }
          ]
        },
        {
          title: "فیلم و سرگرمی",
          channels: [
            { id: "mbcpersia", name: "ام‌بی‌سی پرشیا HD", logo: "MBC", sources: [], site: "https://wns.live" },
            { id: "gemtv", name: "جم تی‌وی", logo: "GEM", sources: [], site: "https://wns.live" },
            { id: "gemseries", name: "جم سریز", logo: "GS", sources: [], site: "https://wns.live" },
            { id: "gemdrama", name: "جم دراما", logo: "GD", sources: [], site: "https://wns.live" },
            { id: "gembollywood", name: "جم بالیوود", logo: "GB", sources: [], site: "https://wns.live" },
            { id: "gemclassic", name: "جم کلاسیک", logo: "GC", sources: [], site: "https://wns.live" },
            { id: "gemcomedy", name: "جم کمدی", logo: "GCo", sources: [], site: "https://wns.live" },
            { id: "gemhorror", name: "جم هورور", logo: "GH", sources: [], site: "https://wns.live" },
            { id: "gemwrestling", name: "جم رسلینگ", logo: "GW", sources: [], site: "https://wns.live" },
            { id: "tapesh", name: "تپش", logo: "تپش", sources: [], site: "http://tapesh.tv" },
            { id: "persiana1", name: "پرشیانا وان", logo: "P1", sources: [], site: "https://wns.live" },
            { id: "persianacinema", name: "پرشیانا سینما", logo: "PC", sources: [], site: "https://wns.live" },
            { id: "persianahorror", name: "پرشیانا هورور", logo: "PH", sources: [], site: "https://wns.live" },
            { id: "actiontv", name: "اکشن تی‌وی", logo: "AC", sources: [], site: "https://wns.live" },
            { id: "wwe-zone", name: "کشتی کج ۲۴س", logo: "WWE", sources: [], site: "https://wns.live" }
          ]
        },
        {
          title: "ورزش خارجی",
          channels: [
            { id: "beinsports", name: "بین اسپورت", logo: "beIN", sources: [], site: "https://wns.live" },
            { id: "eurosport1", name: "یورو اسپورت ۱", logo: "EU", sources: [], site: "https://wns.live" },
            { id: "arenasport1", name: "آرنا اسپورت", logo: "AR", sources: [], site: "https://wns.live" },
            { id: "realmadridtv", name: "رئال مادرید", logo: "RM", sources: [], site: "https://wns.live" },
            { id: "snooker900", name: "اسنوکر جهانی", logo: "SN", sources: [], site: "https://wns.live" },
            { id: "worldsnooker", name: "اسنوکر WST", logo: "WST", sources: [], site: "https://wns.live" }
          ]
        }
      ]
    }
  };

  global.ArshiaChannels = DB;
})(window);
