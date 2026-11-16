/**
 * Central business configuration.
 * Anything unknown is left empty on purpose. Fill these in and the site updates
 * everywhere (buttons, contact section, schema). Nothing here is invented.
 */
export const site = {
  name: "MR & MRS Unisex Fitness Studio",
  shortName: "MR & MRS",
  locality: "Mugalivakkam",
  city: "Chennai",
  country: "India",

  /** Full postal address. Leave empty until confirmed. */
  address: "",

  /** Digits only with country code, e.g. "919XXXXXXXXX". */
  phone: "",
  whatsapp: "",
  email: "",
  /** Full profile URLs. Leave empty to hide. */
  social: { instagram: "", facebook: "", youtube: "" },

  /** Leave empty to show "Call or message for timings". */
  hours: [] as { days: string; time: string }[],

  /**
   * Override with the exact Google Maps share link once you have it.
   * Until then the site opens a Google Maps search for the studio.
   */
  mapsUrl: "",
  mapsQuery: "MR & MRS Unisex Fitness Studio, Mugalivakkam, Chennai",

  /** Public site URL, used for metadata. */
  url: "https://example.com",
};

export const hasPhone = () => site.phone.trim().length > 0;
export const hasWhatsapp = () => site.whatsapp.trim().length > 0;

export const mapsLink = () =>
  site.mapsUrl ||
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapsQuery)}`;

export const mapsEmbed = () =>
  `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;

export const telLink = () => (hasPhone() ? `tel:+${site.phone.replace(/\D/g, "")}` : "");

export const whatsappLink = (message: string) =>
  hasWhatsapp()
    ? `https://wa.me/${site.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`
    : "";
