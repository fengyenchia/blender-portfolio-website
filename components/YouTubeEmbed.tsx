interface YouTubeEmbedProps {
  src: string;
  title?: string;
}

export default function YouTubeEmbed({ src, title = "YouTube video" }: YouTubeEmbedProps) {
  return (
    <div className="not-prose my-8 w-full">
      <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-neutral-200 bg-neutral-100">
        <iframe
          src={src}
          title={title}
          className="absolute inset-0 h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  );
}
