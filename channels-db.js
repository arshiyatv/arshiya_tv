// ARSHIA TV — لیست شبکه‌های زنده (خارجی — بدون تلوبیون)
const CHANNELS = [

  // ===== خبر =====
  { id: "iranintl", name: "ایران اینترنشنال", group: "خبر", logo: "", streams: ["https://hlspackager.akamaized.net/live/DB/IRAN_INTERNATIONAL/HLS/IRAN_INTERNATIONAL.m3u8"] },
  { id: "azadi", name: "آزادی", group: "خبر", logo: "", streams: ["https://wmtvhls.wns.live/hls/stream.m3u8"] },
  { id: "cheshmeh", name: "چشم عقاب", group: "خبر", logo: "", streams: ["https://choghls.wns.live/hls/stream.m3u8"] },
  { id: "dej", name: "دژ", group: "خبر", logo: "", streams: ["https://rdejhls.wns.live/hls/stream.m3u8"] },
  { id: "gordafarid", name: "گردآفرید", group: "خبر", logo: "", streams: ["https://gatvhls.wns.live/hls/stream.m3u8"] },
  { id: "bbcpersian", name: "بی‌بی‌سی فارسی", group: "خبر", logo: "", streams: ["https://vs-hls-pushb-ww-live.akamaized.net/x=4/i=urn:bbc:pips:service:bbc_persian_tv/mobile_wifi_main_hd_abr_v2.m3u8"] },
  { id: "radiofarda", name: "رادیو فردا", group: "خبر", logo: "", streams: ["https://rferl-ingest.akamaized.net/hls/live/2121768/tvmc01/playlist.m3u8"] },
  { id: "voapersian", name: "صدای آمریکا", group: "خبر", logo: "", streams: ["https://voa-ingest.akamaized.net/hls/live/2033876/tvmc07/playlist.m3u8"] },
  { id: "simayeazadi", name: "سیمای آزادی", group: "خبر", logo: "", streams: ["https://simaytv.akamaized.net/hls/live/a162cb6c-3be1-4e57-87dc-a75a50b3b8d9/simayhls/index.m3u8"] },
  { id: "shorai", name: "شورایی", group: "خبر", logo: "", streams: ["https://hlspackager.akamaized.net/live/DB/ALTERNATIVE_SHORAI_TV/HLS/ALTERNATIVE_SHORAI_TV.m3u8"] },
  { id: "mihan", name: "میهن", group: "خبر", logo: "", streams: ["https://iptv.mihantv.com/mihantv/playlist.m3u8"] },
  { id: "setareh", name: "ستاره", group: "خبر", logo: "", streams: ["https://setarehhls.wns.live/hls/stream.m3u8"] },
  { id: "iranwire", name: "ایران‌وایر", group: "خبر", logo: "", streams: ["https://irwhls.wns.live/hls/stream.m3u8"] },
  { id: "mellig", name: "ملی‌گرا", group: "خبر", logo: "", streams: ["https://mellihls.wns.live/hls/stream.m3u8"] },
  { id: "kanaljadid", name: "کانال جدید", group: "خبر", logo: "", streams: ["https://kjhls.wns.live/hls/stream.m3u8"] },
  { id: "zed", name: "زد تی‌وی", group: "خبر", logo: "", streams: ["https://zedhls.wns.live/hls/stream.m3u8"] },
  { id: "iranefarda", name: "ایران فردا", group: "خبر", logo: "", streams: ["https://iranefardalive.com/stream/live.m3u8"] },
  { id: "irannr", name: "ایران ان‌آر", group: "خبر", logo: "", streams: ["https://hls.irannrtv.live/hls/stream.m3u8"] },
  { id: "pleon", name: "پروژه لئون", group: "خبر", logo: "", streams: ["https://pleonhls.wns.live/hls/stream.m3u8"] },
  { id: "pulse", name: "پالس مدیا", group: "خبر", logo: "", streams: ["https://pulsehls.wns.live/hls/stream.m3u8"] },
  { id: "didgah", name: "دیدگاه", group: "خبر", logo: "", streams: ["https://media.streambrothers.com:1936/8276/8276/playlist.m3u8"] },
  { id: "parstv", name: "پارس تی‌وی", group: "خبر", logo: "", streams: ["https://livestream.5centscdn.com/parstvtvweb1/e8ac8f595b3003ea3d22178c05c67593.sdp/playlist.m3u8"] },

  // ===== موسیقی =====
  { id: "pmc", name: "پی‌ام‌سی", group: "موسیقی", logo: "", streams: ["https://pmchls.wns.live/hls/stream.m3u8"] },
  { id: "pmcroyale", name: "پی‌ام‌سی رویال", group: "موسیقی", logo: "", streams: ["https://pmcrohls.wns.live/hls/stream.m3u8"] },
  { id: "rjtv", name: "رادیو جوان تی‌وی", group: "موسیقی", logo: "", streams: ["https://rjtvhls.wns.live/hls/stream.m3u8"] },
  { id: "avang", name: "آونگ", group: "موسیقی", logo: "", streams: ["https://hls.avang.live/hls/stream.m3u8"] },
  { id: "navahang", name: "نواهنگ", group: "موسیقی", logo: "", streams: ["https://hls.navahang.live/hls/stream.m3u8"] },
  { id: "sunmusic", name: "سان موزیک", group: "موسیقی", logo: "", streams: ["https://hls.sunmusic.live/hls/stream.m3u8"] },
  { id: "t2tv", name: "تی۲", group: "موسیقی", logo: "", streams: ["https://t2hls.wns.live/hls/stream.m3u8"] },
  { id: "persiana_music", name: "پرشیانا موسیقی", group: "موسیقی", logo: "", streams: ["https://musichls.persiana.live/hls/stream.m3u8"] },
  { id: "persiana_folk", name: "پرشیانا سنتی", group: "موسیقی", logo: "", streams: ["https://sonhls.persiana.live/hls/stream.m3u8"] },
  { id: "persiana_nostalgia", name: "پرشیانا نوستالژی", group: "موسیقی", logo: "", streams: ["https://noshls.persiana.live/hls/stream.m3u8"] },
  { id: "persiana_rap", name: "پرشیانا رپ", group: "موسیقی", logo: "", streams: ["https://raphls.persiana.live/hls/stream.m3u8"] },
  { id: "persiana_setmix", name: "پرشیانا ست‌میکس", group: "موسیقی", logo: "", streams: ["https://setmixhls.persiana.live/hls/stream.m3u8"] },
  { id: "afn", name: "ای‌اف‌ان", group: "موسیقی", logo: "", streams: ["https://bozztv.com/1gbw5/tintv2/tintv2/playlist.m3u8"] },

  // ===== فیلم / سرگرمی =====
  { id: "ifilmfa", name: "آی‌فیلم فارسی", group: "فیلم", logo: "", streams: ["https://live.presstv.co.uk/hls/ifilmfa.m3u8"] },
  { id: "ifilm2", name: "آی‌فیلم ۲", group: "فیلم", logo: "", streams: ["https://live.presstv.co.uk/hls/ifilm2.m3u8"] },
  { id: "metafilm", name: "متافیلم", group: "فیلم", logo: "", streams: ["https://metafilmhls.wns.live/hls/stream.m3u8"] },
  { id: "fx", name: "اف‌ایکس", group: "فیلم", logo: "", streams: ["https://fxtvhls.wns.live/hls/stream.m3u8"] },
  { id: "toonix", name: "تونیکس", group: "فیلم", logo: "", streams: ["https://toonixhls.wns.live/hls/stream.m3u8"] },
  { id: "box247", name: "۲۴۷ باکس", group: "فیلم", logo: "", streams: ["https://hls.247box.live/hls/stream.m3u8"] },
  { id: "avafamily", name: "آوا فمیلی", group: "فیلم", logo: "", streams: ["https://familyhls.avatv.live/hls/stream.m3u8"] },
  { id: "maahtv", name: "ماه تی‌وی", group: "فیلم", logo: "", streams: ["https://hls.maahtv.live/hls/stream.m3u8"] },
  { id: "tapesh", name: "تپش", group: "فیلم", logo: "", streams: ["https://iptv.tapesh.tv/tapesh/playlist.m3u8"] },
  { id: "tintv", name: "تین تی‌وی", group: "فیلم", logo: "", streams: ["https://bozztv.com/1gbw5/tintv/tintv/playlist.m3u8"] },
  { id: "arko", name: "آرکو", group: "فیلم", logo: "", streams: ["https://arkhls.wns.live/hls/stream.m3u8"] },
  { id: "royal", name: "رویال", group: "فیلم", logo: "", streams: ["https://arvhls.wns.live/hls/stream.m3u8"] },
  { id: "oxir", name: "اکسیر", group: "فیلم", logo: "", streams: ["https://hls.oxir.live/hls/stream.m3u8"] },
  { id: "novin", name: "نوین", group: "فیلم", logo: "", streams: ["https://stream.novin.live/hls/playlist.m3u8"] },
  { id: "ravi", name: "راوی", group: "فیلم", logo: "", streams: ["https://hls.ravitv.com/hls/stream.m3u8"] },
  { id: "yourtime", name: "یورتایم", group: "فیلم", logo: "", streams: ["https://live.yourtime.tv/hls/stream.m3u8"] },
  { id: "mtc", name: "ام‌تی‌سی", group: "فیلم", logo: "", streams: ["https://mtchls.wns.live/hls/stream.m3u8"] },
  { id: "nettv", name: "نت تی‌وی", group: "فیلم", logo: "", streams: ["https://nethls.wns.live/hls/stream.m3u8"] },
  { id: "itn", name: "آی‌تی‌ان", group: "فیلم", logo: "", streams: ["https://itnhls.wns.live/hls/stream.m3u8"] },
  { id: "omideiran", name: "امید ایران", group: "فیلم", logo: "", streams: ["https://oitnhls.wns.live/hls/stream.m3u8"] },
  { id: "asil", name: "اصیل", group: "فیلم", logo: "", streams: ["https://live.asil.tv/asiltv/index.m3u8"] },
  { id: "assirat", name: "السیرات", group: "فیلم", logo: "", streams: ["https://softverse.b-cdn.net/Assirat/assiratobs/playlist.m3u8"] },
  { id: "alwilayah", name: "الولایه", group: "فیلم", logo: "", streams: ["https://nl.livekadeh.com/hls2/alwilayah_tv.m3u8"] },

  // ===== ورزش =====
  { id: "persiana_fight", name: "پرشیانا رزمی", group: "ورزش", logo: "", streams: ["https://fighthls.persiana.live/hls/stream.m3u8"] }

];

if (typeof module !== "undefined") module.exports = { CHANNELS };
if (typeof window !== "undefined") window.CHANNELS = CHANNELS;
