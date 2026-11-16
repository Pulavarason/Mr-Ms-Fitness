# MR & MRS Unisex Fitness Studio

Next.js (App Router) + TypeScript + Tailwind v4, GSAP/ScrollTrigger, Framer Motion, Lenis, Lucide.
Fonts: Space Grotesk and Inter (self-hosted via Fontsource, no network needed at build).

## Run locally
```bash
npm install
npm run dev            # http://localhost:3000
npm run build && npm start
```

## Edit content (all in `src/config`)
| File | What it controls |
| --- | --- |
| `site.ts` | Phone, WhatsApp (digits with country code), email, address, hours, social links, exact Google Maps URL, public site URL |
| `content.ts` | Headlines, hero sample stats, features, programs, membership plans and prices |
| `images.ts` | Every photo. Drop files in `public/images` and change the paths |

Nothing unknown is invented. Empty plan prices show "Price on request". Until a WhatsApp number is set, "Join now" scrolls to the contact section and the enquiry form shows a notice. Once set, they open WhatsApp with a prefilled message. Phone, hours and social rows appear in Contact and Footer only when filled in.

## Hero athlete
`public/images/runner.jpg` is shown through a screen blend, a red colour grade and a soft mask so it merges into the page. Replace it with a licensed photo on a dark background for best results. The red trails, floating stat cards and loader are code, not part of the image.

## Deploy to Vercel
1. Push the project to a GitHub repo (`git init && git add . && git commit -m "MR & MRS site"` then push).
2. Go to vercel.com, choose **Add New > Project** and import the repo. Framework is detected as Next.js. No environment variables are needed.
3. Click **Deploy**. Add the studio's domain under **Settings > Domains** when ready.
4. Set `url` in `src/config/site.ts` to the final domain and redeploy so link previews and SEO use it.

CLI alternative: `npm i -g vercel && vercel --prod`.
