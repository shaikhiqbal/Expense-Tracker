import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ProfilePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <Avatar className="h-24 w-24 mx-auto mb-4">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
          <AvatarFallback className="text-2xl">JD</AvatarFallback>
        </Avatar>
        <h1 className="text-4xl font-bold tracking-tight mb-2">John Doe</h1>
        <p className="text-xl text-muted-foreground">john@example.com</p>
      </section>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Manage your account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Full Name</label>
              <input 
                className="w-full px-3 py-2 border rounded-md bg-background" 
                defaultValue="John Doe"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input 
                className="w-full px-3 py-2 border rounded-md bg-background" 
                defaultValue="john@example.com"
                type="email"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <input 
                className="w-full px-3 py-2 border rounded-md bg-background" 
                defaultValue="+1 (555) 123-4567"
              />
            </div>
            <Button className="w-full">Update Profile</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>Manage your preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive updates via email</p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Two-Factor Auth</h4>
                <p className="text-sm text-muted-foreground">Extra security for your account</p>
              </div>
              <Button variant="outline" size="sm">Setup</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Privacy Settings</h4>
                <p className="text-sm text-muted-foreground">Control your data visibility</p>
              </div>
              <Button variant="outline" size="sm">Manage</Button>
            </div>
            <Button variant="destructive" className="w-full">Delete Account</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}