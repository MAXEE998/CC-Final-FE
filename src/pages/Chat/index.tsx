import { Box, Button, } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import React from 'react';

import { ActionRequest, ChatController, FileActionResponse, MuiChat, } from '../../components/chatUI';

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
    <>
      <CssBaseline/>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column-reverse',
            height: '90%',
            width: '90%',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          <Box sx={{ flex: '1 1 0%', minHeight: 0 }}>
            <MuiChat chatController={chatCtl}/>
          </Box>
        </Box>
    </>
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

  echo(chatCtl);
}

function GoodInput({
                     chatController,
                     actionRequest,
                   }: {
  chatController: ChatController;
  actionRequest: ActionRequest;
}) {
  const chatCtl = chatController;

  const setResponse = React.useCallback((): void => {
    const res = {type: 'custom', value: 'Good!'};
    chatCtl.setActionResponse(actionRequest, res);
  }, [actionRequest, chatCtl]);

  return (
    <div>
      <Button
        type="button"
        onClick={setResponse}
        variant="contained"
        color="primary"
      >
        Good!
      </Button>
    </div>
  );
}
