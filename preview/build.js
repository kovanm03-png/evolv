// Evolve 360, multi-page site. PREVIEW first, nothing outside the preview folder changes until you say so.
//   node preview/build.js                  build the preview into preview/site/  (open /preview/site/index.html)
//   node preview/build.js --apply          KEEP it: write the pages onto the live site (the live pages are saved first in preview/backup-last)
//   node preview/build.js --revert         UNDO the last --apply: the saved live pages come back
//   node preview/build.js --revert-original  go all the way back to the first one-page site (preview/original)
// To throw the preview away, delete the preview folder.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const ORIG = path.join(__dirname, 'original');
const BACK = path.join(__dirname, 'backup-last');
const PAGES = ['index', 'services', 'work', 'about', 'contact'];
const has = (f) => process.argv.includes(f);
const LIVE_FILES = [...PAGES.map((p) => `${p}.html`), ...PAGES.map((p) => path.join('ku', `${p}.html`))];

const copy = (from, to) => { fs.mkdirSync(path.dirname(to), { recursive: true }); fs.copyFileSync(from, to); };
const copyDir = (from, to) => { fs.mkdirSync(to, { recursive: true }); for (const f of fs.readdirSync(from)) { const s = path.join(from, f); if (fs.statSync(s).isFile()) copy(s, path.join(to, f)); } };

if (!fs.existsSync(ORIG)) for (const p of ['index.html', path.join('ku', 'index.html')]) copy(path.join(ROOT, p), path.join(ORIG, p));

if (has('--revert-original')) {
  for (const p of ['index.html', path.join('ku', 'index.html')]) copy(path.join(ORIG, p), path.join(ROOT, p));
  for (const f of LIVE_FILES.filter((x) => !/index\.html$/.test(x))) fs.rmSync(path.join(ROOT, f), { force: true });
  fs.rmSync(path.join(ROOT, 'assets', 'enhance'), { recursive: true, force: true });
  console.log('Reverted all the way: the original one-page site is back.');
  process.exit(0);
}
if (has('--revert')) {
  if (!fs.existsSync(BACK)) { console.log('No saved copy of the previous live site. Use --revert-original for the first one-page site.'); process.exit(1); }
  for (const f of LIVE_FILES) if (fs.existsSync(path.join(BACK, f))) copy(path.join(BACK, f), path.join(ROOT, f));
  if (fs.existsSync(path.join(BACK, 'enhance'))) { fs.rmSync(path.join(ROOT, 'assets', 'enhance'), { recursive: true, force: true }); copyDir(path.join(BACK, 'enhance'), path.join(ROOT, 'assets', 'enhance')); }
  console.log('Reverted: the live site is back to how it was before the last --apply.');
  process.exit(0);
}

/* ---------------- data taken from instagram.com/evolv36t (public profile, read 11 Nov 2026) ---------------- */
const PHONE = [['+964 (0) 771 339 4545', '+9647713394545'], ['+964 (0) 751 404 4568', '+9647514044568']];
const WA = 'https://wa.me/9647713394545';
const IG = 'https://www.instagram.com/evolv36t/';
const COLLAB = 'https://www.instagram.com/brwa_o_omar/';
const PROFILE = { posts: 86, followers: 518 };
// the 11 most recent reels, newest first. cap = caption exactly as posted (some are cut short by Instagram: "...").
const REELS = [
  { id: 'DfmtaeeAJiv', d: '2026-11-11', v: 2332, cap: 'کاریگەی چیرۆک', en: 'The effect of a story',
    alt: 'A grey-haired man lit from the side against a dark teal wall, looking down' },
  { id: 'DfR_v_XDr9h', d: '2026-11-03', v: 4780, cap: 'مەرج نیە ئەوەی لەبەرچاوی تۆ گەورەیە کاریگەریەکەی ئەوە بێت کە بیری لێ ئەکەیتەوە', en: 'What looks big to you does not have to be as impactful as you think',
    alt: 'A grey-haired man in an olive shirt reading his phone on a grey tufted sofa' },
  { id: 'DeXKO2jgPo8', d: '2026-10-11', v: 4084, cap: 'خۆ تۆ هیچ شتێکی هەڵەت نەکردووە تا لە دەرکەوتن بترسیت. ئەمە بۆ ئەوانە کە ئەیانوت نامانەوێ دەربکەوین.', en: 'You have not done anything wrong, so why fear being seen? This is for those who said we do not want to appear.',
    alt: 'A man holding a small microphone in an office, a colleague at a desk behind him, Kurdish subtitle on screen' },
  { id: 'DeHtuPwD-mJ', d: '2026-10-05', v: 4239, cap: 'هەوڵی فرۆشتن بە بێ دروستکردنی متمانە هەڵەیەکی گەورەیە. سەرەتا بەخشینی بەها و دواتر فرۆشتن.', en: 'Trying to sell without building trust is a big mistake. First give value, then sell.',
    alt: 'A 3D clinic building with an orange cross and a map pin under a Kurdish headline' },
  { id: 'DdTtdR3gTgv', d: '2026-09-15', v: 5243, cap: 'ناوی خۆت بەهێزترین و کاریگەرترین ئامرازی مارکێتینگە کە بزنسەکەت بتوانێت سودی لێ وەربگرێت.', en: 'Your name is the strongest and most effective marketing tool your business can use.',
    alt: 'A man in a green shirt with a clip-on microphone under an orange quote mark and Kurdish headline' },
  { id: 'DdEzfDdjyqn', d: '2026-09-09', v: 2805, cap: 'کاتێک بیر لە مارکێتینگ دەکەیتەوە، دەکرێت وا بیر بکەیتەوە کە تۆ ببیتە خاوەنی دەستەواژەیەک. سەلامەتی، تەندروستی، توندوتۆڵ…', en: 'When you think about marketing, you can think of it as owning a phrase. Safety, health, sturdiness…',
    alt: 'A man in a white shirt in front of a car-maker logo on a navy grid, with a Kurdish headline' },
  { id: 'Dc8vXetDeMh', d: '2026-09-06', v: 5184, cap: 'ئەگەر جیاوازی نێوان ئەم دوو شتەت نەزانیوە، لەوانەیە تا ئێستا زۆر شتت لە کیس چووبێت.', en: 'If you do not know the difference between these two things, you may have missed a lot until now.',
    alt: 'A man in a grey suit next to an orange quote card with a Kurdish headline' },
  { id: 'DcyKJeGCaI8', d: '2026-09-02', v: 3727, cap: 'گەورەترین هەڵە ئەوەیە یەکەم دوو قۆناغ بپەڕێنیت ڕاستەوخۆ لە کۆتاییەوە دەستپێبکەیت.', en: 'The biggest mistake is skipping the first two stages and starting straight from the end.',
    alt: 'A man in dark clothes under a Kurdish headline in an orange-edged frame on a navy grid' },
  { id: 'DcqozmjkS6k', d: '2026-08-30', v: 4648, cap: 'نە باسی ئەوە ئەکات کە بە شیری سروشتی دروستکراوە، نە ئەوەی کە مەوادی حافیزەی تیا نیە. 🐼', en: 'It neither says it is made with natural milk, nor that it has no preservatives. 🐼',
    alt: 'A man in a white shirt gesturing at a desk, an orange ring and Kurdish text behind him' },
  { id: 'DcgB7W7kqpI', d: '2026-08-26', v: 4243, cap: 'مارکێتینگ ئیشی دروستکردنی خواستە و فرۆش ئیشی گۆڕینی ئەو خواستەیە بە پارە یان بە فرۆش. زۆرێک لە بزنسەکان بە هەڵە بیر لە…', en: 'Marketing is the work of creating desire, and sales is the work of turning that desire into money. Many businesses wrongly think about…',
    alt: 'A man in a black polo under a large orange quote mark and a Kurdish headline' },
  { id: 'DcYreNSmZ9N', d: '2026-08-23', v: 5059, cap: 'لە دوو ڕێگا تێپەڕ ناکات! بەڵام هیچ یەکێک لەو دووانە ئیشی یەک ناکەن.', en: 'It does not pass through two ways! But neither of those two does the same job.',
    alt: 'A man in a black polo beside an orange arc and Kurdish text' },
];
REELS.forEach((r) => { r.k = 'reel'; });
// graphic posts by @evolv36t (author checked on each post page). cap = caption as posted; en = their own English caption where they wrote one.
const POSTS = [
  { id: 'DcdIHKZETLo', k: 'post', d: '2026-08-25', l: 15, w: 1080, h: 1350, cap: 'یادی لە دایک بوونی سەروەری مرۆڤایەتی لە هەموو موسوڵمانان پیرۆز بێت', en: 'Greetings to all Muslims on the Prophet’s birthday.',
    alt: 'A greeting poster with the Evolve logo, Arabic calligraphy and a minaret against a navy sky' },
  { id: 'DaBDfUZEVqK', k: 'post', d: '2026-06-25', l: 13, w: 820, h: 1025, cap: 'ناوەڕۆکی بێ پلان ئەو شتەیە کە تۆی خستۆتە دوای ڕکابەرەکانت.', en: 'Content without a plan is what your competitors take advantage of to win.',
    alt: 'A black poster with the Evolve logo, orange boxing gloves and a bottle, under a Kurdish headline' },
  { id: 'DYuqCx2DfMj', k: 'post', d: '2026-05-24', l: 7, w: 820, h: 1025, cap: 'ڕیکلام کردن بە بێ بوونی ستراتیجێکی بەهێزی مارکێتینگ تەنها دەنگێکە بە بێ پەیام', en: 'Advertising without a strong marketing strategy is just noise without a message.',
    alt: 'A billboard on a palm-lined street, split into an orange Marketing area and a white Advertising area, with a Kurdish line under it' },
  { id: 'DUOZKNUFXmE', k: 'post', d: '2026-02-01', l: 17, w: 640, h: 639, cap: 'یەک پەیوەندیمان پێوە بکە و هەموو کاروباری سۆشیاڵ میدیاکەت دەگرینە دەست', en: 'Contact us once and we take over all your social media affairs.',
    alt: 'A dark slide with the Evolve logo and orange speech bubbles that mention Instagram and Facebook' },
];
const byId = Object.fromEntries([...REELS, ...POSTS].map((r) => [r.id, r]));
const TOTAL_VIEWS = REELS.reduce((s, r) => s + r.v, 0); // 46,344

