export default function Offline() {
  const title = "Offline";
  const description = "You are offline";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-xl">{description}</p>
    </div>
  );
}