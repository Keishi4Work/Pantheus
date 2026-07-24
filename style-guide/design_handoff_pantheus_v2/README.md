# Handoff: Pantheus Design System v2

## Overview
Nâng cấp design system Pantheus từ "bộ style cho landing page" thành hệ thống duy nhất cho ba bề mặt: **ERP app UI**, **báo cáo/tài liệu in**, và **landing/marketing**. Giữ nhận diện cốt lõi (giấy ấm + mực đen + một accent oxblood, Manrope + Geist Mono, hairline, vuông vắn) và bổ sung: semantic palette, token accent mở rộng, chart palette, mark lambda dựng lại, spec component ERP, dark mode ngang hàng light.

## About the Design Files
`StyleGuide.dc.html` trong gói này là **bản tham chiếu thiết kế viết bằng HTML** (xem trực tiếp trong project design-system Pantheus, mục Templates), không phải production code. Nhiệm vụ: **hiện thực hoá spec này trong repo `pantheus`** (Next.js/React/Tailwind) theo pattern sẵn có của repo, sau đó chạy lại `/design-sync` để project design-system phản chiếu bản v2. KHÔNG copy HTML này vào repo.

## Fidelity
**High-fidelity** cho: tokens, typography, radius/spacing/elevation, logo, button, badge, input, KPI card, table, toast, modal, sidebar. Màn hình dashboard trong style guide là **bố cục tham chiếu** minh hoạ cách các phần ghép lại — không phải trang cần ship nguyên trạng.

## Design Tokens

### Foundation (giữ nguyên giá trị hiện tại)
| Token | Light | Dark |
|---|---|---|
| --paper | #F5F4F0 | #0E0E10 |
| --surface | #FAF9F6 | #16161A |
| --section | #ECEBE6 | #131316 |
| --line | #E2E1DB | #26262A |
| --line-strong | #D2D1CA | #3A3A3D |
| --muted-ink | #8B8A84 | #6B6B70 |
| --ink-soft | #5A5954 | #A8A8AD |
| --ink | #1E1E1E | #ECECEA |
| --grid | #ECEBE6 | #232327 |

### Accent (mở rộng — MỚI: strong, wash)
| Token | Light | Dark | Dùng cho |
|---|---|---|---|
| --accent | #7A2E2E | #B06A5A | active marker, focus, CTA marketing |
| --accent-strong | #632424 | #C07A68 | hover của accent |
| --accent-text | #6B2626 | #C98A7A | chữ nhấn, link |
| --accent-wash | #F0E4E1 | #2B1D19 | selection, focus ring nền |

### Semantic (MỚI) — mỗi màu 4 giá trị: base / text / bg / border
| | Light | Dark |
|---|---|---|
| success | #2E7D52 / #256843 / #E7F0E8 / #C9DECF | base+text #5FB183 / bg #16281E / border #2C4A3A |
| warning | #9A6410 / #7D520E / #F5EDDB / #E4D4AC | #CE9C4C / #272013 / #56431F |
| danger | #B13A30 / #942F27 / #F7E7E4 / #EACAC4 | #D3766A / #2A1614 / #5C2A24 |
| info | #33608D / #2B5175 / #E6EDF4 / #C6D6E5 | #6FA0CB / #14202B / #2A4560 |

Map shadcn: `--destructive` → danger base. QUY TẮC: accent ≠ danger — oxblood là thương hiệu/tương tác, lỗi luôn dùng danger.

