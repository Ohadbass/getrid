import packageJson from "../../package.json";

export function Footer() {
  return (
    <footer className="py-4 text-center text-xs text-zinc-400">
      v{packageJson.version}
    </footer>
  );
}
