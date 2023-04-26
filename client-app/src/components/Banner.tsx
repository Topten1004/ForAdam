import { Button, Container, Grid, Header } from "semantic-ui-react";

const Banner = () => {
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative mt-10 h-[620px] bg-[color:var(--bg-purple-100)] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      <div className="top-1/6 sm:top-1/5 xl:top-1/5 absolute h-14 text-center md:w-full lg:top-1/4">
        <div className="mt-20 px-6 text-center text-gray-800 sm:mt-2 sm:ml-8 lg:text-left">
          <Container fluid>
            <Grid centered>
              <Grid.Column
                mobile={16}
                tablet={8}
                computer={6}
                textAlign="center"
                widescreen={16}
              >
                <div className="mb-12 md:mt-12 lg:mt-0 lg:mb-0">
                  <div className="block rounded-lg px-6 py-12 shadow-lg md:px-12 lg:-mr-14">
                    <Header as="h1">
                      Paper Cards are outdated <br />
                      <span className="font-bold text-white">
                        <span>Stampify</span> is the new way
                      </span>
                    </Header>
                    <p className="mb-2 text-[22px] font-bold text-white md:text-[25px] lg:text-[25px]">
                      Stampify makes it super easy and convenient to reward
                      loyalty with a simple, user-friendly platform.
                    </p>
                    <Button circular size="large" onClick={scrollToBottom}>
                      Give it a try
                    </Button>
                  </div>
                </div>
              </Grid.Column>
            </Grid>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Banner;
