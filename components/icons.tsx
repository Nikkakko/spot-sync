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
} from "lucide-react";

export const Icons: { [key: string]: LucideIcon } = {
  arrowRight: ArrowRight,
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
  spotify: Music,
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
