# TODO — đồng bộ Pantheus Landing với design system canon

Cập nhật 2026-10-10. Bản trước viết trước đợt redesign landing (commit `5b4bcc4`, 2026-10-09) nên phần lớn file:line cũ đã chết; bản này rà lại toàn bộ trên code hiện tại.

**Canon** là repo `/home/lesky/Code/Pantheus/Pantheus UI`: `DESIGN_SYSTEM.md` (v3), `src/tokens/tokens.css`, `src/styles/globals.css`, `src/components/{core,app,marketing,marks}`. Quy tắc vẫn giữ: token và anatomy dùng chung không được lệch khỏi canon; muốn đổi thì đổi canon trước, rồi mới sửa repo này.

**Hai repo anh em đã làm xong phần của họ**, dùng làm mẫu khi sửa Landing:

- **Pantheus Office** (`packages/ui/src/tokens.css`) khớp canon từng mã hex, kể cả hai giá trị canon đang treo chưa commit (xem mục 0.1). Badge dùng sans 10/600 uppercase tracking 0.05em có viền; focus dùng `focus-visible:border-ring ring-3 ring-accent-wash`.
- **Victoria** (`/home/lesky/Code/Victoria`) migrate xong ngày 2026-08-13 (commit `f153be9`, v0.16.0): Manrope và JetBrains Mono qua `next/font`, biến `--font-manrope` / `--font-jetbrains-mono`, eyebrow sans 600 uppercase màu ink-soft. Gotcha họ gặp: preflight `button { text-transform: none }` chặn kế thừa uppercase, nên class `uppercase` phải đặt ngay trên `<button>`, không đặt ở wrapper.

Landing là repo cuối cùng còn lệch. Thứ tự làm: mục 0 (canon) trước, rồi mục 1 (bắt buộc), các mục còn lại làm khi tiện.

---

## 0. Việc phía canon — làm trước, trong repo Pantheus UI

- [ ] **0.1 Commit hai thay đổi token đang treo.** Canon có diff chưa commit: thêm token `--highlight` (light `#ecebe6`, dark `#202025`) và đổi dark `--accent-wash` từ `#2b1d19` sang `#432d27` (DESIGN_SYSTEM.md §3.1, §3.2, §7). Office đã dùng hai giá trị này; nếu diff bị mất thì Office thành bên lệch.

- [ ] **0.2 Sửa §2 và §9.4: danh sách component marketing đã chết.** Canon vẫn liệt kê HeroText, CTA, Reveal, BlueprintCar, aura/Grain/LitGridAura/Vignette và các section Hero/Problem/Pillars/Process/Audience — Landing đã xoá hết trong redesign. Mô tả CTA "fill accent" cũng không khớp `.btn-solid` hiện tại (nền ink). Cách sửa phụ thuộc quyết định D1 bên dưới.

- [ ] **0.3 Bỏ hoặc đánh dấu `.aura-grid` / `.aura-sweep` / `@keyframes aura-drift` trong canon `globals.css`.** Landing không còn dùng; Landing cũng không còn consumer của token `--grid` mà chuyển sang `--gridline` tính bằng `color-mix`. Hoặc xoá khỏi canon, hoặc ghi rõ là di sản.

- [ ] **0.4 Chốt màu `.type-eyebrow`.** Canon tự mâu thuẫn: §4 và `globals.css` ghi muted-ink, §3.1 ghi ink-soft. §9.3 nói "AA thắng", và cả Victoria lẫn Landing đều đang dùng ink-soft. Đề xuất chốt ink-soft và sửa §4 cùng `globals.css` theo.

- [ ] **0.5 `.type-display` lệch giữa bảng và code.** Bảng §4 ghi 44/48, code là `clamp(2.4rem, 6.2vw, 5rem)`. Sửa một bên cho khớp (liên quan D2).

- [ ] **0.6 Cập nhật `docs/todos/README.md`.** File vẫn liệt kê Victoria và Office là việc mở; cả hai đã xong. Nên thay bằng một dòng trỏ sang file này cho phần Landing.

---

## 1. Bắt buộc — Landing

