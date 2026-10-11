// ARSHIA TV — شبکه‌های زنده (منابع عمومی + دیاسپورا)
// لینک‌ها ممکن است تغییر کنند؛ از پنل مدیریت قفل/مخفی کن
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
  { id: "nicongress", name: "کنگره ملی ایران", group: "خبر", logo: "", streams: ["https://tv.iraniancongress.com/stream/tv.m3u8"] },
  { id: "presstv", name: "پرس تی‌وی", group: "خبر", logo: "", streams: ["https://live.presstv.co.uk/hls/presstv.m3u8","https://cdnlive.presstv.ir/cdnlive/smil:cdnlive.smil/playlist.m3u8"] },
  { id: "alalam", name: "العالم", group: "خبر", logo: "", streams: ["https://live2.alalam.ir/alalam.m3u8"] },
  { id: "hispan", name: "هیسپن تی‌وی", group: "خبر", logo: "", streams: ["https://cdnlive.presstv.ir/live/smil:live.smil/playlist.m3u8"] },
  { id: "iranpress", name: "ایران پرس", group: "خبر", logo: "", streams: ["https://live.presstv.ir/hls/presstv_5_482/index.m3u8"] },
  { id: "snn", name: "اس‌ان‌ان", group: "خبر", logo: "", streams: ["https://live2.snn.ir/hls/snn2_hd720/index.m3u8"] },

  // ===== فیلم =====
  { id: "ifilmfa", name: "آی‌فیلم فارسی", group: "فیلم", logo: "", streams: ["https://live.presstv.co.uk/hls/ifilmfa.m3u8"] },
  { id: "ifilm2", name: "آی‌فیلم ۲", group: "فیلم", logo: "", streams: ["https://live.presstv.co.uk/hls/ifilm2.m3u8"] },
  { id: "ifilmen", name: "آی‌فیلم انگلیسی", group: "فیلم", logo: "", streams: ["https://live.presstv.co.uk/hls/ifilmen.m3u8"] },
  { id: "ifilmar", name: "آی‌فیلم عربی", group: "فیلم", logo: "", streams: ["https://live.presstv.co.uk/hls/ifilmar.m3u8"] },
  { id: "metafilm", name: "متافیلم", group: "فیلم", logo: "", streams: ["https://metahls.wns.live/hls/stream.m3u8"] },
  { id: "fx", name: "اف‌ایکس", group: "فیلم", logo: "", streams: ["https://fxhls.wns.live/hls/stream.m3u8"] },
  { id: "toonix", name: "تونیکس", group: "فیلم", logo: "", streams: ["https://toonixhls.wns.live/hls/stream.m3u8"] },
  { id: "box247", name: "۲۴۷ باکس", group: "فیلم", logo: "", streams: ["https://hls.247box.live/hls/stream.m3u8"] },
  { id: "avafamily", name: "آوا فمیلی", group: "فیلم", logo: "", streams: ["https://familyhls.avatv.live/hls/stream.m3u8"] },
  { id: "maahtv", name: "ماه تی‌وی", group: "فیلم", logo: "", streams: ["https://hls.maahtv.live/hls/stream.m3u8"] },
  { id: "tapesh", name: "تپش", group: "فیلم", logo: "", streams: ["https://iptv.tapesh.tv/tapesh/playlist.m3u8"] },
  { id: "tintv", name: "تین تی‌وی", group: "فیلم", logo: "", streams: ["https://bozztv.com/1gbw5/tintv/tintv/playlist.m3u8"] },
  { id: "afn", name: "ای‌اف‌ان", group: "فیلم", logo: "", streams: ["https://bozztv.com/1gbw5/tintv2/tintv2/playlist.m3u8"] },
  { id: "arko", name: "آرکو", group: "فیلم", logo: "", streams: ["https://arkhls.wns.live/hls/stream.m3u8"] },
  { id: "royal", name: "رویال", group: "فیلم", logo: "", streams: ["https://arvhls.wns.live/hls/stream.m3u8"] },
  { id: "oxir", name: "اکسیر", group: "فیلم", logo: "", streams: ["https://hls.oxir.live/hls/stream.m3u8"] },
  { id: "novin", name: "نوین", group: "فیلم", logo: "", streams: ["https://stream.novin.live/hls/playlist.m3u8"] },
  { id: "ravi", name: "راوی", group: "فیلم", logo: "", streams: ["https://hls.ravitv.com/hls/stream.m3u8"] },
  { id: "yourtime", name: "یورتایم", group: "فیلم", logo: "", streams: ["https://live.yourtime.tv/hls/stream.m3u8","https://hls.yourtime.live/hls/stream.m3u8"] },
  { id: "mtc", name: "ام‌تی‌سی", group: "فیلم", logo: "", streams: ["https://mtchls.wns.live/hls/stream.m3u8"] },
  { id: "nettv", name: "نت تی‌وی", group: "فیلم", logo: "", streams: ["https://nethls.wns.live/hls/stream.m3u8"] },
  { id: "itn", name: "آی‌تی‌ان", group: "فیلم", logo: "", streams: ["https://itnhls.wns.live/hls/stream.m3u8"] },
  { id: "omideiran", name: "امید ایران", group: "فیلم", logo: "", streams: ["https://oitnhls.wns.live/hls/stream.m3u8"] },
  { id: "asil", name: "اصیل", group: "فیلم", logo: "", streams: ["https://live.asil.tv/asiltv/index.m3u8"] },
  { id: "assirat", name: "السیرات", group: "فیلم", logo: "", streams: ["https://softverse.b-cdn.net/Assirat/assiratobs/playlist.m3u8"] },
  { id: "alwilayah", name: "الولایه", group: "فیلم", logo: "", streams: ["https://nl.livekadeh.com/hls2/alwilayah_tv.m3u8"] },
  { id: "hodhod", name: "هدهد فارسی", group: "فیلم", logo: "", streams: ["https://northtelecom.b-cdn.net/hodhodtv.m3u8"] },
  { id: "payvand", name: "پیوند", group: "فیلم", logo: "", streams: ["https://uni6rtmp.tulix.tv/ucur1/Payvand/playlist.m3u8"] },
  { id: "nejat", name: "نجات", group: "فیلم", logo: "", streams: ["https://hls.nejat.live/hls/stream.m3u8"] },
  { id: "mohabat", name: "محبت", group: "فیلم", logo: "", streams: ["https://5acf9f9415a10.streamlock.net/live_transcoder/ngrp:mohabat.stream_all/playlist.m3u8"] },

  // ===== موسیقی =====
  { id: "rjtv", name: "رادیو جوان", group: "موسیقی", logo: "", streams: ["https://stream.radiojavan.com/hls/rjtv/playlist.m3u8","https://hls.radiojavan.com/hls/stream.m3u8"] },
  { id: "pmc", name: "پی‌ام‌سی", group: "موسیقی", logo: "", streams: ["https://pmchls.wns.live/hls/stream.m3u8"] },
  { id: "pmcroyale", name: "پی‌ام‌سی رویال", group: "موسیقی", logo: "", streams: ["https://pmcrhls.wns.live/hls/stream.m3u8"] },
  { id: "avang", name: "آونگ", group: "موسیقی", logo: "", streams: ["https://avanghls.wns.live/hls/stream.m3u8"] },
  { id: "navahang", name: "نماهنگ", group: "موسیقی", logo: "", streams: ["https://navahanghls.wns.live/hls/stream.m3u8"] },
  { id: "sunmusic", name: "سان موزیک", group: "موسیقی", logo: "", streams: ["https://sunhls.wns.live/hls/stream.m3u8"] },
  { id: "t2tv", name: "تی‌تو تی‌وی", group: "موسیقی", logo: "", streams: ["https://t2hls.wns.live/hls/stream.m3u8"] },
  { id: "persiana_music", name: "پرشیانا موزیک", group: "موسیقی", logo: "", streams: ["https://musichls.persiana.live/hls/stream.m3u8"] },
  { id: "persiana_folk", name: "پرشیانا فولک", group: "موسیقی", logo: "", streams: ["https://folkhls.persiana.live/hls/stream.m3u8"] },
  { id: "persiana_nostalgia", name: "پرشیانا نوستالژی", group: "موسیقی", logo: "", streams: ["https://nostalgiahls.persiana.live/hls/stream.m3u8"] },
  { id: "persiana_rap", name: "پرشیانا رپ", group: "موسیقی", logo: "", streams: ["https://raphls.persiana.live/hls/stream.m3u8"] },
  { id: "persiana_setmix", name: "پرشیانا ست‌میکس", group: "موسیقی", logo: "", streams: ["https://setmixhls.persiana.live/hls/stream.m3u8"] },

  // ===== ورزش =====
  { id: "persiana_fight", name: "پرشیانا رزمی", group: "ورزش", logo: "", streams: ["https://fighthls.persiana.live/hls/stream.m3u8"] },
  { id: "africa24sport", name: "آفریقا ۲۴ اسپورت", group: "ورزش", logo: "", streams: ["https://africa24.vedge.infomaniak.com/livecast/ik:africa24sport/manifest.m3u8"] },
  { id: "golf30a", name: "۳۰اِی گلف", group: "ورزش", logo: "", streams: ["https://30a-tv.com/feeds/vidaa/golf.m3u8"] },
  { id: "as3sport", name: "ای‌اس۳ اسپورت", group: "ورزش", logo: "", streams: ["https://streamtv.as3sport.online:3394/hybrid/play.m3u8"] },
  { id: "olympic1", name: "المپیک کانال ۱", group: "ورزش", logo: "", streams: ["https://live.olympicchannel.com/ocs/channel01b/master.m3u8"] },
  { id: "olympic2", name: "المپیک کانال ۲", group: "ورزش", logo: "", streams: ["https://live.olympicchannel.com/ocs/channel02b/master.m3u8"] },
  { id: "redbull", name: "ردبول تی‌وی", group: "ورزش", logo: "", streams: ["https://rbmn-live.akamaized.net/hls/live/590964/BoRB-AT/master.m3u8"] },

  // ===== عمومی / بین‌المللی =====
  { id: "dw_en", name: "دویچه‌وله انگلیسی", group: "خبر", logo: "", streams: ["https://dwamdstream102.akamaized.net/hls/live/2015525/dwstream102/playlist.m3u8"] },
  { id: "france24_en", name: "فرانس ۲۴ انگلیسی", group: "خبر", logo: "", streams: ["https://static.france24.com/live/F24_EN_HI_HLS/live_web.m3u8"] },
  { id: "france24_ar", name: "فرانس ۲۴ عربی", group: "خبر", logo: "", streams: ["https://static.france24.com/live/F24_AR_HI_HLS/live_web.m3u8"] },
  { id: "aljazeera_en", name: "الجزیره انگلیسی", group: "خبر", logo: "", streams: ["https://live-hls-web-aje.getaj.net/AJE/index.m3u8"] },
  { id: "skynews", name: "اسکای نیوز", group: "خبر", logo: "", streams: ["https://skynewsau-live.akamaized.net/hls/live/2002685/skynews/master.m3u8"] },
  { id: "cnn_intl", name: "سی‌ان‌ان", group: "خبر", logo: "", streams: ["https://cnn-cnninternational-1-eu.samsung.wurl.tv/playlist.m3u8"] },
  { id: "bloomberg", name: "بلومبرگ", group: "خبر", logo: "", streams: ["https://bloomberg-bloomberg-1-eu.samsung.wurl.tv/playlist.m3u8"] },
  { id: "nasa", name: "ناسا تی‌وی", group: "عمومی", logo: "", streams: ["https://ntv1.akamaized.net/hls/live/2014075/NASA-NTV1-HLS/master.m3u8"] },
  { id: "euronews", name: "یورونیوز انگلیسی", group: "خبر", logo: "", streams: ["https://euronews-euronews-world-1-eu.samsung.wurl.tv/playlist.m3u8"] }

];

if (typeof module !== "undefined") module.exports = { CHANNELS };
if (typeof window !== "undefined") window.CHANNELS = CHANNELS;
