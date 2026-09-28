import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated/app")({
  head: () => ({
    meta: [
      { title: "Dashboard — Flight Price Notifier" },
      {
        name: "description",
        content: "Your Flight Price Notifier dashboard for tracked routes and target prices.",
      },
      { property: "og:title", content: "Dashboard — Flight Price Notifier" },
      {
        property: "og:description",
        content: "Your Flight Price Notifier dashboard for tracked routes and target prices.",
      },
    ],
  }),
  component: AppShell,
});

function AppShell() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleSignOut() {
    await queryClient.cancelQueries();
    queryClient.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-4">
          <span className="text-sm font-semibold tracking-tight">Flight Price Notifier</span>
          <button
            type="button"
            onClick={handleSignOut}
            className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition hover:bg-secondary"
          >
            Sign out / 登出
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-16">
        <h1 className="animate-fade-up text-3xl font-bold tracking-tight">
          Hi {user?.email ?? "…"}
        </h1>
        <div className="animate-fade-up mt-8 rounded-2xl border border-border/70 bg-card p-7">
          <p className="text-base font-medium">
            你的航線追蹤儀表板即將上線 — 下一個里程碑會加上訂閱航線的功能。
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Your dashboard is coming soon. Route-subscription will be added in the next milestone.
          </p>
        </div>
      </main>
    </div>
  );
}