- [ ] **1.1 Geist Mono sang JetBrains Mono.**
  - `src/app/[locale]/layout.tsx` dòng 1, 16–18, 45: đổi `Geist_Mono` thành `JetBrains_Mono`, biến `--font-geist-mono` thành `--font-jetbrains-mono`, subsets `["latin", "latin-ext", "vietnamese"]` (hiện chỉ có `latin`, thiếu dấu tiếng Việt).
  - `src/app/globals.css:57`: `--font-mono: var(--font-geist-mono)` phải đổi cùng lúc, nếu không `font-mono` rơi về fallback mà không báo lỗi.
  - Mới so với bản cũ: khoảng 20 rule trong `globals.css` gọi thẳng `var(--font-geist-mono)` thay vì `var(--font-mono)` (dòng 223, 321, 504, 684, 708, 740, 786, 806, 815, 842, 930, 940, 945, 959, 1112, 1125, 1239, 1292, 1357, 1388, 1466). Đổi hết sang `var(--font-mono)` để lần sau chỉ phải sửa một chỗ. Nhiều rule trong số này còn chuyển sang sans ở mục 1.2, nên làm hai mục cùng một lượt.

- [ ] **1.2 Doctrine "mono chỉ dành cho dữ liệu".** Canon: nhãn và eyebrow là sans 11/600 uppercase tracking +0.05em, màu ink-soft (theo 0.4); mono chỉ cho mã, số liệu, phím tắt, thời gian. Redesign đã rải nhãn mono rộng hơn trước rất nhiều.
  - Nguồn chính: `src/components/Eyebrow.tsx:12` dùng `mono eyebrow`, được dùng ở 6 chỗ — sửa một chỗ này là phủ được phần lớn.
  - **Chuyển sang sans (TSX):** `sections/Nav.tsx:41`; `sections/Footer.tsx:12, 14, 17, 22, 29`; `home/Approach.tsx:65, 76`; `home/ProductShowcase.tsx:129` (ví dụ "Sheet 02 · Cho đội văn phòng"); `home/AskDemo.tsx:45` (trường `x.p`, ví dụ "Production · Kế hoạch"), 53, 54; `home/ProductSheets.tsx:98, 118`; `[locale]/office/page.tsx:89` (khoá của stat) và 95 (đây là một câu văn đầy đủ, càng không nên mono); `[locale]/production/page.tsx:90`; `sections/ProductHero.tsx:37` (`<dt>`).
  - **Hỗn hợp — bộ đếm giữ mono, phần chữ chuyển sans:** `home/Approach.tsx:108` ("Fig."), `tour/Tour.tsx:225, 276, 299`.
  - **Giữ mono (đúng doctrine):** `home/Approach.tsx:49, 58` (bộ đếm), `sections/Cards.tsx:21`, `[locale]/page.tsx:162`, `home/AskDemo.tsx:83` (ký hiệu ↵), `LanguageSwitcher.tsx:16` (mã EN/VI).
  - **Rule CSS chuyển sans:** `.tblock` 312 (khoá sans, giá trị giữ mono), `.ptx-a` 503, `.app-gl` 784, `.app-i em` 805 ("sắp có"), `.app-pw` 811, `.th .td` 929, `.chip` 952, `.w-ta` 1238, `.tag` 1353, `.spec dt` 1386.
  - **Rule CSS hỗn hợp:** `.route span` 703, `.ans li b` 1110, `.refs span` 1122 (tên chuyển sans, mã như `DMH-2610-0045` giữ mono), `.tab .n` 1465.
  - **Rule CSS giữ mono:** `.shipped time`, `.due`, `.kbd`, `.code`, `.num`, `.mk`.
  - `.tag` là nhãn trạng thái: ngoài font, nên theo anatomy StatusBadge của canon (bộ token `-bg` / `-border` / `-text`) thay vì viền `color-mix` alpha như hiện tại.
  - Lý do không chỉ là thẩm mỹ: các mock màn hình trong tour đang vẽ sản phẩm khác với sản phẩm thật — Office và Victoria đã dùng header bảng và badge sans.
  - Gotcha: tracking giảm từ khoảng 0.14em xuống 0.05em làm nhãn hẹp lại; soát lại bằng mắt hero, nav, tour, footer sau khi đổi. Nhãn nằm trong `<button>` cần `uppercase` đặt ngay trên button (gotcha của Victoria ở trên).

