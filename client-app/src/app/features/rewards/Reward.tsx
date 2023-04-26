import { observer } from "mobx-react-lite";
import { Container, Header } from "semantic-ui-react";
import { useStore } from '../../stores/store'
import RewardList from "./RewardList";

const Reward = observer(() => {
  const { userStore } = useStore()

  return (
    <Container textAlign='justified'>
      {
        userStore.isLoggedIn && (
          <div className="mt-5">
            <Header as='h2' style={{marginLeft: '3rem'}}>Rewards</Header>
            <RewardList />
          </div>
        )
      }
    </Container>
  );
});

export default Reward;
