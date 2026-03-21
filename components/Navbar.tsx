import { Box } from "lucide-react";
import Button from "./ui/Button";
import { useOutletContext } from "react-router";

const Navbar = () => {
  const { isSignedIn, userName, signIn, signOut } =
    useOutletContext<AuthContext>();
  const handleClickAuth = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (e) {
        console.error(`Puter sign out failed: ${e}`);
      }
      return;
    }

    try {
      await signIn();
    } catch (e) {
      console.error(`Puter sign in failed: ${e}`);
    }
  };

  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <div className="brand">
            <Box className="logo" />
            <span className="name">Roomiqys</span>
          </div>
          <ul className="links">
            <a href="#">Product</a>
            <a href="#">Pricing</a>
            <a href="#">Community</a>
            <a href="#">Enterprise</a>
          </ul>
        </div>
        <div className="actions">
          {isSignedIn ? (
            <>
              <span>{userName ? `Hi, ${userName}` : "Sigend In"}</span>
              <Button size="sm" onClick={handleClickAuth} className="btn">
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleClickAuth} size="sm" variant="ghost">
                Log In
              </Button>

              <a href="#upload" className="cta">
                Get Started
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
