import { Dropdown, Text, Grid, User } from "@nextui-org/react";
import { observer } from "mobx-react-lite";
import { useStore } from "../app/stores/store";
import { Link } from "react-router-dom";
import { useEffect, useState} from "react"
import { useNavigate } from "react-router-dom";

const Drop = observer(() => {

  const navigate = useNavigate();

  const {
    userStore: { user, logout }, rewardStore: {cleanList}
  } = useStore();

  const [displayName, setDisplayName] = useState("");

  const onLogOut = () => {
    cleanList();
    logout();
  }

  const onProfile = () => {
    navigate(`/profiles/${user?.userName}`)
  }

  useEffect(() => {
    if(user)
    {
      if(user?.displayName.length > 10)
        setDisplayName("");
      else
        setDisplayName(user?.displayName)
    }
  }, [])

  return (
    <Grid.Container justify="flex-start">
      <Grid>
        <Dropdown placement="bottom-left">
          <Dropdown.Trigger>
            <User
              className="hidden md:inline-block"
              bordered
              as="button"
              size="lg"
              color="error"
              name={displayName}
              description=""
              src={user?.image || "/assets/user.png"}
            />
          </Dropdown.Trigger>
          <Dropdown.Menu color="error" aria-label="User Actions">
            <Dropdown.Item key="profile" css={{ height: "$18" }}>
              <Text b color="inherit" css={{ d: "flex" }}>
                Signed in as
              </Text>
              <Text b color="inherit" css={{ d: "flex" }}>
                {user?.email}
              </Text>
            </Dropdown.Item>
            {/* <Dropdown.Item key="settings" withDivider>
              <a href="/dashboard">Dashboard</a>
            </Dropdown.Item> */}
            <Dropdown.Item key="team_settings">
              <button onClick={onProfile} style={{ width: '100%', textAlign: 'left'}}>Profile</button>
            </Dropdown.Item>
            <Dropdown.Item key="logout" color="error" withDivider>
              <button onClick={onLogOut} style={{ width: '100%', textAlign: 'left'}}>Sign Out</button>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Grid>
    </Grid.Container>
  );
});

export default Drop;
