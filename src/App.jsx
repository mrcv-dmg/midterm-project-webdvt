import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

function App() {
  return (
    <main className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Web Development Midterms</CardTitle>
          <CardDescription>
            Testing shadcn/ui
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p>This is the content of the card.</p>
        </CardContent>

        <CardFooter>
          <Button>Tester</Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export default App;