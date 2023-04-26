import { Link } from "react-router-dom";
import { Button, Container, Segment } from "semantic-ui-react";

function QrHome() {
  return (
    <Container fluid textAlign="center">
      <Segment attached="top">Scan or enter the venue Code</Segment>
      <Button.Group size="large">
        <Button
          attached="bottom"
          as={Link}
          to={"/qr_scanner"}
          style={{ backgroundColor: "#ed2b5d", color: "#ffffff" }}
          content="Scan QR Code"
        ></Button>
        <Button.Or />
        <Button
          attached="bottom"
          as={Link}
          to={"/qr_generator"}
          style={{ backgroundColor: "#ed2b5d", color: "#ffffff" }}
          content="Enter Code"
        ></Button>
      </Button.Group>
    </Container>
  );
}

export default QrHome;
