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
    content: `Please enter something.`,
    self: false,
    avatar: avatar_icon,
  });
  const text = await chatCtl.setActionRequest({
    type: 'text',
    placeholder: 'Please enter something',
  });
  await chatCtl.addMessage({
    type: 'text',
    content: `You have entered:\n${text.value}`,
    self: false,
    avatar: avatar_icon,
  });

  await chatCtl.addMessage({
    type: 'text',
    content: `What is your gender?`,
    self: false,
    avatar: avatar_icon,
  });
  const sel = await chatCtl.setActionRequest({
    type: 'select',
    options: [
      {
        value: 'man',
        text: 'Man',
      },
      {
        value: 'woman',
        text: 'Woman',
      },
      {
        value: 'other',
        text: 'Other',
      },
    ],
  });
  await chatCtl.addMessage({
    type: 'text',
    content: `You have selected ${sel.value}.`,
    self: false,
    avatar: avatar_icon,
  });

  await chatCtl.addMessage({
    type: 'text',
    content: `What is your favorite fruit?`,
    self: false,
    avatar: avatar_icon,
  });
  const mulSel = await chatCtl.setActionRequest({
    type: 'multi-select',
    options: [
      {
        value: 'apple',
        text: 'Apple',
      },
      {
        value: 'orange',
        text: 'Orange',
      },
      {
        value: 'none',
        text: 'None',
      },
    ],
  });
  await chatCtl.addMessage({
    type: 'text',
    content: `You have selected '${mulSel.value}'.`,
    self: false,
    avatar: avatar_icon,
  });

  await chatCtl.addMessage({
    type: 'text',
    content: `What is your favorite picture?`,
    self: false,
    avatar: avatar_icon,
  });
  const file = (await chatCtl.setActionRequest({
    type: 'file',
    accept: 'image/*',
    multiple: true,
  })) as FileActionResponse;
  await chatCtl.addMessage({
    type: 'jsx',
    content: (
      <div>
        {file.files.map((f) => (
          <img
            key={file.files.indexOf(f)}
            src={window.URL.createObjectURL(f)}
            alt="File"
            style={{width: '100%', height: 'auto'}}
          />
        ))}
      </div>
    ),
    self: false,
    avatar: avatar_icon,
  });

  await chatCtl.addMessage({
    type: 'text',
    content: `Please press the button.`,
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
