export function TelegramIcon({
  className = "h-5 w-5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="12" fill="#229ED9" />
      <path
        d="M5.5 11.7l11.4-4.4c.5-.2 1 .1.8.8l-1.9 9c-.1.5-.5.7-1 .4l-2.7-2-1.3 1.3c-.2.2-.3.3-.6.3l.2-2.8 5.2-4.7c.2-.2 0-.3-.3-.1L9 12.5l-2.7-.8c-.6-.2-.6-.6.2-.9z"
        fill="#fff"
      />
    </svg>
  );
}
