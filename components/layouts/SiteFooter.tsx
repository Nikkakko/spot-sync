import * as React from "react";
import { Shell } from "./Shell";
import Link from "next/link";

interface SiteFooterProps {}

const footerLinks = [
  {
    title: "changelog",
    href: "/changelog",
  },
  {
    title: "faq",
    href: "/faq",
  },
  {
    title: "Privacy",
    href: "#",
  },
  {
    title: "Terms",
    href: "#",
  },
  {
    title: "Contact",
    href: "#",
  },
];

const SiteFooter: React.FC<SiteFooterProps> = ({}) => {
  return (
    <Shell
      as="footer"
      className="flex flex-row justify-between mx-auto  max-w-5xl px-0 py-10 uppercase"
    >
      <p className="text-black/50">SPOT-SYNC 2024© All Rights Reserved</p>
      <nav>
        <ul className="flex space-x-4">
          {footerLinks.map(link => (
            <li key={link.title}>
              <Link href={link.href} className="text-black/50">
                {link.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </Shell>
  );
};

export default SiteFooter;
