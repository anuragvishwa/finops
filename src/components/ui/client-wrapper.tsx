"use client";

import { useEffect, useState } from "react";

export function ClientWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return <div className={className} />; // Return placeholder with same styles/dimensions
  }

  return <>{children}</>;
}
