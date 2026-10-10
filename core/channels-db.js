/**
 * ARSHIA TV FINAL — Channel Registry
 * هر شبکه چند منبع؛ موتور به‌ترتیب failover می‌کند.
 */
(function (global) {
  "use strict";

function TW(slug) {
    return [
      "https://ncdn.telewebion.ir/" + slug + "/live/480p/index.m3u8",
      "https://ncdn.telewebion.ir/" + slug + "/live/720p/index.m3u8",
      "https://ncdn.telewebion.ir/" + slug + "/live/playlist.m3u8",
      "https://cdn.telewebion.ir/" + slug + "/live/480p/index.m3u8",
      "https://cdnw.telewebion.com/" + slug + "/live/playlist.m3u8"
    ];
  }

  function TWSite(slug) {
    return "https://www.telewebion.com/live/" + slug;
  }

  var DB = {
    domestic: {
      title: "① داخلی",
      groups: [
        {
          title: "سراسری",
          channels: [
            { id: "tv1_fam", name: "شبکه یک (فام)", logo: "۱", sources: ["https://fam.ir"] },
            { id: "tv2", name: "شبکه دو HD", logo: "۲", sources: TW("tv2") },
            { id: "tv3", name: "شبکه سه HD", logo: "۳", sources: TW("tv3") },
            { id: "tv4", name: "شبکه چهار", logo: "۴", sources: TW("tv4") },
            { id: "tv5", name: "شبکه پنج (تهران)", logo: "۵", sources: TW("tehran") },
            { id: "irinn", name: "شبکه خبر HD", logo: "خبر", sources: TW("irinn").concat(["http://185.9.2.18/chid_926/index.m3u8"]) },
            { id: "varzesh", name: "ورزش HD", logo: "⚽", sources: TW("varzesh") },
            { id: "nasim", name: "نسیم HD", logo: "ن", sources: TW("nasim") },
            { id: "mostanad", name: "مستند HD", logo: "م", sources: TW("mostanad") },
            { id: "ifilm", name: "آی‌فیلم HD", logo: "IF", sources: TW("ifilm").concat(["https://live.presstv.ir/hls/ifilmfa.m3u8"]) },
            { id: "namayesh", name: "نمایش HD", logo: "نمایش", sources: TW("namayesh") },
            { id: "tamasha", name: "تماشا HD", logo: "ت", sources: TW("hdtest") },
            { id: "omid", name: "امید", logo: "امید", sources: TW("omid") },
            { id: "pooya", name: "پویا / نهال", logo: "پ", sources: TW("pooya") },
            { id: "faratar", name: "فراتر", logo: "ف", sources: TW("ofogh") },
            { id: "quran", name: "قرآن", logo: "ق", sources: TW("quran") },
            { id: "amouzesh", name: "آموزش", logo: "آ", sources: TW("amouzesh") },
            { id: "salamat", name: "سلامت", logo: "س", sources: TW("salamat") }
          ]
        },
        {
          title: "استانی",
          channels: [
            { id: "prov-isfahan", name: "اصفهان", logo: "اصف", sources: TW("esfahan") },
            { id: "prov-khorasan", name: "خراسان رضوی", logo: "خر", sources: TW("khorasan") },
            { id: "prov-sahand", name: "سهند", logo: "سهند", sources: TW("azarbayjansharghi") },
            { id: "prov-baran", name: "باران (گیلان)", logo: "باران", sources: TW("baran") },
            { id: "prov-fars", name: "فارس", logo: "فارس", sources: TW("fars") },
            { id: "prov-khouzestan", name: "خوزستان", logo: "خوز", sources: TW("khuzestan") },
            { id: "prov-aftab", name: "آفتاب", logo: "آفتاب", sources: TW("aftab") },
            { id: "prov-eshragh", name: "اشراق", logo: "اشراق", sources: TW("eshragh") },
            { id: "prov-tabarestan", name: "تبرستان", logo: "تبر", sources: TW("tabarestan") },
            { id: "prov-khavaran", name: "خاوران", logo: "خاوران", sources: TW("khavaran") },
            { id: "prov-jahanbin", name: "جهان‌بین", logo: "جهان", sources: TW("jahanbin") },
            { id: "prov-dena", name: "دنا", logo: "دنا", sources: TW("dena") },
            { id: "prov-hamoon", name: "هامون", logo: "هامون", sources: TW("hamoon") },
            { id: "prov-sabalan", name: "سبلان", logo: "سبل", sources: TW("ardabil") },
            { id: "prov-qazvin", name: "قزوین", logo: "قزوین", sources: TW("qazvin") },
            { id: "prov-sina", name: "سینا (همدان)", logo: "سینا", sources: TW("sina") },
            { id: "prov-khalij", name: "خلیج فارس", logo: "خلیج", sources: TW("hormozgan") }
          ]
        },
        {
          title: "آرشیو / راهنما",
          channels: [
            {
              id: "guide-tw",
              name: "راهنمای Telewebion",
              logo: "ℹ",
              sources: [],
              info: "برای پخش پایدار داخلی‌ها Worker کلادفلر را با فایل worker/proxy.js بساز و proxyBase را در brain.js پر کن."
            }
          ]
        }
      ]
    },
    satellite: {
      title: "② ماهواره / موزیک",
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
                "https://radio2.sr-api.ir/hls/stream.m3u8"
              ]
            },
            {
              id: "pmc",
              name: "پی‌ام‌سی",
              logo: "PMC",
              sources: [],
              info: "پس از دریافت لینک m3u8 رسمی در sources اضافه می‌شود."
            }
          ]
        },
        {
          title: "فیلم و سرگرمی",
          channels: [
            { id: "mbcpersia", name: "ام‌بی‌سی پرشیا", logo: "MBC", sources: [], info: "نیاز به مجوز / m3u8 رسمی" },
            { id: "gemtv", name: "جم تی‌وی", logo: "GEM", sources: [], info: "نیاز به مجوز / m3u8 رسمی" },
            { id: "gemseries", name: "جم سریز", logo: "GS", sources: [], info: "نیاز به مجوز / m3u8 رسمی" },
            { id: "gemdrama", name: "جم دراما", logo: "GD", sources: [], info: "نیاز به مجوز / m3u8 رسمی" },
            { id: "tapesh", name: "تپش", logo: "تپش", sources: [], info: "نیاز به مجوز / m3u8 رسمی" }
          ]
        },
        {
          title: "ورزش",
          channels: [
            { id: "beinsports", name: "بین اسپورت", logo: "beIN", sources: [], info: "نیاز به مجوز / m3u8 رسمی" },
            { id: "eurosport1", name: "یورو اسپورت ۱", logo: "EU", sources: [], info: "نیاز به مجوز / m3u8 رسمی" }
          ]
        }
      ]
    }
  };

  global.ArshiaChannels = DB;
})(window);
