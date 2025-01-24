'use client';
import { SignUp } from '@clerk/clerk-react';
import React from 'react';

const Page = () => {
  return (
    <div className=" flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <SignUp />

      {/* <div className="max-w-md w-full space-y-8  shadow-lg rounded-xl p-10">
        <SignUp.Root>
          <SignUp.Step name="start" className="space-y-6">
            <div className="text-center">
              <h1 className="text-3xl font-extrabold ">Create an account</h1>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Clerk.Connection
                  name="google"
                  className="w-full inline-flex justify-center py-2 px-4 border border-border rounded-md shadow-sm  text-sm font-medium hover:bg-accent"
                >
                  Sign up with Google
                </Clerk.Connection>
                <Clerk.Connection
                  name="github"
                  className="w-full inline-flex justify-center py-2 px-4 border border-border rounded-md shadow-sm  text-sm font-medium  hover:bg-accent"
                >
                  Sign up with GitHub
                </Clerk.Connection>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2">Or continue with email</span>
                </div>
              </div>

              <div className="space-y-4">
                <Clerk.Field name="username" className="space-y-1">
                  <Clerk.Label className="block text-sm font-medium">
                    Username
                  </Clerk.Label>
                  <Clerk.Input className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" />
                  <Clerk.FieldError className="text-destructive text-xs mt-1" />
                </Clerk.Field>

                <Clerk.Field name="emailAddress" className="space-y-1">
                  <Clerk.Label className="block text-sm font-medium text-foreground">
                    Email
                  </Clerk.Label>
                  <Clerk.Input
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                    type="email"
                  />
                  <Clerk.FieldError className="text-destructive text-xs mt-1" />
                </Clerk.Field>

                <Clerk.Field name="password" className="space-y-1">
                  <Clerk.Label className="block text-sm font-medium text-foreground">
                    Password
                  </Clerk.Label>
                  <Clerk.Input
                    className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm  focus:outline-none focus:ring-accent focus:border-accent sm:text-sm
                      text-primary
                    "
                    type="password"
                  />
                  <Clerk.FieldError className="text-destructive text-xs mt-1" />
                </Clerk.Field>
              </div>

              <SignUp.Captcha className="w-full" />

              <SignUp.Action
                submit
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  hover:bg-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                Sign up
              </SignUp.Action>
            </div>
          </SignUp.Step>

          <SignUp.Step name="verifications" className="space-y-6">
            <SignUp.Strategy name="phone_code">
              <h1 className="text-2xl font-bold text-foreground">
                Check your phone for an SMS
              </h1>

              <Clerk.Field name="code" className="space-y-2">
                <Clerk.Label className="block text-sm font-medium text-foreground">
                  Phone Code
                </Clerk.Label>
                <Clerk.Input className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm placeholder-muted-foreground focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" />
                <Clerk.FieldError className="text-destructive text-xs mt-1" />
              </Clerk.Field>

              <SignUp.Action
                submit
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-accent hover:bg-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                Verify
              </SignUp.Action>
            </SignUp.Strategy>

            <SignUp.Strategy name="email_code">
              <h1 className="text-2xl font-bold text-foreground">
                Check your email
              </h1>

              <Clerk.Field name="code" className="space-y-2">
                <Clerk.Label className="block text-sm font-medium text-foreground">
                  Email Code
                </Clerk.Label>
                <Clerk.Input className="appearance-none block w-full px-3 py-2 border border-border rounded-md shadow-sm  focus:outline-none focus:ring-accent focus:border-accent sm:text-sm" />
                <Clerk.FieldError className="text-destructive text-xs mt-1" />
              </Clerk.Field>

              <SignUp.Action
                submit
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium  bg-accent hover:bg-accent-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
              >
                Verify
              </SignUp.Action>
            </SignUp.Strategy>
          </SignUp.Step>
        </SignUp.Root>
      </div> */}
    </div>
  );
};

export default Page;
