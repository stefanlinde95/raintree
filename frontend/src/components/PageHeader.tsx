interface NavLink {
  id: number;
  label: string;
  href: string;
}

const PageHeader = ({
  title,
  navLinks,
}: {
  title: string;
  navLinks?: NavLink[];
}) => {
  const hasNavLinks = navLinks && navLinks.length > 0;

  if (!hasNavLinks) return null;

  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl md:text-4xl">{title}</h1>
      {navLinks && (
        <nav className="space-x-2">
          <ul className="flex space-x-2 list-none">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="text-neutral-500 text-sm underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default PageHeader;
