import { Container } from "../common/Container";
import { twMerge } from "tailwind-merge";

interface BannerProps {
  children?: React.ReactNode;
  className?: string;
}

export default function Banner({ children, className }: BannerProps) {
  return (
    <Container
      fullBleed
      className={twMerge(
        "py-12 bg-plp-maroon text-plp-lime overflow-hidden whitespace-nowrap border-b-2 border-plp-maroon",
        className,
      )}
    >
      {children}
    </Container>
  );
}
