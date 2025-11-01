import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

//**  Redux
import { useAppDispatch, useAppSelector } from '@/hooks/redux';

// ** Redux Actions
import { increment, decrement } from '@/store/slices/counterSlice';

// ** Components
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Welcome to MERN TypeScript App
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          A modern full-stack application built with React, TypeScript, Express,
          and MongoDB
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>⚡ Fast Development</CardTitle>
            <CardDescription>
              Built with Vite for lightning-fast development experience
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>🎨 Modern UI</CardTitle>
            <CardDescription>
              Beautiful components with Tailwind CSS and shadcn/ui
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>🔒 Type Safe</CardTitle>
            <CardDescription>
              Full TypeScript support for both frontend and backend
            </CardDescription>
          </CardHeader>
        </Card>
      </section>

      {/* Demo Section */}
      <section className="flex justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Redux Counter Demo</CardTitle>
            <CardDescription>
              Interactive example showing state management
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-6xl font-bold text-primary">{count}</div>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => dispatch(decrement())}
                variant="outline"
                size="lg"
              >
                Decrease
              </Button>
              <Button onClick={() => dispatch(increment())} size="lg">
                Increase
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
