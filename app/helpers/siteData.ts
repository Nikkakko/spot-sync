import {
  Slide1,
  Slide2,
  Slide3,
  Slide4,
  Slide5,
  Slide6,
} from "@/public/assets";
export const stickers = [
  {
    id: 1,
    item: "Musicians",
    color: "text-green-500",
  },

  {
    id: 2,
    item: "Websites",
    color: "text-blue-500",
  },

  {
    id: 3,
    item: "Themes",
    color: "text-yellow-500",
  },

  {
    id: 4,
    item: "Singers",
    color: "text-pink-500",
  },

  {
    id: 5,
    item: "Artists",
    color: "text-purple-500",
  },

  {
    id: 6,
    item: "Designers",
    color: "text-red-500",
  },

  {
    id: 7,
    item: "Photographers",
    color: "text-indigo-500",
  },

  {
    id: 8,
    item: "Creators",
    color: "text-yellow-500",
  },

  {
    id: 9,
    item: "Producers",
    color: "text-green-500",
  },

  {
    id: 10,
    item: "Dancers",
    color: "text-pink-500",
  },
];

export const slides = [
  {
    id: 1,
    image: Slide1,
    title: "Slide 1",
    description: "Slide 1 Description",
  },
  {
    id: 2,
    image: Slide2,
    title: "Slide 2",
    description: "Slide 2 Description",
  },
  {
    id: 3,
    image: Slide3,
    title: "Slide 3",
    description: "Slide 3 Description",
  },
  {
    id: 4,
    image: Slide4,
    title: "Slide 4",
    description: "Slide 4 Description",
  },
  {
    id: 5,
    image: Slide5,
    title: "Slide 5",
    description: "Slide 5 Description",
  },
  {
    id: 6,
    image: Slide6,
    title: "Slide 6",
    description: "Slide 6 Description",
  },
];

export const featuresCard = [
  {
    id: 1,
    title: "Choose from a unique collection of themes and layouts",
    description:
      "We got you covered with beautiful designs to match the vibe of your music and band",
  },
  {
    id: 2,
    title: "Promote and show off your music the way you want",
    description:
      "Show your full catalogue, top tracks or customize which music you actually want to show.",
  },
  {
    id: 3,
    title: "Look good on all devices, from desktop to mobile",
    description:
      "All Spot-Sync themes are fully responsive to ensure that your site looks good everywhere.",
  },
  {
    id: 4,
    title: "Leave the boring stuff like SEO, optimization and speed for us!",
    description:
      "Without any effort, your site is SEO-ready, well-maintained and optimized to be blazing fast.",
  },
  {
    id: 5,
    title: "Promote your socials just like your usual link-in-bio service",
    description:
      "Spot-Sync detects your social links and adds them automatically but you can update them as you want.",
  },
  {
    id: 6,
    title: "Never worry about updating your website again",
    description:
      "Whether you release a new track, plan a new tour, update your bio, your site is always in sync.",
  },
  {
    id: 7,
    title: "Promote your tour and events and keep it in sync, forever",
    description:
      "Show off your events and tour dates by connecting your Bandsintown account.",
  },
  {
    id: 8,
    title: "Create for free and share your unique website everywhere",
    description:
      "Make your Spot-Sync site, personalize it, share it and keep it as much as you want, for free.",
  },
  {
    id: 9,
    title: "Simple tools making it easy to personalize your site!",
    description:
      "The editor is minimal by default to help you create the site you want without all the *Spot-Sync*!",
  },
];

export const showCaseText = [
  `You're an artist.`,
  "A good one.",
  "But you need a website.",
  "A good one.",
  "You call the the guy who knows the guy.",
  "He says he knows a guy.",
  "he sucks.",
  "*How come we walked on",
  `the moon you can't`,
  "have a decent website?*",
];

export const footerLinks = [
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

export const selectGroups = ["General", "Socials", "Streaming"];
export const selectValues = [
  {
    id: 1,
    group: "General",
    values: ["Website"],
  },
  {
    id: 2,
    group: "Socials",
    values: [
      "Facebook",
      "X",
      "Instagram",
      "TikTok",
      "YouTube",
      "Snap",
      "Twitch",
      "Wikipedia",
    ],
  },
  {
    id: 3,
    group: "Streaming",
    values: [
      "YouTube Music",
      "Spotify",
      "Apple Music",
      "SoundCloud",
      "Deezer",
      "Vimeo",
    ],
  },
];

interface TabValue {
  id: number;
  value: string;
}

export const tabValues: TabValue[] = [
  {
    id: 1,
    value: "General",
  },
  {
    id: 2,
    value: "Themes",
  },

  {
    id: 4,
    value: "Links",
  },
];

type faqColor = "violet" | "blue" | "pink" | "yellow" | "green";

type faqCardType = {
  id: number;
  title: string;
  description: string;
  color: faqColor;
}[];

export const faqCard: faqCardType = [
  {
    id: 1,
    title: "What is Spot-Sync?",
    description:
      "Spot-Sync is a free website builder for musicians. It helps artists create beautiful websites that are easy to update and maintain.",
    color: "violet",
  },

  {
    id: 2,
    title: "How does it work?",
    description:
      "You sign up, choose your Spotify artist profile, claim a unique link and hit create. Spot-Sync 'll build out your website based on your profile information. Then, you can change the design and personalize it a bit more!s",
    color: "blue",
  },

  {
    id: 3,
    title: "Why is it different?",
    description:
      "Popular site builders like Squarespace are bloated, complex and a pain to use and maintain. No matter what you do, the final result will not satisfy you. Simple options like Linktree are just, you know, too simple. Spot-Sync lands in the middle, as it allows you to have a beautiful website without all the complexity around designing, building and maintaining it.!",
    color: "pink",
  },

  {
    id: 4,
    title: "Is it really free?",
    description:
      "Yes. You can a create a site on Spot-Sync for free and keep it as much as you want. That said, we'll launch a Pro version that costs a small fee to access more themes and features (e.g. connecting to a custom domain) but the free version will always remain free.",
    color: "yellow",
  },

  {
    id: 5,
    title: "What's next?",
    description:
      "We're working on a lot of things. We'll soon launch a Pro version with more themes and features. We're also working on a new editor to make it even easier to personalize your site.",
    color: "green",
  },
];

export const collorPalette = [
  {
    name: "light",
    color: "#a3a3a3",
  },
  {
    name: "customdark",
    color: "#1d1d1d",
  },
  {
    name: "purple",
    color: "#8a2be2",
  },

  {
    name: "red",
    color: "#b60707",
  },
  {
    name: "green",
    color: "#4d7c0f",
  },

  {
    name: "teal",
    color: "#047857",
  },

  {
    name: "blue",
    color: "#0369A1",
  },

  {
    name: "crimson",
    color: "#be123c",
  },
];
