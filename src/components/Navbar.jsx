import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>✍ MediumLite</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/create">Write</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Signup</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px",
    background: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  }
};
