import {
  LucideIcon,
  ArrowRight,
  ArrowLeft,
  Loader2,
  Share,
  Pencil,
  User,
  Trash,
  Globe,
  MailCheck,
  Phone,
  MapPin,
  Facebook,
  X,
  Instagram,
  Youtube,
  Twitch,
  Music,
  Play,
  Pause,
  MoveRight,
  MoveLeft,
  LucideProps,
} from "lucide-react";
import React from "react";

const SpotifyIcon = React.forwardRef<SVGSVGElement, LucideProps>(
  (props, ref) => {
    // You can customize your SVG here using the LucideProps
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={props.fill || "#000"}
        className={props.className}
      >
        <g>
          <path d="M12,0C5.4,0,0,5.4,0,12s5.4,12,12,12s12-5.4,12-12S18.7,0,12,0z M17.5,17.3c-0.2,0.4-0.7,0.5-1,0.2 c-2.8-1.7-6.4-2.1-10.6-1.1c-0.4,0.1-0.8-0.2-0.9-0.5c-0.1-0.4,0.2-0.8,0.5-0.9c4.6-1,8.5-0.6,11.6,1.3C17.6,16.5,17.7,17,17.5,17.3 z M19,14c-0.3,0.4-0.8,0.6-1.3,0.3c-3.2-2-8.2-2.6-11.9-1.4c-0.5,0.1-1-0.1-1.1-0.6c-0.1-0.5,0.1-1,0.6-1.1 c4.4-1.3,9.8-0.7,13.5,1.6C19.1,13,19.3,13.6,19,14z M19.1,10.7C15.2,8.4,8.8,8.2,5.2,9.3C4.6,9.5,4,9.1,3.8,8.6 C3.6,8,4,7.4,4.5,7.2c4.3-1.3,11.3-1,15.7,1.6c0.5,0.3,0.7,1,0.4,1.6C20.3,10.8,19.6,11,19.1,10.7z"></path>
        </g>
      </svg>
    );
  }
);

//add display name to your custom icon
SpotifyIcon.displayName = "SpotifyIcon";

export const Icons: { [key: string]: LucideIcon } = {
  arrowRight: ArrowRight,
  moveRight: MoveRight,
  moveLeft: MoveLeft,
  arrowLeft: ArrowLeft,
  loader: Loader2,
  share: Share,
  edit: Pencil,
  user: User,
  trash: Trash,
  website: Globe,
  email: MailCheck,
  phone: Phone,
  location: MapPin,
  facebook: Facebook,
  x: X,
  instagram: Instagram,
  youtube: Youtube,
  twitch: Twitch,
  youtubeMusic: Music,
  spotify: SpotifyIcon,
  appleMusic: Music,
  soundcloud: Music,
  deezer: Music,
  vimeo: Music,
  playButton: Play,
  pauseButton: Pause,
} as const;

export const FreeIcon = () => {
  return (
    <div className="py-1 px-2 border border-[#a3a3a3] rounded max-w-fit font-clash">
      <span className="font-clash font-normal text-[#a3a3a3] text-base tracking-widest">
        FREE PLAN
      </span>
    </div>
  );
};

export const ProIcon = () => {
  return (
    <div className="py-1 px-2 border border-[#06b6d4] rounded max-w-fit">
      <span className="font-clash font-normal text-[#00788D] text-base tracking-widest">
        PRO PLAN
      </span>
    </div>
  );
};