- [ ] **1.3 Đồng bộ token với canon (`src/app/globals.css`).**
  - Dark `--accent-wash` sang `#432d27` (sau khi làm 0.1). Consumer duy nhất là `.q[aria-pressed="true"] .mono` (dòng 1043), đang dùng wash làm **màu chữ** trên nền ink. Độ tương phản vẫn khoảng 10:1 nên không vỡ, nhưng sai vai trò token — wash là màu nền. Nên đổi sang token chữ phù hợp khi sửa.
  - Thêm `--highlight` (light `#ecebe6`, dark `#202025`).
  - Thêm `--overlay` theo canon và thay `bg-black/10` ở `src/components/ui/sheet.tsx:40`.
  - Đổi tên semantic `--success` thành `--success-base` (cùng họ `-base`/`-bg`/`-border`/`-text` của canon). Consumer: `globals.css:900`.
  - Radius ladder: Landing dùng `calc(var(--radius) * …)` ra 2.4/3.2/4/5.6px (dòng 79–82), canon là 2/4/6/10. Code riêng của Landing không dùng `rounded-*`, chỉ `components/ui/` và `components/erp/` bị ảnh hưởng, nên đổi là an toàn.
  - **Lớp alias shadcn (dòng 134–151, ví dụ `--background: var(--paper)`) resolve một lần ở `:root`, nên không đảo màu trong các band `.dark`.** Hiện chưa lộ ra vì Landing ít dùng utility shadcn trong band tối, nhưng là lỗi tiềm ẩn (ví dụ `* { outline-ring/50 }`). Cách sửa: chép block `@theme inline` map thẳng token của canon cùng `@layer base` (màu viền mặc định, `::selection` có fallback). Đã kiểm: không chỗ nào dùng utility `accent` trần (mọi chỗ đều là `-accent-text`), nên đổi `--color-accent` sang màu section như canon là an toàn. `--chart-1/2` đang là `var()` và không ai dùng; chép hex của canon.
  - Band tối hiện dùng class `dark` theo từng section (`HeroFrame.tsx:13`, `Closing.tsx:20`, `Tour.tsx:128`, `[locale]/page.tsx:78, 116`, `Footer.tsx:8`, `office/page.tsx:72`, `production/page.tsx:81`) và đảo sáng bằng `light` (`Nav.tsx:71` SheetContent, `Tour.tsx:264` `.pop light`). Sau khi sửa lớp alias, soát từng chỗ này.

- [ ] **1.4 `src/app/[locale]/production/page.tsx:59`: `dot: "bg-danger"` tô chấm thương hiệu của khách bằng màu lỗi.** Vi phạm quy tắc màu bắt buộc "Accent ≠ danger" (DESIGN_SYSTEM.md dòng 34: danger chỉ dành cho lỗi và hành động phá hủy) và R-01 (màu chỉ xuất hiện khi mang nghĩa). Dùng màu thương hiệu của khách đặt trong dữ liệu mock, hoặc ink nếu không cần phân biệt. Nếu làm sau 1.3 thì tên class cũng đã đổi theo `-base`.

- [ ] **1.5 Tài liệu trỏ agent sai nguồn.**
  - `AGENTS.md` bảo agent đọc `BRANDING.md` — tài liệu vẫn ghi accent bronze `#9A7B4F`, "light-dominant, dark later", không có AI demo. Thêm một khối "Design system canon" trỏ về `Pantheus UI/DESIGN_SYSTEM.md`, giống cách Office và Victoria đã làm.
  - `BRANDING.md`, `VIBE.md` (tài liệu trước pivot: canvas `#0E0E10`, không accent, Geist/Inter Display), `LAYOUT.md`, `CONTENT.md`: đặt banner `ARCHIVED — xem Pantheus UI/DESIGN_SYSTEM.md` ở đầu. Rẻ hơn viết lại, và tránh hai nguồn sự thật. Nếu muốn giữ phần nội dung còn đúng (giọng văn, đối tượng) thì chép phần đó vào canon trước khi archive.

---

## 2. Dọn dẹp — nên làm

