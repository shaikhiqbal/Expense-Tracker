import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Learn more about our MERN TypeScript application and the technology behind it
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
            <CardDescription>Building modern web applications</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              We create scalable, type-safe applications using the latest web technologies. 
              Our focus is on developer experience and application performance.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Technology Stack</CardTitle>
            <CardDescription>Modern tools for modern applications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Frontend:</span>
              <span className="text-muted-foreground">React + TypeScript</span>
            </div>
            <div className="flex justify-between">
              <span>Backend:</span>
              <span className="text-muted-foreground">Node.js + Express</span>
            </div>
            <div className="flex justify-between">
              <span>Database:</span>
              <span className="text-muted-foreground">MongoDB</span>
            </div>
            <div className="flex justify-between">
              <span>Styling:</span>
              <span className="text-muted-foreground">Tailwind CSS</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}