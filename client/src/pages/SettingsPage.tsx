import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTheme } from '@/hooks/useTheme';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Settings</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Customize your application preferences
        </p>
      </section>

      <div className="grid gap-8 max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>Customize how the app looks and feels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-3">Theme</h4>
              <div className="flex gap-2">
                <Button 
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => setTheme('light')}
                >
                  ☀️ Light
                </Button>
                <Button 
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => setTheme('dark')}
                >
                  🌙 Dark
                </Button>
                <Button 
                  variant={theme === 'system' ? 'default' : 'outline'}
                  onClick={() => setTheme('system')}
                >
                  💻 System
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>Manage your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Push Notifications</h4>
                <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Email Updates</h4>
                <p className="text-sm text-muted-foreground">Get updates about new features</p>
              </div>
              <Button variant="outline" size="sm">Enable</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Privacy & Security</CardTitle>
            <CardDescription>Control your data and security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Data Export</h4>
                <p className="text-sm text-muted-foreground">Download your data</p>
              </div>
              <Button variant="outline" size="sm">Export</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Clear Cache</h4>
                <p className="text-sm text-muted-foreground">Clear stored application data</p>
              </div>
              <Button variant="outline" size="sm">Clear</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}