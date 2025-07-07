"use client"

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, RefreshCw, Home, Bug, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  const isDevelopment = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-blue-50/20 dark:to-blue-950/10">
      <div className="w-full max-w-2xl space-y-8">
        {/* Main Error Card */}
        <Card className="relative overflow-hidden border border-border/50 shadow-xl">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-orange-500/5 to-yellow-500/5 dark:from-red-500/10 dark:via-orange-500/10 dark:to-yellow-500/10" />
          
          <CardHeader className="relative text-center pb-4">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30 rounded-2xl flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-red-600 via-orange-600 to-red-800 dark:from-red-400 dark:via-orange-400 dark:to-red-600 bg-clip-text text-transparent">
              Oops! Something went wrong
            </CardTitle>
            
            <CardDescription className="text-lg text-muted-foreground max-w-md mx-auto">
              We apologize for the inconvenience. An unexpected error has occurred while processing your request.
            </CardDescription>
          </CardHeader>

          <CardContent className="relative space-y-6">
            {/* Error Details (Development Only) */}
            {isDevelopment && (
              <div className="bg-muted/50 border border-border/30 rounded-lg p-4 space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Bug className="w-4 h-4" />
                  Development Error Details
                </div>
                <div className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
                  {error.message}
                </div>
                {error.digest && (
                  <div className="text-xs text-muted-foreground">
                    Error ID: {error.digest}
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                onClick={reset}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition-all duration-200 hover:scale-[1.02]"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
              
              <Button
                variant="outline"
                className="flex-1 border-border/50 hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02]"
                onClick={() => window.history.back()}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
              
              <Button
                variant="ghost"
                asChild
                className="flex-1 hover:bg-accent/50 transition-all duration-200 hover:scale-[1.02]"
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Home
                </Link>
              </Button>
            </div>

            {/* Help Section */}
            <div className="border-t border-border/30 pt-6 text-center space-y-3">
              <h3 className="font-semibold text-sm text-foreground">
                Need help?
              </h3>
              
              <div className="flex flex-col sm:flex-row gap-2 text-sm text-muted-foreground">
                <span>If this problem persists, please</span>
                <Link 
                  href="https://github.com/maxckes"
                  target="_blank"
                  className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline underline-offset-2 transition-colors"
                >
                  contact support
                </Link>
                <span>or refresh the page.</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Secondary Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="text-center p-6 border-border/50 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <RefreshCw className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h4 className="font-semibold text-sm mb-2">Temporary Issue</h4>
            <p className="text-xs text-muted-foreground">
              This might be a temporary problem. Try refreshing the page.
            </p>
          </Card>

          <Card className="text-center p-6 border-border/50 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
            <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Home className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="font-semibold text-sm mb-2">Safe Navigation</h4>
            <p className="text-xs text-muted-foreground">
              Return to the homepage to continue using the application.
            </p>
          </Card>

          <Card className="text-center p-6 border-border/50 hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Bug className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h4 className="font-semibold text-sm mb-2">Report Issue</h4>
            <p className="text-xs text-muted-foreground">
              Help us improve by reporting this error to our team.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}