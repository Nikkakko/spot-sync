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
    <div className="py-1 px-2 border border-[#a3a3a3] rounded max-w-fit">
      <span className="AccountCard_card__badge__YuUCS AccountCard_isFree__BKjhK">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="68"
          height="14"
          viewBox="0 0 68 14"
          fill="#a3a3a3"
        >
          <path d="M14.6755 3.22H4.08431V5.88H12.9336V9.06H4.08431V14H0V0H14.6755V3.22Z"></path>
          <path d="M33.4326 14H28.6876L24.9837 9.58H20.8593V14H16.7951V0H26.6254C30.2092 0 32.9921 1.58 32.9921 4.78C32.9921 7.12 31.5106 8.6 29.3083 9.24L33.4326 14ZM20.8393 6.62H26.3251C27.7866 6.62 28.8478 6.22 28.8478 4.86C28.8478 3.5 27.7866 3.1 26.3251 3.1H20.8393V6.62Z"></path>
          <path d="M39.6478 10.88H50.5793V14H35.6235V0H50.359V3.12H39.6478V5.42H48.4771V8.4H39.6478V10.88Z"></path>
          <path d="M57.0685 10.88H68V14H53.0442V0H67.7798V3.12H57.0685V5.42H65.8978V8.4H57.0685V10.88Z"></path>
        </svg>
      </span>
    </div>
  );
};
