import fs from "fs";
import path from "path";

const htmlPath = path.join(process.cwd(), "build", "client", "index.html");

if (!fs.existsSync(htmlPath)) {
	console.log("⚠ SSR mode detected: index.html not found, skipping meta tag injection");
	process.exit(0);
}

const html = fs.readFileSync(htmlPath, "utf-8");

const metaTags = `<meta property="og:locale" content="en" />
<meta property="og:title" content="Vibe Composer | Live Coding Meets Vibe Coding" />
<meta property="og:type" content="website" />
<meta property="og:description" content="Live Coding meets Vibe Coding. Create stunning music with Vibe Composer - AI-powered composition, algorithmic production, and intelligent sound design for creative musicians and developers." />
<meta property="og:image" content="https://vibecomposer.studio/vibe.png" />
<meta property="og:logo" content="https://vibecomposer.studio/vibe-composer.png" />
<meta property="og:url" content="https://vibecomposer.studio" />
<meta property="og:site_name" content="Vibe Composer - AI Music Creation" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@vibecomposer" />
<meta name="twitter:creator" content="@ArjunRajJain" />
<meta name="twitter:title" content="Vibe Composer | AI Music Creation Platform" />
<meta name="twitter:description" content="Code your beats. Compose with AI. Live Coding meets Vibe Coding. Transform musical ideas into reality." />
<meta name="twitter:image" content="https://vibecomposer.studio/vibe.png" />
<meta name="twitter:image:alt" content="Vibe Composer - Where Live Coding meets Vibe Coding. AI-powered music composition and algorithmic production platform" />`;

const updatedHtml = html.replace(
	"<title>Loading...</title>",
	`<title>Vibe Composer | AI Music Creation</title>\n${metaTags}`
);

fs.writeFileSync(htmlPath, updatedHtml);
console.log("✓ Meta tags injected into index.html");
