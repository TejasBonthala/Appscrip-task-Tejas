
import Link from "next/link";

export default function Header() {
  return (
    <header style={{ borderBottom: "1px solid #eee" }}>
      <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "18px 0",
        }}
      >
        <div style={{ fontWeight: 700 }}><h1>LOGO</h1></div>
        <nav style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <Link href="#">Shop</Link>
          <Link href="#">Skills</Link>
          <Link href="#">Stories</Link>
          <Link href="#">About</Link>
        </nav>
      </div>
    </header>
  );
}