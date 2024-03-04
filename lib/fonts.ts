import {
  JetBrains_Mono as FontMono,
  Inter as FontSans,
} from "next/font/google";
import localFont from "next/font/local";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// Font files can be colocated inside of `app`
export const fontClash = localFont({
  src: [
    {
      path: "../fonts/clash/ClashDisplay-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/clash/ClashDisplay-Regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/clash/ClashDisplay-Medium.woff",
      weight: "500",
      style: "normal",
    },

    {
      path: "../fonts/clash/ClashDisplay-Semibold.woff",
      weight: "600",
      style: "normal",
    },

    //add extra light
    {
      path: "../fonts/clash/ClashDisplay-ExtraLight.woff",
      weight: "200",
      style: "normal",
    },
    //add light
    {
      path: "../fonts/clash/ClashDisplay-Light.woff",
      weight: "300",
      style: "normal",
    },
  ],

  variable: "--font-clash",
  display: "swap",
  fallback: ["Inter", "sans-serif", "system-ui", "ui-sans-serif"],
});
