import { ArrowUpRight } from "lucide-react";
export default function ExternalLink({
  href,
  children,
  className = "text-link",
  ...props
}) {
  return (
    <a
      href={href}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
      {...props}
    >
      {children} <ArrowUpRight className="icon" aria-hidden="true" />
    </a>
  );
}
