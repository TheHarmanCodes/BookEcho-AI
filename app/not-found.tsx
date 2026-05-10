import StatusPage from "@/components/StatusPage";

export default function NotFound() {
  return (
    <StatusPage
      code="404"
      badgeLabel="Page not found"
      title="This page is missing from the shelf"
      description="The page you are looking for does not exist or may have been moved."
      actions={[
        { label: "Go Home", href: "/", icon: "home" },
        { label: "Upload a Book", href: "/books/new", variant: "outline" },
      ]}
    />
  );
}
