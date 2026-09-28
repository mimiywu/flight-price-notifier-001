import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Flight Price Notifier — 機票降價通知" },
      {
        name: "description",
        content:
          "Watch popular flight routes from Taipei and get an email the moment the cheapest fare drops to your target price.",
      },
      { property: "og:title", content: "Flight Price Notifier — 機票降價通知" },
      {
        property: "og:description",
        content:
          "Watch popular flight routes from Taipei and get an email the moment the cheapest fare drops to your target price.",
      },
    ],
  }),
  component: Landing,
});

const features = [
  {
    zh: "盯緊熱門航線",
    en: "Always-on route watching",
    body: "持續監控台北出發的熱門航線（東京、首爾），自動抓最低票價。",
  },
  {
    zh: "達標自動通知",
    en: "Target-price email alerts",
    body: "低於你設定的目標價，就寄 email 提醒你，附上立即訂購連結。",
  },
  {
    zh: "隨時取消",
    en: "Cancel anytime",
    body: "月訂閱制，不想用隨時停，沒有綁約。",
  },
];

function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <span className="text-sm font-semibold tracking-tight sm:text-base">
            Flight Price Notifier
          </span>
          {user ? (
            <Link
              to="/app"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Open app
            </Link>
          ) : (
            <Link
              to="/auth"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Sign in / 登入
            </Link>
          )}
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-[-12rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[140px]"
          />
          <div className="mx-auto max-w-3xl px-5 py-24 text-center sm:py-32">
            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Taipei departures
            </p>
            <h1 className="animate-fade-up mt-5 text-4xl font-extrabold leading-tight tracking-tight text-gradient-violet sm:text-6xl">
              Flight Price Notifier
            </h1>
            <p className="animate-fade-up mt-6 text-xl font-semibold sm:text-2xl">
              設定航線與目標價，機票降價就通知你
            </p>
            <p className="animate-fade-up mt-3 text-base text-muted-foreground">
              Set a route and a target price — we email you when the fare drops.
            </p>
            <div className="animate-fade-up mt-10">
              <Link
                to={user ? "/app" : "/auth"}
                className="glow-violet inline-flex rounded-xl bg-primary px-7 py-3 text-base font-semibold text-primary-foreground transition hover:opacity-90"
              >
                {user ? "Open app" : "Sign in / 登入"}
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 pb-28">
          <div className="grid gap-5 md:grid-cols-3">
            {features.map((f) => (
              <article
                key={f.en}
                className="animate-fade-up rounded-2xl border border-border/70 bg-card p-6 transition hover:border-primary/50"
              >
                <h2 className="text-lg font-semibold">{f.zh}</h2>
                <p className="mt-1 text-sm font-medium text-primary">{f.en}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
              </article>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto max-w-6xl px-5 py-8 text-center text-sm text-muted-foreground">
          © 2026 Flight Price Notifier
        </div>
      </footer>
    </div>
  );
}
