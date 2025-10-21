# VibeComposer License Compliance

This document outlines how VibeComposer complies with the AGPL-3.0 license requirements of Strudel and other dependencies.

## Overview

VibeComposer is licensed under **GNU Affero General Public License v3.0 (AGPL-3.0)** to respect Strudel's free/open-source license requirements.

## Strudel Integration

### How Strudel is Used

VibeComposer integrates Strudel in a **non-derivative way** that respects AGPL-3.0:

1. **CDN-Based Embedding** — Strudel REPL is loaded from `strudel.cc` via iframe
   - File: `/public/strudel-embed.js`
   - No Strudel source code is bundled or modified
   - The iframe URL: `https://strudel.cc/#${encodeURIComponent(btoa(code))}`

2. **Code Pass-Through** — VibeComposer generates Strudel code but does not modify Strudel itself
   - AI generates patterns compatible with Strudel syntax
   - Code is sent to Strudel REPL unchanged
   - Files: `/app/hooks/useSendChatMessage.ts`, `/app/prompts/strudel-system-prompt.ts`

3. **No Bundling of Strudel** — Unlike npm package integration, Strudel is served from its official website
   - This allows users to always access the latest Strudel features
   - Respects Strudel's development and updates
   - File: `/app/components/StrudelRepl.tsx`

### Compliance with AGPL-3.0 Obligations

✅ **Source Code Distribution**
- All VibeComposer source code is available on GitHub
- No proprietary modifications to Strudel are included
- Users receive full source access

✅ **License Disclosure**
- LICENSE file included with this project
- README.md clearly states AGPL-3.0 license
- Strudel attribution included in documentation

✅ **Derivative Work Licensing**
- Any modifications to VibeComposer must be distributed under AGPL-3.0
- This project is licensed under the same license as Strudel

✅ **Source Code with Web Publication**
- If deployed online, source code is available via GitHub
- Users can view, modify, and redistribute the complete application

## Third-Party Dependencies

All dependencies in `package.json` are compatible with AGPL-3.0:

| Dependency | License | Status |
|-----------|---------|--------|
| @anthropic-ai/sdk | MIT | ✅ Compatible |
| react | MIT | ✅ Compatible |
| react-dom | MIT | ✅ Compatible |
| react-router | MIT | ✅ Compatible |
| zustand | MIT | ✅ Compatible |
| tailwindcss | MIT | ✅ Compatible |
| typescript | Apache 2.0 | ✅ Compatible |

## Files Related to Strudel Integration

- `/app/components/StrudelRepl.tsx` — React component embedding Strudel REPL
- `/public/strudel-embed.js` — Custom HTML element for Strudel embedding
- `/app/utils/strudel-utils.ts` — Utility functions for code management
- `/app/prompts/strudel-system-prompt.ts` — System prompt for AI code generation

## Important Notes

### Distribution Requirements

If you distribute VibeComposer (as a web service or otherwise):

1. **Include Source Code** — Provide access to all source code
2. **Include License** — Distribute this LICENSE file and AGPL-3.0 text
3. **Document Changes** — Track and document any modifications
4. **Use Compatible License** — License any derivatives under AGPL-3.0 (or later)

### For Web Deployment

When deployed as a web application, users have the right to:
- Request and receive the complete source code
- Modify and redistribute the application
- Re-deploy modified versions (under AGPL-3.0)

## Strudel License Information

**Project:** [Strudel](https://strudel.cc)  
**License:** GNU Affero General Public License v3.0  
**Repository:** [tidalcycles/Strudel](https://github.com/tidalcycles/Strudel)  
**License Text:** https://github.com/tidalcycles/Strudel/blob/main/LICENSE

## Questions?

For questions about licensing and compliance:
- See the [LICENSE](./LICENSE) file
- Review [GNU AGPL v3.0](https://www.gnu.org/licenses/agpl-3.0.html)
- Visit [Strudel's License Info](https://strudel.cc/learn/license-info/)
