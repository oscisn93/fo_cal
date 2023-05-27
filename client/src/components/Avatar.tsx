interface AvatarProps {
  url: string;
  alt_text: string;
}

export default function Avatar(props: AvatarProps) {
  return (
    <div className="flex -space-x-1 overflow-hidden">
      <img className="rounded-full w-8" src={props.url} alt={props.alt_text} />
    </div>
  );
}
