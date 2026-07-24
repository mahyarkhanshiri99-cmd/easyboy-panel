import AuroraBackground from "./components/layout/AuroraBackground";
import GlassCard from "./components/ui/GlassCard";

export default function App() {
  return (
    <>
      <AuroraBackground />

      <main className="flex min-h-screen items-center justify-center p-6">
        <GlassCard>
          <h1 className="text-4xl font-bold text-white">
            EasyBoy Panel 🚀
          </h1>

          <p className="mt-3 text-white/60">
            Professional Glass Dashboard
          </p>
        </GlassCard>
      </main>
    </>
  );
}