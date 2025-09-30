import CoverParticles from "@/components/cover-particles";
import TransitionPage from "@/components/transitionPage";

export default function Home() {
  return (
    <main>
      <TransitionPage />
      <div className="flex min-h-[100vh] h-full bg-no-repeat" style={{background: "var(--background-gradient-cover)"}}>
        <CoverParticles />
     
        <p className="text-secondary">Texto pruebasdasadada</p>
        <div className="m-auto text-white">Contenido centrado</div>


      </div>
    </main>
  );
}
