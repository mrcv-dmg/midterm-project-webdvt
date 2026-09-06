import Navbar from "@/components/ui/navbar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <main className="container mx-auto max-w-6xl space-y-6 p-6">
      <Navbar />

      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle className="font-heading text-xl">About this project</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          {"Dane Marco Bilog"}
          <p>
            This Personal Budget Tracker was built as a Web Development
            midterm project by [Dane Marco Bilog].
          </p>
          <p>
            It's built with React, React Router, Tailwind CSS, and shadcn/ui
            components on top of Base UI. Transaction data is stored locally
            in your browser, so it stays on this device.
          </p>
        </CardContent>
      </Card>
    </main>
  );
}