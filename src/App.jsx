import { Button } from "@/components/ui/button";

function App() {
  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="mb-2 text-4xl font-bold">
        Web Development Midterms
      </h1>

      <p className="mb-6 text-muted-foreground">
        Testing shadcn/ui
      </p>

      <Button variant="outline">
        Tester
      </Button>
    </main>
  );
}

export default App;