### Chart palette (MỚI)
c1 ink (#1E1E1E / #ECECEA) · c2 accent (#7A2E2E / #B06A5A) · c3 steel (#33608D / #6FA0CB) · c4 ochre (#9A6410 / #CE9C4C) · c5 neutral (#D2D1CA / #3A3A3D). Một chuỗi: neutral + accent cho điểm nhấn; nhiều chuỗi: c1→c5. Cột kế hoạch/dự báo: nền section + viền dashed line-strong.

## Typography
Manrope (200–800) + Geist Mono (100–900), giữ nguyên file font hiện có (đã đủ dấu tiếng Việt).

| Style | Spec | Dùng cho |
|---|---|---|
| display | 44/48 · 800 · -0.03em | CHỈ marketing |
| h1 | 26/32 · 800 · -0.02em | tiêu đề trang app |
| h2 | 19/26 · 700 · -0.01em | đầu mục, card title |
| label | 13.5/20 · 600 | nút, form, nav |
| body | 14–15 · lh 1.6 · 400–500 | văn bản |
| eyebrow | mono 11 · +0.18em · uppercase · muted-ink | nhãn mục |
| data | mono 13 · `font-variant-numeric: tabular-nums` | MỌI số liệu |
| code/mã | mono 12.5 | LSX-xxxx, mã kho |

## Spacing · Radius · Elevation
- Lưới 4px: 4/8/12/16/24/32/48/64. Mặc định thoáng: padding card 16–20, gap giữa khối 24–32.
- Radius: 2 badge · 4 control · 6 card · 10 modal. Không pill, không tròn (trừ avatar).
- Elevation: e0 = hairline border only (card tĩnh) · e1 `0 1px 2px rgba(30,30,30,.05)` (hover) · e2 `0 8px 24px rgba(30,30,30,.10)` (dropdown, toast) · e3 `0 16px 48px rgba(30,30,30,.16)` (modal, sheet). Dark mode dựa vào border, giữ shadow như light.

## Logo — Mark lambda dựng lại
Lưới 24px, đầu nét vuông, `stroke="currentColor" fill="none"`, rõ ở 16px. **Phương án A được chọn.** Giữ Wordmark hiện tại.

```svg
<!-- A · Nét đơn (CHỌN) -->
<svg viewBox="0 0 24 24" fill="none"><path d="M7 3.5 17.5 20.5M11.9 11.4 6 20.5" stroke="currentColor" stroke-width="2.6"/></svg>
<!-- B · Khung vuông (alternate — favicon/app icon) -->
<svg viewBox="0 0 24 24" fill="none"><rect x="2" y="2" width="20" height="20" stroke="currentColor" stroke-width="1.3"/><path d="M8.6 6.5 15.9 18.5M11.95 12.1 7.9 18.5" stroke="currentColor" stroke-width="2.2"/></svg>
<!-- C · Chân đế (alternate) -->
<svg viewBox="0 0 24 24" fill="none"><path d="M7 2.5 17.5 19.5M11.9 10.4 6 19.5" stroke="currentColor" stroke-width="2.6"/><path d="M4.5 22.4H19.5" stroke="currentColor" stroke-width="2"/></svg>
```

## Components (spec)
- **Button**: radius 4, padding 9×16, Manrope 13.5/600. Primary = bg ink / text paper (KHÔNG dùng accent); Outline = viền 1px ink, nền trong; Ghost = text ink-soft; Destructive = bg danger / text paper; Disabled = bg section / text muted-ink. Hover: primary→ink 90%, outline→bg section. Focus-visible: border accent + ring `0 0 0 3px accent-wash`.
- **Input/Select/Textarea**: bg surface, viền 1px line-strong, radius 4, padding 9×12, 14px. Focus: viền accent + ring 3px accent-wash. Error: viền danger base, help text 11.5px danger text. Label 12.5/600, margin-bottom 5.
- **Badge trạng thái**: mono 10 uppercase +0.08em, padding 3–4×8–9, radius 3, LUÔN có viền, không màu đặc. Công thức: bg semantic-bg + border semantic-border + text semantic-text. Mapping: Nháp=neutral(section/line-strong/ink-soft) · Đang chạy=info · Chờ QC=warning · Hoàn thành=success · Tạm dừng=danger.
- **Sidebar**: rộng 224, bg surface, viền phải line. Group label = eyebrow mono 10 +0.14em. Item 13.5/600 ink-soft, padding 7×16, border-left 2px transparent. Active: text ink + border-left accent + bg section. Đếm cảnh báo: badge danger mini.
- **KPI card**: surface + line, radius 6, padding 14–16. Label eyebrow mono 10, value 24/800/-0.02em, delta = badge semantic mini.
- **Data table**: header mono 10 uppercase muted-ink; hàng 13px padding 12×16, chia bằng hairline (không zebra); mã = mono 12 ink-soft; số căn phải mono tabular; progress bar cao 3px track section, fill ink (success khi 100%, danger khi blocked); cột trạng thái = badge.
- **Toast**: surface + line, radius 6, e2, chấm 8px semantic base, text 13/600, giờ mono 10.5 muted.
- **Modal**: radius 10, e3, header 15/700, footer phải: Ghost + Primary.
- **Topbar**: padding 11×20, bg surface, hairline dưới; breadcrumb mono 11 uppercase (cấp hiện tại màu ink).

## Interactions & Behavior
Transition 150–200ms ease-out, chỉ cho hover/focus/fade. App KHÔNG dùng motion trang trí. `Reveal`, `Grain`, `Vignette`, `LitGridAura`, `BlueprintCar` = CHỈ marketing/landing (không import vào layout app hay báo cáo in).

## Implementation plan trong repo `pantheus`
1. **Tokens**: cập nhật `:root` và `.dark` theo bảng trên (foundation giữ nguyên, thêm accent-strong/wash + 4 họ semantic + chart). Map `--destructive` → danger.
2. **Tailwind theme**: expose utilities cho token mới (`bg-success-bg`, `text-success-text`, `border-success-border`… tương tự cho warning/danger/info, accent-wash).
3. **Mark**: thay SVG trong `Mark` bằng phương án A (giữ bản cũ là `MarkLegacy` trong lúc migrate, xoá khi xong). Cập nhật favicon/app icon (cân nhắc phương án B cho icon).
4. **Giới hạn atmosphere**: đảm bảo aura/BlueprintCar chỉ ở route marketing; gỡ khỏi mọi layout dùng chung. Ghi chú vào docs.
5. **Component mới** theo spec: StatusBadge, KpiCard, DataTable, SidebarNav, FormField, Toast, Modal (dựa trên Sheet/primitives sẵn có).
6. **Landing page**: token đổi là landing tự cập nhật; audit các hex hard-code → thay bằng token; thay Mark cũ.
7. **Dọn bản cũ**: xoá token/style không còn dùng, rồi chạy `/design-sync` từ repo — project design-system sẽ được ghi đè thành v2 (đây là bước "xoá ver cũ" đúng cách).
8. **Ghi chú cho agent /design-sync** (sửa cảnh báo format khi compile CSS): (a) bỏ qua các biến `--tw-*` khai báo trong selector utility/component khi quét token; (b) thêm `/* @kind other */` sau các token `--ease-out`, `--ease-in-out`, `--default-transition-duration`, `--default-transition-timing-function`, `--tw-translate-x/y`, `--tw-blur`, `--tw-backdrop-blur`, `--tw-duration`, `--tw-outline-style`.

## Files
- `StyleGuide.dc.html` + `ds-base.js` — style guide tham chiếu (bản sống: project design-system Pantheus → Templates → "Pantheus Style Guide v2"; Tweaks đổi phương án logo A/B/C).
