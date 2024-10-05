import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Analytics } from "@vercel/analytics/react";
import { Session } from '@supabase/supabase-js';

interface LayoutProps {
  children: React.ReactNode;
  session: Session | null;
}

const Layout: React.FC<LayoutProps> = ({ children, session }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar session={session} />
      <main className="flex-grow">{children}</main>
      <Analytics />
      <Footer />
    </div>
  );
};

export default Layout;