const MONTHS = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ku: ['کانونی دووەم', 'شوبات', 'ئازار', 'نیسان', 'ئایار', 'حوزەیران', 'تەمموز', 'ئاب', 'ئەیلوول', 'تشرینی یەکەم', 'تشرینی دووەم', 'کانونی یەکەم'],
};
const fmtDate = (iso, lang) => { const [y, m, d] = iso.split('-').map(Number); return `${d} ${MONTHS[lang][m - 1]} ${y}`; };
const n = (x) => x.toLocaleString('en-US'); // Arabic numerals 0-9 in both languages

const I = {
  bts: '<path d="M5 4h14l-2 6H7L5 4z"/><path d="M7 10l-3 10M17 10l3 10M8 14h8"/>',
  video: '<rect x="2" y="6" width="14" height="12" rx="2"/><path d="m16 10 6-3v10l-6-3"/>',
  graphics: '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.6 7.6"/><circle cx="11" cy="11" r="2"/>',
  beauty: '<circle cx="12" cy="12" r="9"/><path d="M14.3 8 20 17.9M9.7 8h11.4M7.4 12l5.7-9.9M9.7 16 4 6.1M14.3 16H2.9M16.6 12l-5.7 9.9"/>',
  motion: '<circle cx="12" cy="12" r="9" stroke-dasharray="3 3"/><path d="m10 8 6 4-6 4V8z"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  chat: '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.6A8.5 8.5 0 1 1 21 11.5z"/>',
  insta: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/>',
  strategy: '<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 6-6"/><path d="M16 8h4v4"/>',
};
const svg = (k) => `<svg viewBox="0 0 24 24" aria-hidden="true">${I[k]}</svg>`;
const ARROW = '<svg class="arrow" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

