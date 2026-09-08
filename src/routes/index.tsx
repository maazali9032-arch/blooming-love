import { createFileRoute } from "@tanstack/react-router";
import { NotFoundState } from "@/components/invitation-state";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [{ title: "Invitation not found" }] }),
  component: Index,
});

function Index() {
  return <NotFoundState />;
}