- [ ] **2.1 Xoá `src/components/erp/`** (7 file: StatusBadge, KpiCard, DataTable, SidebarNav, FormField, Toast, Modal). Bản chuẩn đã ở canon; đã kiểm lại sau redesign, không route hay component nào ngoài erp/ import vào.
- [ ] **2.2 Xoá ba thư mục pipeline sync cũ:** `.design-sync/` (628K), `.ds-sync/` (600K), `ds-bundle/` (3.6M). Cả ba đã nằm trong `.gitignore`, nên chỉ là dọn đĩa và tránh agent đọc nhầm; pipeline đã dời về canon.
- [ ] **2.3 Xoá `style-guide/design_handoff_pantheus_v2/`** (đang được git track). Canon đã giữ bản lưu tại `Pantheus UI/docs/style-guide-v2-archive`, nên bản ở đây chỉ là bản sao dễ lệch.
- [ ] **2.4 Xoá `src/components/marks/MarkLegacy.tsx`** cùng comment nhắc tới nó ở `Mark.tsx` dòng 5, và các SVG mặc định không ai dùng: `public/file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg`. Giữ `pantheus-mark.svg` và `favicon.svg`. Ngoài comment này, Mark / Wordmark / TripleBarMark đã khớp canon; `src/app/icon.svg` trùng `public/favicon.svg` và đổi theo theme.
- [ ] **2.5 `TooltipProvider` bọc toàn app trong `layout.tsx:49` nhưng không có Tooltip nào được dùng.** Gỡ provider (và `components/ui/tooltip.tsx` nếu không định dùng), hoặc giữ nếu sắp có tooltip.
- [ ] **2.6 `NOTES.md`: đánh dấu phần lịch sử.** Gates 0–6 và hai đợt revision mô tả landing trước redesign (ví dụ dòng 44 nói về `.aura-sweep` và `--grid`, đều đã bị bỏ). Không cần sửa giá trị; đặt banner "Lịch sử — trước redesign 2026-10-09" lên các phần đó. Lưu ý `NOTES.md` đang có thay đổi chưa commit với một mục "Design System v2" cũng đã cũ (nhắc erp/, spec v2, MarkLegacy) — xem lại trước khi commit file đó.

---

## 3. Tùy chọn

- [ ] **3.1 Màu alpha tự pha bằng `color-mix` thay vì token.** Chữ và nét 42% ink (`globals.css:474, 621, 1220`), viền và fill 55% ink (`.btn` dòng 361, `.mk` dòng 1288, fill SVG dòng 1242). Canon có sẵn bậc ink-soft / muted-ink / line-strong; dùng token giúp band `.dark` tự đảo đúng và giữ được độ tương phản đã kiểm.
- [ ] **3.2 Bóng tự chế ở `globals.css:752`** (`0 30px 60px -36px rgb(30 30 30 / 0.45)`). Canon có thang shadow riêng; nếu bóng lớn này là chủ ý cho mock sản phẩm thì đưa nó vào canon như một bậc marketing (liên quan D1), nếu không thì dùng bậc gần nhất.

---

## 4. Cần quyết

**D1 — Canon có nên ghi nhận lớp marketing hiện tại của Landing không.** Redesign đã thay toàn bộ component marketing mà canon §2/§9.4 mô tả bằng một hệ class riêng trong `globals.css` (1743 dòng: `.wrap`, `.eyebrow`, `.h1`…, `.btn`/`.btn-solid`, `.gridbg`, tour, mock ứng dụng). Canon hiện mô tả một thứ không còn tồn tại.
- Nâng lớp marketing hiện tại lên canon (chép class và component tương ứng sang `Pantheus UI`): canon lại khớp thực tế, site marketing sau này có chỗ để kế thừa; tốn công tách và viết tài liệu, và lớp này còn đang thay đổi nhanh. Thắng khi Landing đã ổn định.
- Thu §9.4 về nguyên tắc (marketing tự do bố cục nhưng phải dùng token, font và doctrine mono của canon), không liệt kê component: rẻ, ít lệch lại; mất danh mục để tái dùng. Thắng nếu không có site marketing thứ hai.
- Để nguyên: không tốn gì; canon tiếp tục nói sai, agent đọc canon sẽ dựng lại component đã xoá.

Đề xuất: thu §9.4 về nguyên tắc ngay (làm cùng 0.2), rồi nâng lớp marketing lên canon sau khi Landing xong mục 1. Chưa quyết thì mặc định thu về nguyên tắc.

**D2 — Thang chữ marketing.** Landing có thang riêng: `.h1` 80, `.h1-sm` 72, `.h1-close` 62, `.h2` 50, `.h2-sm` 40, `.h3` 22, `.lead` 18, `.body` 15, cộng các size inline `text-[36px]`, `text-[34px]`, `text-[19px]`, `text-[14px]`, `text-[13px]`. Canon §4 chỉ có thang cho ứng dụng và một `.type-display`.
- Đưa các bậc marketing vào canon §4 và thay size inline bằng class: một nguồn duy nhất, dễ giữ nhịp chữ; tốn chút công gom và đặt tên.
- Ghi vào canon rằng tầng marketing tự sở hữu thang chữ: không tốn công; size inline tiếp tục mọc thêm.
- Để nguyên: không tốn gì; lệch tiếp.

Đề xuất: đưa vào canon (làm cùng 0.5). Chưa quyết thì mặc định giữ các class hiện tại và chỉ dọn size inline khi đụng vào file đó.