/* ---------------- text, English and Kurdish (Sorani). Instagram's own wording is kept where it exists. ---------------- */
const T = {
  en: {
    lang: 'en', dir: 'ltr', fonts: 'family=Manrope:wght@400..800',
    skip: 'Skip to content', menu: 'Open menu', main: 'Main', themeDark: 'Switch to dark mode', themeLight: 'Switch to light mode',
    nav: { index: 'Home', services: 'Services', work: 'Work', about: 'About', contact: 'Contact' },
    quote: 'Request a quote', waText: 'Hello Evolve 360, I would like a quote for a project.', seeWork: 'See our work',
    title: { index: 'Evolve 360: more reach for your content, more sales for your business', services: 'Services', work: 'Our latest reels', about: 'About', contact: 'Contact' },
    desc: {
      index: 'Evolve 360 helps businesses get their content in front of more people and turn that attention into sales: reels, graphics, motion graphics and photography.',
      services: 'Videography, graphics, motion graphics, beauty shots and behind-the-scenes content from Evolve 360, made to help your brand get seen and sell.',
      work: 'Pictures from the 11 latest Evolve 360 reels, with their dates and captions.',
      about: 'Evolve 360 helps businesses reach more people with their content and make more sales. What we post about, who we publish with, and our numbers on Instagram.',
      contact: 'Call Evolve 360 on +964 (0) 771 339 4545 or +964 (0) 751 404 4568, message us on WhatsApp or follow @evolv36t.',
    },
    eyebrow: 'Marketing & Communications',
    h1: 'Better reach for your content. <span class="grad">Better sales for your business.</span>',
    lead: 'Evolve 360 is a marketing and communications team. We make reels, graphics, motion graphics and photographs that get your brand in front of more people, and we help turn that attention into sales.',
    chips: ['Reach', 'Content', 'Sales'],
    marquee: ['Reels', 'Graphics', 'Motion', 'Beauty Shots', 'BTS', 'Videography', 'Shaping identities, crafting stories'],
    goalsH: 'What Evolve 360 is for',
    goals: [['Reach', 'More people see your content', 'Reels, graphics and motion made to get your brand in front of more people.'],
            ['Sales', 'Attention that turns into sales', 'We follow what we post about: build trust first, then sell.']],
    stepsH: 'How it works', stepsP: 'The same ideas we share in our reels.',
    steps: [['Make content people watch', 'Reels, graphics and motion that hold attention.', 'DfR_v_XDr9h'],
            ['Put your name behind it', 'Your name is the strongest marketing tool you have.', 'DdTtdR3gTgv'],
            ['Build trust before you sell', 'Give value first. The sale comes after.', 'DeHtuPwD-mJ'],
            ['Turn attention into sales', 'Marketing creates the desire. Sales turns it into money.', 'DcgB7W7kqpI']],
    hlH: 'What we make', hlP: 'The five highlights on our Instagram profile, and what each one covers.',
    wallH: 'From our Instagram', wallP: 'Pictures from our reels and posts. Each one opens on Instagram.', moreIg: 'See more on Instagram', views: 'views',
    statsH: 'Evolve 360 on Instagram',
    stats: [[PROFILE.posts, 'posts'], [PROFILE.followers, 'followers'], [REELS.length, 'latest reels shown here'], [TOTAL_VIEWS, 'views across those reels']],
    statsNote: 'Counts as shown on Instagram on 11 November 2026. They change as people watch.',
    topicsH: 'What we talk about',
    topics: [
      ['Trust comes before the sale', 'Selling without trust is a big mistake: give value first, then sell.'],
      ['Your name is a marketing tool', 'Your own name is the strongest and most effective marketing tool a business has.'],
      ['Marketing and sales are different jobs', 'Marketing creates the desire. Sales turns it into money.'],
      ['Do not skip the stages', 'Starting at the end instead of the first two stages is the biggest mistake.'],
    ],
    ctaH: 'Want more reach and more sales?', ctaP: 'The button opens WhatsApp with a message ready to send.',
    svcTitle: 'What we make to help your brand get seen and sell.',
    svcLead: 'First, how we work on strategy and social media. Then the five highlights on our Instagram profile, with work from our feed.',
    svcProof: 'From our reels',
    services: [
      ['bts', 'bts', 'BTS', 'Behind-the-scenes content that shows the work behind your brand.', ['DeXKO2jgPo8', 'DdTtdR3gTgv']],
      ['video', 'videography', 'Videography', 'Reels and videos made to get your brand in front of more people.', ['DeXKO2jgPo8', 'DfmtaeeAJiv', 'DfR_v_XDr9h']],
      ['graphics', 'graphics', 'Graphics', 'Designed cards and graphics for social media, like the quote cards on our reel covers.', ['DcdIHKZETLo', 'Dc8vXetDeMh', 'DcgB7W7kqpI']],
      ['beauty', 'beauty', 'Beauty Shots', 'Close, carefully lit shots of products.', []],
      ['motion', 'motion', 'Motion', 'Motion graphics and animation, such as the 3D clinic in one of our reels.', ['DeHtuPwD-mJ', 'DdEzfDdjyqn']],
    ],
    svcNoneP: 'This one lives in the Instagram highlights.', svcNoneL: 'Open our Instagram profile',
    workTitle: 'Our latest reels.', workLead: 'Pictures from the 11 latest reels on our Instagram, with the date and caption. Tap a picture to see it larger. Captions are translated from Kurdish.',
    withBrwa: 'Our reels are published together with',
    aboutTitle: 'We help businesses get their content seen and make more sales.',
    aboutLead: 'Evolve 360 is a marketing and communications team: shaping identities, crafting stories. Our reels show how we think: build trust first, make your name count, and sell once people trust you.',
    aboutH: 'The profile, in numbers',
    collabH: 'Who we publish with',
    collabP: 'Our reels are published together with @brwa_o_omar on Instagram, and we are tagged on each one.',
    collabL: 'Open @brwa_o_omar',
    hlListH: 'The five highlights',
    contactTitle: 'Talk to Evolve 360.', contactLead: 'Call us, write on WhatsApp, or send the form below and it opens WhatsApp with your message.',
    call: 'Call', whatsapp: 'WhatsApp', instagram: 'Instagram', igSub: 'Reels, highlights and the Contact button', newTab: '(opens in a new tab)', enlarge: 'Enlarge picture:',
    form: { name: 'Your name', service: 'What do you need?', message: 'Tell us about your project', send: 'Send on WhatsApp', greeting: 'Hello Evolve 360,' },
    likes: 'likes', altKuPost: '',
    doH: 'What Evolve 360 does',
    doP: 'Evolve 360 is a marketing and communications team. Our own posts show what we work on: strategy before advertising, content with a plan, and running a business’s social media. Some of our captions come in Kurdish, Arabic and English together.',
    ourPost: 'Our post',
    doCards: [['DYuqCx2DfMj', 'Strategy before advertising', 'Advertising without a strong marketing strategy is just noise without a message.'],
              ['DaBDfUZEVqK', 'Content with a plan', 'Content without a plan is what your competitors take advantage of to win.'],
              ['DUOZKNUFXmE', 'We run your social media', 'Contact us once and we take over all your social media affairs.']],
    whoH: 'Who is behind it',
    whoP: 'Brwa Omer is the Managing Director of Evolve 360, as his Instagram profile says. Our reels are published together with his account.',
    postsH: 'Posts and graphics', postsP: 'Designed posts from our feed. Some of our captions come in Kurdish, Arabic and English together.',
    strategy: ['strategy', 'strategy', 'Marketing strategy and social media', 'Strategy before advertising, content with a plan, and taking over the social media of a business. This is what our own posts talk about.', ['DYuqCx2DfMj', 'DaBDfUZEVqK', 'DUOZKNUFXmE']],
    lede: 'Shaping identities, crafting stories.',
    footPages: 'Pages', footContact: 'Contact', rights: 'Evolve 360', other: 'کوردی', altKu: '',
  },
  ku: {
    lang: 'ckb', dir: 'rtl', fonts: 'family=Manrope:wght@400..800&family=Vazirmatn:wght@400',
    skip: 'بڕۆ بۆ ناوەڕۆک', menu: 'کردنەوەی مێنیو', main: 'ناوبەری سەرەکی', themeDark: 'گۆڕین بۆ دۆخی تاریک', themeLight: 'گۆڕین بۆ دۆخی ڕووناک',
    nav: { index: 'سەرەکی', services: 'خزمەتگوزارییەکان', work: 'کارەکان', about: 'دەربارە', contact: 'پەیوەندی' },
    quote: 'داوای نرخ بکە', waText: 'سڵاو ئیڤۆلڤ 360، دەمەوێت نرخی پرۆژەیەک بزانم.', seeWork: 'کارەکانمان ببینە',
    title: { index: 'ئیڤۆلڤ 360: ناوەڕۆکەکەت بە خەڵکی زیاتر بگات، بزنسەکەت زیاتر بفرۆشێت', services: 'خزمەتگوزارییەکان', work: 'نوێترین ڕیلزەکانمان', about: 'دەربارە', contact: 'پەیوەندی' },
    desc: {
      index: 'ئیڤۆلڤ 360 یارمەتی بزنسەکان دەدات ناوەڕۆکیان بە خەڵکی زیاتر بگات و ئەو سەرنجە ببێت بە فرۆشتن: ڕیلز، گرافیک، مۆشن گرافیک و وێنە.',
      services: 'ڤیدیۆگرافی، گرافیک، مۆشن، Beauty Shots و ناوەڕۆکی پشت پەردە لە ئیڤۆلڤ 360، بۆ ئەوەی بڕاندەکەت ببینرێت و بفرۆشێت.',
      work: 'وێنەی 11 نوێترین ڕیلزی ئیڤۆلڤ 360، لەگەڵ بەروار و کاپشنەکانیان.',
      about: 'ئیڤۆلڤ 360 یارمەتی بزنسەکان دەدات ناوەڕۆکیان بە خەڵکی زیاتر بگات و زیاتر بفرۆشن. باسەکانمان، ئەو کەسەی لەگەڵی بڵاو دەکەینەوە، و ژمارەکانمان لە ئینستاگرام.',
      contact: 'پەیوەندی بە ئیڤۆلڤ 360 بکە: +964 (0) 771 339 4545 یان +964 (0) 751 404 4568، لە واتسئەپ نامە بنێرە یان @evolv36t فۆڵۆ بکە.',
    },
    eyebrow: 'مارکێتینگ و پەیوەندییەکان',
    h1: 'ناوەڕۆکەکەت بە خەڵکی زیاتر بگات. <span class="grad">بزنسەکەت باشتر بفرۆشێت.</span>',
    lead: 'ئیڤۆلڤ 360 تیمێکی مارکێتینگ و پەیوەندییەکانە. ڕیلز، گرافیک، مۆشن گرافیک و وێنە دروست دەکەین کە بڕاندەکەت بە خەڵکی زیاتر نیشان بدات، و یارمەتیت دەدەین ئەو سەرنجە ببێت بە فرۆشتن.',
    chips: ['گەیشتن', 'ناوەڕۆک', 'فرۆشتن'],
    marquee: ['ڕیلز', 'گرافیک', 'مۆشن', 'Beauty Shots', 'BTS', 'ڤیدیۆگرافی', 'ناسنامە دروست دەکەین، چیرۆک دەگێڕینەوە'],
    goalsH: 'ئیڤۆلڤ 360 بۆ چییە',
    goals: [['گەیشتن', 'خەڵکی زیاتر ناوەڕۆکەکەت دەبینن', 'ڕیلز، گرافیک و مۆشن کە بڕاندەکەت بە خەڵکی زیاتر نیشان دەدات.'],
            ['فرۆشتن', 'سەرنج دەبێت بە فرۆشتن', 'ئەوەی باسی دەکەین پەیڕەوی دەکەین: سەرەتا متمانە دروست بکە، دواتر بفرۆشە.']],
    stepsH: 'چۆن کار دەکات', stepsP: 'هەمان بیرۆکەکان کە لە ڕیلزەکانمان باسیان دەکەین.',
    steps: [['ناوەڕۆکێک دروست بکە کە خەڵک سەیری بکەن', 'ڕیلز، گرافیک و مۆشن کە سەرنج ڕابگرن.', 'DfR_v_XDr9h'],
            ['ناوی خۆت لەپشتیەوە دابنێ', 'ناوی خۆت بەهێزترین ئامرازی مارکێتینگە کە هەتە.', 'DdTtdR3gTgv'],
            ['پێش فرۆشتن متمانە دروست بکە', 'سەرەتا بەها ببەخشە. فرۆشتن دواتر دێت.', 'DeHtuPwD-mJ'],
            ['سەرنج بکە بە فرۆشتن', 'مارکێتینگ خواست دروست دەکات. فرۆشتن دەیکات بە پارە.', 'DcgB7W7kqpI']],
    hlH: 'ئەوەی دروستی دەکەین', hlP: 'پێنج هایلایتەکەی پڕۆفایلە ئینستاگرامەکەمان، و ئەوەی هەریەکەیان لەخۆی دەگرێت.',
    wallH: 'لە ئینستاگرامەکەمانەوە', wallP: 'وێنە لە ڕیلز و پۆستەکانمانەوە. هەریەکەیان لە ئینستاگرام دەکرێتەوە.', moreIg: 'زیاتر لە ئینستاگرام ببینە', views: 'بینین',
    statsH: 'ئیڤۆلڤ 360 لە ئینستاگرام',
    stats: [[PROFILE.posts, 'پۆست'], [PROFILE.followers, 'فۆڵۆوەر'], [REELS.length, 'نوێترین ڕیلز لێرە'], [TOTAL_VIEWS, 'بینین بەسەر ئەو ڕیلزانەوە']],
    statsNote: 'ژمارەکان وەک لە ئینستاگرام لە 11ی تشرینی دووەمی 2026 دەرکەوتن. بەپێی بینەران دەگۆڕێن.',
    topicsH: 'باسی چی دەکەین',
    topics: [
      ['متمانە پێش فرۆشتن', 'هەوڵی فرۆشتن بە بێ دروستکردنی متمانە هەڵەیەکی گەورەیە: سەرەتا بەها ببەخشە، دواتر بفرۆشە.'],
      ['ناوی خۆت ئامرازی مارکێتینگە', 'ناوی خۆت بەهێزترین و کاریگەرترین ئامرازی مارکێتینگە کە بزنسەکەت بتوانێت سودی لێ وەربگرێت.'],
      ['مارکێتینگ و فرۆشتن دوو ئیشی جیاوازن', 'مارکێتینگ خواست دروست دەکات. فرۆشتن ئەو خواستە دەکات بە پارە.'],
      ['قۆناغەکان مەپەڕێنە', 'گەورەترین هەڵە ئەوەیە یەکەم دوو قۆناغ بپەڕێنیت و ڕاستەوخۆ لە کۆتاییەوە دەستپێبکەیت.'],
    ],
    ctaH: 'دەتەوێت زیاتر بگەیت بە خەڵک و زیاتر بفرۆشیت؟', ctaP: 'دوگمەکە واتسئەپ دەکاتەوە و نامەیەکی ئامادە دەنێرێت.',
    svcTitle: 'ئەوەی دروستی دەکەین بۆ ئەوەی بڕاندەکەت ببینرێت و بفرۆشێت.',
    svcLead: 'سەرەتا چۆن لەسەر ستراتیژی و سۆشیاڵ میدیا کار دەکەین. دواتر پێنج هایلایتەکەی پڕۆفایلە ئینستاگرامەکەمان، لەگەڵ کار لە فیدەکەمانەوە.',
    svcProof: 'لە ڕیلزەکانمانەوە',
    services: [
      ['bts', 'bts', 'BTS', 'ناوەڕۆکی پشت پەردە کە کارەکەی پشت بڕاندەکەت نیشان دەدات.', ['DeXKO2jgPo8', 'DdTtdR3gTgv']],
      ['video', 'videography', 'ڤیدیۆگرافی', 'ڕیلز و ڤیدیۆ کە بڕاندەکەت بە خەڵکی زیاتر نیشان دەدەن.', ['DeXKO2jgPo8', 'DfmtaeeAJiv', 'DfR_v_XDr9h']],
      ['graphics', 'graphics', 'گرافیک', 'کارت و گرافیکی دیزاینکراو بۆ سۆشیال میدیا، وەک کارتی وتەکان لەسەر کەڤەری ڕیلزەکانمان.', ['DcdIHKZETLo', 'Dc8vXetDeMh', 'DcgB7W7kqpI']],
      ['beauty', 'beauty', 'Beauty Shots', 'دیمەنی نزیک و بە ووردی ڕووناککراو لە بەرهەمەکان.', []],
      ['motion', 'motion', 'مۆشن', 'مۆشن گرافیک و ئانیمەیشن، وەک کلینیکە سێ ڕەهەندییەکە لە یەکێک لە ڕیلزەکانمان.', ['DeHtuPwD-mJ', 'DdEzfDdjyqn']],
    ],
    svcNoneP: 'ئەمە لە هایلایتەکانی ئینستاگرامدایە.', svcNoneL: 'پڕۆفایلی ئینستاگرام بکەرەوە',
    workTitle: 'نوێترین ڕیلزەکانمان.', workLead: 'وێنەی 11 نوێترین ڕیلزی ئینستاگرامەکەمان، لەگەڵ بەروار و کاپشن. لەسەر وێنەیەک کلیک بکە بۆ ئەوەی گەورەتر ببینیت.',
    withBrwa: 'ڕیلزەکانمان بڵاو دەکرێنەوە لەگەڵ',
    aboutTitle: 'یارمەتی بزنسەکان دەدەین ناوەڕۆکیان بە خەڵکی زیاتر بگات و زیاتر بفرۆشن.',
    aboutLead: 'ئیڤۆلڤ 360 تیمێکی مارکێتینگ و پەیوەندییەکانە: ناسنامە دروست دەکەین، چیرۆک دەگێڕینەوە. ڕیلزەکانمان شێوازی بیرکردنەوەمان نیشان دەدەن: سەرەتا متمانە دروست بکە، ناوی خۆت بکە بە بەها، و کاتێک خەڵک متمانەیان پێت هەبوو بفرۆشە.',
    aboutH: 'پڕۆفایلەکە بە ژمارە',
    collabH: 'لەگەڵ کێ بڵاو دەکەینەوە',
    collabP: 'ڕیلزەکانمان لە ئینستاگرام لەگەڵ @brwa_o_omar بڵاو دەکرێنەوە، و ئێمە لەسەر هەموویان تاگ کراوین.',
    collabL: '@brwa_o_omar بکەرەوە',
    hlListH: 'پێنج هایلایتەکە',
    contactTitle: 'قسە لەگەڵ ئیڤۆلڤ 360 بکە.', contactLead: 'پەیوەندیمان پێوە بکە، لە واتسئەپ بنووسە، یان فۆرمەکەی خوارەوە پڕ بکەرەوە و نامەکەت لە واتسئەپ دەکرێتەوە.',
    call: 'پەیوەندی', whatsapp: 'واتسئەپ', instagram: 'ئینستاگرام', igSub: 'ڕیلز، هایلایت و دوگمەی Contact', newTab: '(لە تابێکی نوێدا دەکرێتەوە)', enlarge: 'گەورەکردنی وێنە:',
    form: { name: 'ناوت', service: 'پێویستت بە چییە؟', message: 'دەربارەی پرۆژەکەت پێمان بڵێ', send: 'ناردن لە واتسئەپ', greeting: 'سڵاو ئیڤۆلڤ 360،' },
    likes: 'لایک', altKuPost: 'وێنەی پۆست:',
    doH: 'ئیڤۆلڤ 360 چی دەکات',
    doP: 'ئیڤۆلڤ 360 تیمێکی مارکێتینگ و پەیوەندییەکانە. پۆستەکانی خۆمان ئەوە نیشان دەدەن کە لەسەری کار دەکەین: ستراتیژی پێش ڕیکلام، ناوەڕۆک بە پلان، و بەڕێوەبردنی سۆشیاڵ میدیای بزنسەکان. هەندێک کاپشنمان بە کوردی، عەرەبی و ئینگلیزی پێکەوە نووسراون.',
    ourPost: 'پۆستەکەمان',
    doCards: [['DYuqCx2DfMj', 'ستراتیژی پێش ڕیکلام', 'ڕیکلام کردن بە بێ بوونی ستراتیجێکی بەهێزی مارکێتینگ تەنها دەنگێکە بە بێ پەیام'],
              ['DaBDfUZEVqK', 'ناوەڕۆک بە پلان', 'ناوەڕۆکی بێ پلان ئەو شتەیە کە تۆی خستۆتە دوای ڕکابەرەکانت.'],
              ['DUOZKNUFXmE', 'سۆشیاڵ میدیاکەت ئێمە بەڕێوەی دەبەین', 'یەک پەیوەندیمان پێوە بکە و هەموو کاروباری سۆشیاڵ میدیاکەت دەگرینە دەست']],
    whoH: 'کێ لە پشتیەوەیە',
    whoP: 'Brwa Omer بەڕێوەبەری گشتی (Managing Director)ی ئیڤۆلڤ 360ە، وەک لە پڕۆفایلی ئینستاگرامەکەی نووسراوە. ڕیلزەکانمان لەگەڵ ئەکاونتەکەی بڵاو دەکرێنەوە.',
    postsH: 'پۆست و گرافیک', postsP: 'پۆستی دیزاینکراو لە فیدەکەمانەوە. هەندێک کاپشنمان بە کوردی، عەرەبی و ئینگلیزی پێکەوە نووسراون.',
    strategy: ['strategy', 'strategy', 'ستراتیژی مارکێتینگ و سۆشیاڵ میدیا', 'ستراتیژی پێش ڕیکلام، ناوەڕۆک بە پلان، و بەڕێوەبردنی سۆشیاڵ میدیای بزنسەکان. ئەمە ئەوەیە پۆستەکانی خۆمان باسی دەکەن.', ['DYuqCx2DfMj', 'DaBDfUZEVqK', 'DUOZKNUFXmE']],
    lede: 'ناسنامە دروست دەکەین، چیرۆک دەگێڕینەوە.',
    footPages: 'پەڕەکان', footContact: 'پەیوەندی', rights: 'ئیڤۆلڤ 360', other: 'English', altKu: 'وێنەی سەرەتای ڕیل:',
  },
};

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const igIcon = fs.readFileSync(path.join(ROOT, 'assets/icons/instagram.svg'), 'utf8')
  .replace(/<\?xml[^>]*>/, '').replace(/<svg[^>]*?>/, (m) => m.replace(/ width="\d+"| height="\d+"| role="img"| aria-label="[^"]*"/g, '').replace(/fill="#[0-9A-Fa-f]+"/, 'fill="currentColor"').replace('<svg', '<svg aria-hidden="true" width="18" height="18"')).trim();

/* ---------------- page pieces ---------------- */
const href = (p) => `${p}.html`;
const urlOf = (r) => (r.k === 'post' ? `https://www.instagram.com/p/${r.id}/` : `https://www.instagram.com/reel/${r.id}/`);
const src = (r, c) => `${c.base}assets/img/${r.k === 'post' ? 'posts' : 'work'}/${r.id}.jpg`;
const altOf = (r, t) => (t.lang === 'en' ? r.alt : `${r.k === 'post' ? t.altKuPost : t.altKu} ${r.cap.slice(0, 60)}`);
const capOf = (r, t) => (t.lang === 'en' ? r.en : r.cap);
const dim = (r) => (r.k === 'post' ? [r.w, r.h] : [360, 640]);
const sr = (t) => `<span class="sr-only"> ${t.newTab}</span>`;
const count = (r, t) => (r.k === 'post' ? `${n(r.l)} ${t.likes}` : `${n(r.v)} ${t.views}`);
const dateOf = (r, t) => fmtDate(r.d, t.lang === 'en' ? 'en' : 'ku');
// every picture links to its real Instagram post and opens in a new tab
const pic = (r, t, c, cls = 'shot') => { const [w, h] = dim(r); return `<a class="${cls}" href="${urlOf(r)}" target="_blank" rel="noopener noreferrer"><img src="${src(r, c)}" alt="${esc(altOf(r, t))}" width="${w}" height="${h}" loading="lazy" decoding="async">${sr(t)}</a>`; };
const shotCard = (r, t, c) => `<figure class="shotcard">${pic(r, t, c)}<figcaption><b>${dateOf(r, t)} <span class="muted" style="font-weight:400">· <span class="ltr">${count(r, t).split(' ')[0]}</span> ${count(r, t).split(' ').slice(1).join(' ')}</span></b><span class="cap"${t.lang === 'en' ? '' : ' lang="ckb"'}>${esc(capOf(r, t))}</span></figcaption></figure>`;
const WALL_IDS = ['DfmtaeeAJiv', 'DaBDfUZEVqK', 'DfR_v_XDr9h', 'DeXKO2jgPo8', 'DYuqCx2DfMj', 'DeHtuPwD-mJ', 'DdTtdR3gTgv', 'DcdIHKZETLo', 'DdEzfDdjyqn', 'Dc8vXetDeMh', 'DUOZKNUFXmE', 'DcyKJeGCaI8', 'DcqozmjkS6k', 'DcgB7W7kqpI', 'DcYreNSmZ9N'];
const wall = (t, c) => {
  const item = (id, dup) => { const r = byId[id]; const [w, h] = dim(r);
    return `<a href="${urlOf(r)}" target="_blank" rel="noopener noreferrer"${dup ? ' tabindex="-1" aria-hidden="true"' : ''}><img src="${src(r, c)}" alt="${dup ? '' : esc(altOf(r, t))}" width="${w}" height="${h}" loading="lazy" decoding="async">${dup ? '' : sr(t)}</a>`; };
  return `<div class="wall"><div class="wall__track">${WALL_IDS.map((id) => item(id, false)).join('')}${WALL_IDS.map((id) => item(id, true)).join('')}</div></div>`;
};
const igLink = (t) => `<a class="link" href="${IG}" target="_blank" rel="noopener noreferrer">${t.moreIg}${ARROW}${sr(t)}</a>`;

function layout(t, page, body, c) {
  const L = c.lang;
  const links = PAGES.map((p) => `<a href="${href(p)}"${p === page ? ' aria-current="page"' : ''}>${t.nav[p]}</a>`).join('');
  const title = page === 'index' ? t.title.index : `${t.title[page]} | ${t.lang === 'en' ? 'Evolve 360' : 'ئیڤۆلڤ 360'}`;
  const otherHref = (L === 'en' ? 'ku/' : '../') + href(page);
  const enHref = L === 'en' ? href(page) : '../' + href(page);
  const kuHref = L === 'en' ? 'ku/' + href(page) : href(page);
  const ld = page === 'index' ? `\n<script type="application/ld+json">${JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Organization', name: 'Evolve 360', slogan: 'Shaping identities, crafting stories',
    sameAs: [IG], contactPoint: PHONE.map(([, tel]) => ({ '@type': 'ContactPoint', telephone: tel, contactType: 'customer service' })),
  })}</script>` : '';
  const init = `<script>(function(){var t=null;try{t=localStorage.getItem('evolve-theme')}catch(e){}if(!t)t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';document.documentElement.dataset.theme=t})()</script>`;
  return `<!doctype html>
<html lang="${t.lang}" dir="${t.dir}" data-theme="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(t.desc[page])}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Evolve 360">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(t.desc[page])}">
<meta name="twitter:card" content="summary">
<meta name="theme-color" content="#eceff4">
<link rel="icon" href="${c.base}assets/logo.svg" type="image/svg+xml">
<link rel="alternate" hreflang="en" href="${enHref}">
<link rel="alternate" hreflang="ku" href="${kuHref}">
<!-- <link rel="canonical" href="https://[the client's domain]/${page === 'index' ? '' : href(page)}"> : add once the domain is known -->${ld}
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?${t.fonts}&display=swap" rel="stylesheet">
${init}
<link rel="stylesheet" href="${c.enh}site.css">
<link rel="stylesheet" href="${c.enh}round2.css">
<link rel="stylesheet" href="${c.enh}round3.css">
</head>
<body>
<a class="skip" href="#main">${t.skip}</a>
<div class="scroll-progress" aria-hidden="true"></div>
<header class="site-header">
  <div class="wrap nav">
    <a class="brand" href="index.html"><img src="${c.base}assets/logo.svg" alt="" width="30" height="30">Evolve 360</a>
    <nav class="nav-links" id="nav-links" aria-label="${t.main}">${links}</nav>
    <a class="lang" href="${otherHref}" hreflang="${L === 'en' ? 'ku' : 'en'}" lang="${L === 'en' ? 'ckb' : 'en'}">${t.other}</a>
    <button class="theme-toggle" type="button" aria-pressed="false" aria-label="${t.themeDark}" data-to-dark="${t.themeDark}" data-to-light="${t.themeLight}"><svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg><svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></button>
    <a class="btn btn--primary" href="${c.wa}">${t.quote}</a>
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="${t.menu}"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  </div>
</header>
<main id="main">
${body}
</main>
<footer>
  <div class="wrap">
    <div class="foot">
      <div><a class="brand" href="index.html"><img src="${c.base}assets/logo.svg" alt="" width="30" height="30">Evolve 360</a><p>${t.lede}</p></div>
      <div><h2>${t.footPages}</h2><ul>${PAGES.map((p) => `<li><a href="${href(p)}">${t.nav[p]}</a></li>`).join('')}</ul></div>
      <div><h2>${t.footContact}</h2><ul>${PHONE.map(([d, tel]) => `<li><a class="ltr" href="tel:${tel}">${d}</a></li>`).join('')}<li><a href="${WA}">${t.whatsapp}</a></li></ul></div>
      <div><h2>${t.instagram}</h2><a class="social" href="${IG}" target="_blank" rel="noopener noreferrer" aria-label="${t.instagram} @evolv36t ${t.newTab}">${igIcon}</a></div>
    </div>
    <div class="copy"><span>&copy; ${new Date().getFullYear()} ${t.rights}</span><span class="ltr">@evolv36t</span></div>
  </div>
</footer>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js"></script>
<script src="${c.enh}site.js"></script>
<script type="module" src="${c.enh}hero3d.js"></script>
</body>
</html>
`;
}

const cta = (t, c) => `<section><div class="wrap"><div class="cta"><div><h2>${t.ctaH}</h2><p style="margin-top:12px;opacity:.75">${t.ctaP}</p></div><a class="btn btn--primary" href="${c.wa}">${t.quote}${ARROW}</a></div></div></section>`;
const hero3d = (t, h1, lead, actions, page, extra = '') => `<section class="hero${page ? ' hero--page' : ''}" aria-labelledby="h1">
  <canvas class="hero3d" aria-hidden="true"></canvas>
  <div class="wrap">
    <p class="eyebrow">${t.eyebrow}</p>
    <h1 id="h1">${h1}</h1>
    <p class="lead">${lead}</p>${actions}${extra}
  </div>
</section>`;
const stats = (t) => `<div class="stats">${t.stats.map(([v, l]) => `<div class="stat"><b data-count="${v}">${n(v)}</b><span>${l}</span></div>`).join('')}</div><p class="fine">${t.statsNote}</p>`;
const hlRow = (t) => `<ul class="hl-row">${t.services.map(([ic, id, name]) => `<li><a class="hl" href="services.html#${id}"><span class="hl__ring"><span class="hl__in">${svg(ic)}</span></span><span>${name}</span></a></li>`).join('')}</ul>`;
const TOPIC_IDS = ['DeHtuPwD-mJ', 'DdTtdR3gTgv', 'DcgB7W7kqpI', 'DcyKJeGCaI8'];
const GOAL_IDS = ['DdTtdR3gTgv', 'DcgB7W7kqpI'];
const topics = (t, c) => `<div class="grid3">${t.topics.map(([h, p], i) => `<div class="card card--pic hov">${pic(byId[TOPIC_IDS[i]], t, c)}<div class="card__body"><span class="num">0${i + 1}</span><h3>${h}</h3><p>${p}</p></div></div>`).join('')}</div>`;
const who = (t, c) => `<div class="who"><div><h2>${t.whoH}</h2><p>${t.whoP}</p><p><a class="link" href="${COLLAB}" target="_blank" rel="noopener noreferrer">${t.collabL}${ARROW}${sr(t)}</a></p></div><div class="who__pics">${['DfmtaeeAJiv', 'DfR_v_XDr9h', 'DeXKO2jgPo8'].map((id) => pic(byId[id], t, c)).join('')}</div></div>`;
const doCards = (t, c) => `<div class="do-grid">${t.doCards.map(([id, h, p]) => { const r = byId[id]; return `<article class="postcard">${pic(r, t, c)}<small>${t.ourPost} · ${dateOf(r, t)}</small><h3>${h}</h3><p>${p}</p></article>`; }).join('')}</div>`;
const svcBlock = (t, c, [ic, id, name, desc, proofs]) => `<article class="svc" id="${id}">
      <div><span class="svc__icon">${svg(ic)}</span><h2>${name}</h2><p>${desc}</p></div>
      ${proofs.length ? `<div><p class="muted" style="margin-bottom:12px">${t.svcProof}</p><div class="svc__proof">${proofs.map((pid) => pic(byId[pid], t, c)).join('')}</div></div>`
      : `<div class="svc__none beauty-tile"><span class="svc__icon">${svg(ic)}</span><p style="margin:0">${t.svcNoneP}</p><p style="margin:0"><a class="link" href="${IG}" target="_blank" rel="noopener noreferrer">${t.svcNoneL}${ARROW}${sr(t)}</a></p></div>`}
    </article>`;

const BODY = {
  index: (t, c) => `${hero3d(t, t.h1, t.lead, `
    <div class="actions"><a class="btn btn--primary" href="${c.wa}">${t.quote}${ARROW}</a><a class="btn btn--ghost" href="work.html">${t.seeWork}</a></div>`, false,
    `\n    <div class="chips" aria-hidden="true">${t.chips.map((x) => `<span class="chip">${x}</span>`).join('')}</div>`)}
<div class="marquee" aria-hidden="true"><div class="marquee__track">${[...t.marquee, ...t.marquee].map((m) => `<span>${m}</span>`).join('')}</div></div>
<section id="what-we-do">
  <div class="wrap">
    <div class="head" style="display:block"><h2>${t.doH}</h2><p class="do-intro">${t.doP}</p></div>
    ${doCards(t, c)}
  </div>
</section>
<section class="alt">
  <div class="wrap">
    <div class="head"><h2>${t.goalsH}</h2></div>
    <div class="goals">${t.goals.map(([big, h, p], i) => { const r = byId[GOAL_IDS[i]]; return `<div class="goal"><span class="goal__big" aria-hidden="true">${big}</span><div class="goal__txt"><h3>${h}</h3><p>${p}</p><span class="goal__meta">${count(r, t)}</span></div><div class="goal__pic">${pic(r, t, c)}</div></div>`; }).join('')}</div>
  </div>
</section>
<section>
  <div class="wrap">
    <div class="head"><div><h2>${t.stepsH}</h2><p>${t.stepsP}</p></div></div>
    <div class="steps">${t.steps.map(([h, p, id], i) => { const r = byId[id]; return `<div class="step"><div class="step__top"><span>0${i + 1}</span><span class="step__line"></span></div>${pic(r, t, c, 'shot step__img')}<h3>${h}</h3><p>${p}</p></div>`; }).join('')}</div>
  </div>
</section>
<section class="alt">
  <div class="wrap">
    <div class="head"><div><h2>${t.hlH}</h2><p>${t.hlP}</p></div><a class="link" href="services.html">${t.nav.services}${ARROW}</a></div>
    ${hlRow(t)}
  </div>
</section>
<section style="overflow:hidden">
  <div class="wrap"><div class="head"><div><h2>${t.wallH}</h2><p>${t.wallP}</p></div>${igLink(t)}</div></div>
  ${wall(t, c)}
</section>
<section class="alt">
  <div class="wrap">
    <div class="head"><h2>${t.statsH}</h2></div>
    ${stats(t)}
  </div>
</section>
<section>
  <div class="wrap">${who(t, c)}</div>
</section>
${cta(t, c)}`,

  services: (t, c) => `${hero3d(t, t.svcTitle, t.svcLead, '', true)}
<section style="padding-top:8px">
  <div class="wrap">
    ${[t.strategy, ...t.services].map((s) => svcBlock(t, c, s)).join('\n')}
  </div>
</section>
${cta(t, c)}`,

  work: (t, c) => `${hero3d(t, t.workTitle, t.workLead, `
    <div class="actions">${igLink(t)}</div>`, true)}
<section style="padding-top:8px">
  <div class="wrap">
    <h2 class="sr-only">${t.workTitle}</h2>
    <div class="gallery">${REELS.map((r) => shotCard(r, t, c)).join('\n')}</div>
  </div>
</section>
<section class="alt">
  <div class="wrap">
    <div class="head"><div><h2>${t.postsH}</h2><p>${t.postsP}</p></div></div>
    <div class="gallery">${POSTS.map((r) => shotCard(r, t, c)).join('\n')}</div>
    <p class="fine">${t.withBrwa} <a class="link" href="${COLLAB}" target="_blank" rel="noopener noreferrer"><span class="ltr">@brwa_o_omar</span>${sr(t)}</a>. ${t.statsNote}</p>
  </div>
</section>
${cta(t, c)}`,

  about: (t, c) => `${hero3d(t, t.aboutTitle, t.aboutLead, '', true)}
<section style="padding-top:8px">
  <div class="wrap">
    <div class="head" style="display:block"><h2>${t.doH}</h2><p class="do-intro">${t.doP}</p></div>
    ${doCards(t, c)}
  </div>
</section>
<section class="alt">
  <div class="wrap">
    <div class="head"><h2>${t.topicsH}</h2></div>
    ${topics(t, c)}
  </div>
</section>
<section>
  <div class="wrap">
    <div class="head"><h2>${t.aboutH}</h2></div>
    ${stats(t)}
  </div>
</section>
<section class="alt">
  <div class="wrap">
    <div class="head"><div><h2>${t.hlListH}</h2><p>${t.hlP}</p></div></div>
    ${hlRow(t)}
  </div>
</section>
<section>
  <div class="wrap">${who(t, c)}</div>
</section>
${cta(t, c)}`,

  contact: (t, c) => `${hero3d(t, t.contactTitle, t.contactLead, '', true)}
<section style="padding-top:8px">
  <div class="wrap contact">
    <div>
    <ul class="contact-list">
      ${PHONE.map(([d, tel]) => `<li><a href="tel:${tel}"><span class="svc__icon">${svg('phone')}</span><span><strong>${t.call}</strong><small class="ltr">${d}</small></span></a></li>`).join('\n      ')}
      <li><a href="${WA}" target="_blank" rel="noopener noreferrer"><span class="svc__icon">${svg('chat')}</span><span><strong>${t.whatsapp}</strong><small class="ltr">${PHONE[0][0]}</small>${sr(t)}</span></a></li>
      <li><a href="${IG}" target="_blank" rel="noopener noreferrer"><span class="svc__icon">${svg('insta')}</span><span><strong>${t.instagram}</strong><small>${t.igSub}</small>${sr(t)}</span></a></li>
    </ul>
    <div class="contact-pic" style="margin-top:24px">${pic(byId.DaBDfUZEVqK, t, c)}</div>
    </div>
    <form id="contact-form" class="card" data-greeting="${esc(t.form.greeting)}" data-wa="${WA}">
      <label>${t.form.name}<input name="name" required maxlength="100" autocomplete="name"></label>
      <label>${t.form.service}<select name="service">${[t.strategy, ...t.services].map(([, , name]) => `<option>${name}</option>`).join('')}</select></label>
      <label>${t.form.message}<textarea name="message" required maxlength="1000"></textarea></label>
      <button class="btn btn--primary" type="submit">${t.form.send}${ARROW}${sr(t)}</button>
    </form>
  </div>
</section>`,
};

/* ---------------- write ---------------- */
const apply = has('--apply');
const outRoot = apply ? ROOT : path.join(__dirname, 'site');
if (apply) {
  // save the current live site first so --revert can bring it back
  fs.rmSync(BACK, { recursive: true, force: true });
  for (const f of LIVE_FILES) if (fs.existsSync(path.join(ROOT, f))) copy(path.join(ROOT, f), path.join(BACK, f));
  if (fs.existsSync(path.join(ROOT, 'assets', 'enhance'))) copyDir(path.join(ROOT, 'assets', 'enhance'), path.join(BACK, 'enhance'));
  copyDir(path.join(__dirname, 'enhance'), path.join(ROOT, 'assets', 'enhance'));
}
for (const key of ['en', 'ku']) {
  const t = T[key];
  const sub = key === 'en' ? '' : 'ku';
  const up = apply ? (key === 'en' ? '' : '../') : (key === 'en' ? '../../' : '../../../');
  const enh = apply ? (key === 'en' ? 'assets/enhance/' : '../assets/enhance/') : (key === 'en' ? '../enhance/' : '../../enhance/');
  const c = { lang: key, base: up, enh, wa: `${WA}?text=${encodeURIComponent(t.waText)}` };
  fs.mkdirSync(path.join(outRoot, sub), { recursive: true });
  for (const p of PAGES) {
    const html = layout(t, p, BODY[p](t, c), c);
    if (/\bundefined\b/.test(html)) throw new Error(`"undefined" in ${key}/${p}`);
    fs.writeFileSync(path.join(outRoot, sub, href(p)), html);
  }
}
console.log(apply ? 'KEPT: the live site now uses the new design. Undo: node preview/build.js --revert'
  : 'Preview built. Open http://localhost:5180/preview/site/index.html  and  /preview/site/ku/index.html');
