import { Outlet } from "react-router"
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import useAuth from "../hooks/useAuth.js";

const Layout = () => {
    const { user, logout } = useAuth();
    return (
        <div className="d-flex flex-column min-vh-100 w-100">
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand href="/">Last Race</Navbar.Brand>
                    <Nav className="ms-auto w-100">
                        {user ? (
                            <>
                                <Nav.Link className="text-muted me-auto" href="/leaderboard">
                                    Leaderboard
                                </Nav.Link>
                                <Navbar.Text className="me-3">
                                    Welcome, <strong className="ms-1 text-white">{user.username}</strong>
                                </Navbar.Text>
                                <Button variant="outline-light" onClick={logout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <Nav.Link className="ms-auto" href="/login">Login</Nav.Link>
                        )}
                    </Nav>
                </Container>
            </Navbar>

            <Container className="mt-4">
                <Outlet />
            </Container>

            <footer className="bg-dark text-light py-3 mt-auto">
                <Container>
                    <small>&copy; {new Date().getFullYear()} Matteo Minin - Last Race.</small>
                </Container>
            </footer>
        </div>
    )
}

export default Layout;