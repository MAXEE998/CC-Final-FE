import { Box, Button, } from '@mui/material';
import React from 'react';
import BaseContainer from '../../components/BaseContainer';

import { ActionRequest, ChatController, FileActionResponse, MuiChat, } from '../../components/chatUI';
import AppContext from '../../api/AppContext';
import { CheckBoxTwoTone } from '@mui/icons-material';

const avatar_icon = 'https://media.istockphoto.com/id/1191411962/vector/cute-robot.jpg?s=612x612&w=0&k=20&c=KelCNJMam1XGwVM0HclQtHIHZxByJZOtnRjkBbHrAKw='
export default function Chat(): React.ReactElement {
  const [chatCtl] = React.useState(
    new ChatController({
      showDateTime: true,
    }),
  );

  React.useMemo(() => {
    echo(chatCtl);
  }, [chatCtl]);

  return (
    <BaseContainer>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '90%',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
            mt: 4,
            mb: 2,
          }}
        >
          <Box sx={{ flex: '1 1 0%', minHeight: 0 }}>
            <MuiChat chatController={chatCtl}/>
          </Box>
        </Box>
    </BaseContainer>
  );
}

async function echo(chatCtl: ChatController): Promise<void> {
  await chatCtl.addMessage({
    type: 'text',
    content: `Hello, I'm here to collect more information about your cold.`,
    self: false,
    avatar: avatar_icon,
  });
  // symptom
  await chatCtl.addMessage({
    type: 'text',
    content: `Do you show any of the following symptoms?`,
    self: false,
    avatar: avatar_icon,
  });
  await chatCtl.setActionRequest({
    type: 'select',
    options: [
      {
        value: 'cough',
        text: 'Cough',
      },
      {
        value: 'ache',
        text: 'Body Ache',
      },
      {
        value: 'fever',
        text: 'Fever',
      },
      {
        value: 'runny nose',
        text: 'Runny Nose',
      },
      {
        value: 'headache',
        text: 'Headache',
      },
    ],
  });

  // symptom lasted
  await chatCtl.addMessage({
    type: 'text',
    content: `How long does the symptoms last?`,
    self: false,
    avatar: avatar_icon,
  });
  await chatCtl.setActionRequest({
    type: 'text',
    placeholder: '',
  });

  // insurance
  await chatCtl.addMessage({
    type: 'text',
    content: `Do you have insurance?`,
    self: false,
    avatar: avatar_icon,
  });
  await chatCtl.setActionRequest({
    type: 'select',
    options: [
      {
        value: 'yes',
        text: 'Yes',
      },
      {
        value: 'no',
        text: 'No',
      },
    ],
  });

  // Flu and Covid-19 series
  await chatCtl.addMessage({
    type: 'text',
    content: `Have you got the Flu and Covid-19 series vaccines?`,
    self: false,
    avatar: avatar_icon,
  });
  await chatCtl.setActionRequest({
    type: 'select',
    options: [
      {
        value: 'yes',
        text: 'Yes',
      },
      {
        value: 'no',
        text: 'No',
      },
    ],
  });

  await chatCtl.addMessage({
    type: 'text',
    content: `Thank you for your response, you may continue now.`,
    self: false,
    avatar: avatar_icon,
  });
  const good = await chatCtl.setActionRequest({
    type: 'custom',
    Component: GoodInput,
  });
  await chatCtl.addMessage({
    type: 'text',
    content: `You have pressed the ${good.value} button.`,
    self: false,
    avatar: avatar_icon,
  });
}

function GoodInput({
                     chatController,
                     actionRequest,
                   }: {
  chatController: ChatController;
  actionRequest: ActionRequest;
}) {
  const ctx = React.useContext(AppContext);
  

  return (
    <Box sx={{width:"100%"}}>
      <Button
        fullWidth
        type="button"
        onClick={() => {ctx.navigate?.(`/patient/appointmentSummary`)}}
        variant="contained"
        color="primary"
      >
        Good!
      </Button>
    </Box>
  );
}
