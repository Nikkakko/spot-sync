import * as React from "react";
import { Shell } from "./Shell";
import Link from "next/link";
import { footerLinks } from "@/app/helpers/siteData";

interface SiteFooterProps {}

const SiteFooter: React.FC<SiteFooterProps> = ({}) => {
  return (
    <Shell
      as="footer"
      variant="footer"
      className="flex flex-col-reverse lg:flex-row justify-between mx-auto  max-w-5xl px-0 py:4 pb-10 uppercase"
    >
      <p className="text-black/50 text-xs text-center w-full">
        SPOT-SYNC 2024© All Rights Reserved
      </p>
      <nav>
        <ul className="grid grid-cols-2 pb-4 lg:mt-0 lg:flex lg:flex-row lg:space-x-4">
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
