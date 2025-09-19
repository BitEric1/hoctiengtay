import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Row from "react-bootstrap/Row";
import { MdTravelExplore } from "react-icons/md";

export default function Header() {
    return (
        <header className="shadow-xl">
            <Container className="grid grid-cols-2 items-center">
                <Navbar>
                    {/* bg-body-tertiary */}
                    <Container className="flex items-center">
                        <Navbar.Brand
                            className="flex items-center gap-2"
                            href="#home"
                        >
                            <img
                                alt=""
                                src="/logo.jpeg"
                                width="40"
                                height="40"
                                className="d-inline-block align-top"
                            />{" "}
                            <strong>Học tiếng Tày Nùng</strong>
                        </Navbar.Brand>
                        <Nav className="me-auto text-xl flex items-center">
                            <Nav.Link href="#home">Trang chủ</Nav.Link>
                            <Nav.Link href="#features">Luyện tập</Nav.Link>
                            <Nav.Link
                                className="flex items-center"
                                href="#pricing"
                            >
                                Khám phá
                                <MdTravelExplore size={24} />
                            </Nav.Link>
                        </Nav>
                    </Container>
                </Navbar>
                <Container className="flex justify-between items-center">
                    <Form>
                        <Row>
                            <Col xs="auto">
                                <Form.Control
                                    type="text"
                                    placeholder="Tìm kiếm"
                                    className=" mr-sm-2"
                                />
                            </Col>
                        </Row>
                    </Form>

                    <NavDropdown
                        title={
                            <img
                                src="/default-avatar.png"
                                width="40"
                                height="40"
                                className="rounded-[50%]"
                                alt="avatar"
                            />
                        }
                        id="nav-dropdown-light-example"
                        menuVariant="light"
                        align="end"
                    >
                        <NavDropdown.Item href="#action/3.1">
                            Hồ sơ
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">
                            Cài đặt
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">
                            Trợ giúp
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Đăng xuất
                        </NavDropdown.Item>
                    </NavDropdown>
                </Container>
            </Container>
        </header>
    );
}
