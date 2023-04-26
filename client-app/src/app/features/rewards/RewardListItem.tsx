import * as React from 'react'
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { List, Image, Icon } from "semantic-ui-react";
import RewardModal from './RewardModal';

const RewardListItem = observer((props: any) => {
  
  const [open, setOpen] = React.useState(false)
  const {list} = props;

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <List.Item onClick={handleOpen} className='!flex !justify-between !items-center !w-full hover:cursor-pointer hover:bg-[#eee] mt-2'>
        <List.Content className='!flex'>
          <Image
            src='/assets/venueCategory/coffee.png'
            size="mini"
            rounded
            bordered
          />
          <List.Content className='!flex !flex-col px-2'>
            <List.Header>{list.venueName}</List.Header>
            <List.Content>{list.name}</List.Content>
          </List.Content>
        </List.Content>
        <Icon name='angle right' className='!h-fit'></Icon>
      </List.Item>
      <RewardModal open={open} handleClose={handleClose} title={list.name} id={list.id}/>
    </>
  );
});

export default RewardListItem;
