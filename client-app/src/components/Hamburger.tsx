import { Button, Container } from "semantic-ui-react";

export default function MainNavigation() {
  const toggleDrawer =
    (open: boolean | ((prevState: boolean) => boolean)) => (event: any) => {
      if (
        event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")
      ) {
        return;
      }
    };

  return (
    <Container style={{ color: "red", paddingRight: "0px" }}>
      <Container
        component="div"
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        {/* {search} */}
        <Button className=" rounded-full bg-[color:var(--bg-purple-400)] px-10 py-3 font-bold text-white shadow-sm transition duration-150 hover:shadow-xl active:scale-90">
          <a href="/api/auth/login">Get started</a>
        </Button>
      </Container>

      <Button
        edge="start"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        sx={{
          mr: 2,
          display: {
            xs: "block",
            md: "none",
          },
        }}
      ></Button>
    </Container>
  );
}
