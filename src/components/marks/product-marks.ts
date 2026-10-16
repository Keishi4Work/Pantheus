// Transcribed from Pantheus UI canon (src/components/marks/product-marks.ts) — do not hand-edit.
// Sinh tự động bởi tools/build_brand.py — đừng sửa tay.
export const MARK_STROKE = 2.5;
export const PRODUCT_MARKS = {
  production: "M7.97 2.83 L16.93 17.33 M12.19 9.65 L7.07 17.33 M3.5 20.58 L7.83 20.58 M9.83 20.58 L14.17 20.58 M16.17 20.58 L20.5 20.58",
  office: "M5.05 3.48 L15.55 20.48 M9.99 11.48 L3.99 20.48 M11.07 4.73 L21.05 4.73 M13.85 9.23 L21.05 9.23 M16.63 13.73 L21.05 13.73",
  accounting: "M7 3.33 L14.57 15.58 M4 15.58 L20 15.58 M4 20.08 L20 20.08",
  crm: "M9.11 6.75 L15.6 17.25 M12.16 11.69 L8.46 17.25 M6.11 3.13 L10.11 3.13 L10.11 7.13 L6.11 7.13 Z M14.6 16.87 L18.6 16.87 L18.6 20.87 L14.6 20.87 Z M5.4 16.83 L9.4 16.83 L9.4 20.83 L5.4 20.83 Z",
} as const;
export type ProductKey = keyof typeof PRODUCT_MARKS;
export const PRODUCT_NAMES: Record<ProductKey, string> = {
  production: "Production",
  office: "Office",
  accounting: "Accounting",
  crm: "CRM",
};
