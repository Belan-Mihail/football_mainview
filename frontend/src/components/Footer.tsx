import LayoutContainer from "./LayoutContainer";

export default function Footer() {
  return (
    <footer className="border-t border-gray-900 bg-white">
      <LayoutContainer>
        <div className="py-2 xs:py-3 md:py-4">
          <p className="text-[11px] text-blue-900 xs:text-xs sm:text-sm">
            © 2026 Football Main View
          </p>
        </div>
      </LayoutContainer>
    </footer>
  );
}