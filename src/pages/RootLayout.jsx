import { Outlet } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import Header from "../components/Header";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Container>
      <Header isLoggedIn={isLoggedIn} />
      <Row>
        <Col xs={{ span: 8, offset: 2 }}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default RootLayout;