**D3 — Kiểu focus cho phần tử không có viền.** `globals.css:412–426` dùng `outline: 2px solid var(--accent-text); outline-offset: 3px` cho `.btn`, `.lnk`, `.nav-link`, `.sheet`, `.stp`, `.tab`, `.mk`, `.hs`, `.q`, `.pop-x`. Canon và Office dùng viền accent cộng ring 3px `accent-wash`.
- Chuyển sang kiểu canon: đồng nhất với Office, người dùng thấy cùng một kiểu focus trên mọi sản phẩm; ring-wash quanh link chữ không viền (`.lnk`, `.nav-link`) có thể trông lạ và cần thử.
- Sửa canon để cho phép outline offset với phần tử không viền: giữ được cái đang chạy tốt; canon có hai kiểu focus.

Đề xuất: chuyển sang kiểu canon cho các phần tử có viền (`.btn`, `.sheet`, `.tab`, `.q`), và đề xuất canon thêm ngoại lệ outline cho link chữ. Chưa quyết thì mặc định giữ nguyên — kiểu hiện tại đạt yêu cầu truy cập.

**D4 — `src/components/ui/button.tsx`.** Vẫn là bản radix-nova nguyên gốc (destructive dạng tint, ring `ring/50`, hover ghost là `bg-muted`). Consumer duy nhất là nút đóng trong `sheet.tsx:73` (ghost, `icon-sm`). Các CTA thật của Landing dùng `.btn`, không dùng component này.
- Chép `Button.tsx` của canon: đúng anatomy; kéo theo custom variant `mobile:` (767px) vào `globals.css` — Landing đang dùng breakpoint 1100/900/760/560 — cùng việc đổi tên semantic và radius ladder ở 1.3.
- Xoá `ui/button.tsx` và tự style nút đóng của sheet bằng class sẵn có: ít code nhất, không kéo thêm breakpoint lạ; nếu sau này cần Button thì lúc đó chép canon.

Đề xuất: xoá và tự style nút đóng — một consumer không đáng kéo cả component. Chưa quyết thì mặc định để nguyên (nút đóng vẫn chạy được). Quyết định về `.btn` thuộc D1.

**D5 — Hình tròn.** Canon R-03 cấm hình tròn trừ avatar. Đang tròn: `.hs` (hotspot của tour, là button 40px, dòng 1300), `.mk` (dòng 1282), `.app-dot` (dòng 772). `.av` (dòng 1080) là avatar, hợp lệ. `.tok` tròn cho Office (đại diện người, hợp ngoại lệ avatar) và vuông cho Production (`token="square"`, đại diện vật tư) là hợp lý, không cần sửa.
- Đổi `.hs`, `.mk`, `.app-dot` sang vuông bo nhẹ theo radius ladder: đúng canon; hotspot tròn là quy ước quen thuộc của tour nên có thể kém nhận diện hơn.
- Ghi ngoại lệ "điểm đánh dấu trên ảnh" vào canon: giữ hiện trạng; thêm một ngoại lệ vào luật.

Đề xuất: đổi `.app-dot` (mock ứng dụng phải giống sản phẩm thật) và giữ `.hs`/`.mk` kèm ngoại lệ ghi vào canon. Chưa quyết thì mặc định giữ nguyên.

---

## 5. Mục của bản TODO cũ đã hết hiệu lực

Ghi lại để người sau khỏi đi tìm:

- Ghi chú HeroText "cố ý khác canon vì next-intl": HeroText đã bị xoá.
- Gotcha `erp/Modal.tsx` import button: không còn liên quan Button (xem D4); erp/ sẽ xoá ở 2.1.
- Danh sách eyebrow cũ (`HeroText:16`, `Audience`, `Pillars`, `Closing:29`, `Process:27`): các file đã xoá; danh sách mới ở 1.2.
- Sửa giá trị `--grid` và sweep ở `NOTES.md` dòng 44: `.aura-sweep` và grid đã bị bỏ; thay bằng banner lịch sử ở 2.6.
- Cập nhật bảng accent và câu "dark later" trong `BRANDING.md`: thay bằng banner archived ở 1.5.
- Ghi chú brand tier (chỉ `lib/brand.ts`, `public/brand/` và họ màu accent được đổi theo khách; font và foundation là nhận diện Pantheus): Landing không còn hai file đó sau redesign. Luật này vẫn đúng và nằm ở canon §6 "Brand tier".
