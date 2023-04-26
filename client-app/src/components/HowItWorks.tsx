import { Image, Grid, Segment, Header, Container } from "semantic-ui-react";

const HowItWorks = () => {
  return (
    <Container fluid className="mt-10">
      <Header
        className="text-center"
        as="h2"
        style={{ color: "#ed2b5d" }}
        content="How stamps are collected?"
      />
      <Grid stackable columns={2} className="mt-5">
        <Grid.Column width={11}>
          <Segment className="h-full items-center rounded-lg bg-[color:var(--bg-purple-100)] p-6 text-center text-black lg:pl-12 lg:text-left">
            <Header
              as="h2"
              content="Unique Stamp Code"
              style={{ color: "#ed2b5d" }}
            />
            <p className="mt-4">
              This is our default validation method for businesses with a
              physical or mobile location. Customers simply scan the code
              through the platform to collect stamps. We will email you your
              Stamp Code which you can print out and get started with straight
              away!
            </p>
          </Segment>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment className="p-0">
            <Image src="assets/scan.jpg" alt="" size="large" centered />
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default HowItWorks;
