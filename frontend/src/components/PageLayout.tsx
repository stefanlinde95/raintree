import clsx from "clsx";
import React from "react";

const PageLayout = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <main className={clsx("container mx-auto space-y-4 py-16 px-4", className)}>
      {children}
    </main>
  );
};

export default PageLayout;
