import TitleCard from "../components/TitleCard";

export default function Home() {
  return (
    <main className="flex flex-col justify-center items-center min-h-screen h-max">
      <div className="max-w-5xl flex flex-col justify-between items-center">
        <TitleCard />
      </div>
    </main>
  );
}
