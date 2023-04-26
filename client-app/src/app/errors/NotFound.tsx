import { Button, Header, Icon, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Segment className="text-center">
      <Header icon>
        <Icon name="search" />
        Oops - we've looked everywhere and could not find this
      </Header>
      <Segment.Inline>
        <Button as={Link} to={"/venue-list"} color="blue">
          Return to venue-list page
        </Button>
      </Segment.Inline>
    </Segment>
  );
}
