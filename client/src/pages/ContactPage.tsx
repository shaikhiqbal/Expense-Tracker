import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Get in touch with our team for support or inquiries
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Send us a Message</CardTitle>
            <CardDescription>We'd love to hear from you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Name</label>
              <input 
                className="w-full px-3 py-2 border rounded-md bg-background" 
                placeholder="Your name"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                className="w-full px-3 py-2 border rounded-md bg-background" 
                placeholder="your@email.com"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Message</label>
              <textarea 
                className="w-full px-3 py-2 border rounded-md bg-background min-h-[100px]" 
                placeholder="Your message..."
              />
            </div>
            <Button className="w-full">Send Message</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>Other ways to reach us</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">📧 Email</h4>
              <p className="text-muted-foreground">contact@mernapp.com</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">📱 Phone</h4>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">📍 Address</h4>
              <p className="text-muted-foreground">
                123 Tech Street<br />
                San Francisco, CA 94105
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">🕒 Hours</h4>
              <p className="text-muted-foreground">
                Monday - Friday: 9:00 AM - 6:00 PM<br />
                Weekend: Closed
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}