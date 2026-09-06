import type { ReactNode } from "react";

interface LayoutContainerProps {
  children: ReactNode;
}

const LayoutContainer = ({
  children,
}: LayoutContainerProps) => {
  return (
    <div className="mx-auto w-full max-w-7xl px-2 xs:px-3 sm:px-4 lg:px-6 ">
      {children}
    </div>
  );
};

export default LayoutContainer;