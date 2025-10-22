
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
        <div style={{ flex: "1 1 300px" }}>
          <h4 style={{ marginTop: 0 }}>Be the first to know</h4>
          <p style={{ color: "#ccc" }}>Sign up for updates from mettã muse.</p>
        </div>
        <div style={{ flex: "1 1 200px" }}>
          <h4 style={{ marginTop: 0 }}>Contact us</h4>
          <p style={{ color: "#ccc" }}>customercare@example.com</p>
        </div>
      </div>
    </footer>
  );
}
