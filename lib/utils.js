import { clsx } from "clsx";

export function cn(...inputs) {
  return clsx(inputs);
}

export function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
