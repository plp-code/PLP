import { Container } from "@/components/ui/Container";

export default function GlobalLoading() {
  return (
    <Container as="div" className="min-h-screen flex items-center justify-center">
      <div className="w-25 h-25 border-4 border-plp-maroon/20 border-t-plp-maroon rounded-full animate-spin" />
    </Container>
  );
}