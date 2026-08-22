export type ContactLink = {
  label: string;
  href: string;
  value: string;
  external?: boolean;
};

export const contact = {
  name: "Emir Şeren",
  location: "Istanbul",
  year: "2026",
  links: [
    {
      label: "EMAIL",
      href: "mailto:e34emir@gmail.com",
      value: "e34emir@gmail.com",
    },
    {
      label: "GITHUB",
      href: "https://github.com/emirseren100",
      value: "/emirseren100",
      external: true,
    },
    {
      label: "LINKEDIN",
      href: "https://www.linkedin.com/in/emirseren/",
      value: "/emirseren",
      external: true,
    },
  ] as const satisfies readonly ContactLink[],
} as const;
