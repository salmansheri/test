import Link from "next/link";
import { ModeToggle } from "./ui/mode-toggle";

export const Header = () => {
  return (
    <header className="border border-b-primary/30 h-16">
      <div className="flex h-full items-center justify-between px-10">
        <nav>
          <Link href="/dashboard">Home</Link>
        </nav>
        <div>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
