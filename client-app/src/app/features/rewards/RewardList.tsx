import * as React from 'react'
import { observer } from "mobx-react-lite";
import { Segment, List } from "semantic-ui-react";
import RewardListItem from "./RewardListItem";
import { useStore } from "../../stores/store";

const RewardList = observer(() => {
  const { rewardStore } = useStore();
  const { lists } = rewardStore;

  return (
    <Segment.Group style={{ width: '100%' }} >
      <Segment>
        <div>
        {lists.length == 0?<div>No rewards yet...</div>:
          lists.map((list, i) => (
            <RewardListItem key={i} list={list} />
          ))
        }
        </div>
      </Segment>
    </Segment.Group>
  );
});

export default RewardList;