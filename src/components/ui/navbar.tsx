export function NavbarDemo() {
  return (
    <div className="bg-black w-full">
      <Navbar className="top-10" />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn(
        "bg-black", // Black background for navbar
        "w-full", // Full width
        "rounded-full", // Oval shape for the navbar
        "p-4", // Add padding to give it space
        "fixed top-10 inset-x-0 z-50", // Positioning the navbar at the top
        className // Custom class to add any additional styles
      )}
    >
      <Menu setActive={setActive} />
    </div>
  );
}

export function Menu({ children, setActive }) {
  return (
    <nav>
      <ul className="flex space-x-4">{children}</ul>
    </nav>
  );
}

export function MenuItem({ item, children, setActive, active, previewUrl }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => {
        setActive(item);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setActive(null);
        setIsHovered(false);
      }}
    >
      {children}
      {active === item && isHovered && previewUrl && (
        <div className="absolute top-full left-0 w-64 h-64 mt-2 bg-black rounded-lg">
          <iframe
            src={previewUrl}
            className="w-full h-full border-0 rounded-lg"
            title={`${item} preview`}
          />
        </div>
      )}
    </li>
  );
}

export function HoveredLink({ href, children, className }) {
  return (
    <a href={href} className={cn("hover:underline", className)}>
      {children}
    </a>
  );
}
