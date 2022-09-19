import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { SidebarWrapper, StreamerIcon } from './styled';
import StreamService from '../../../../services/stream.service';

const Sidebar = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [streams, setStreams] = useState([]);

  useEffect(() => {
    const streamState$ = StreamService.state$.subscribe((state) => {
      setLoading(state.loading);
      setError(state.error);
      setStreams(state.streams);
    });

    return () => {
      streamState$.unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (!streams.length) {
      setLoading(true);
      StreamService.getStreams();
    }
  }, [streams]);

  const chooseStream = (id) => {
    StreamService.setActiveStream(id);
  };

  return (
    <SidebarWrapper id={'sidebar'}>
      <List>
        {streams.map((stream) => (
          <ListItem
            key={stream.name}
            disablePadding
            onClick={() => chooseStream(stream.id)}
          >
            <ListItemButton>
              <ListItemIcon>
                <StreamerIcon src={stream.icon} />
              </ListItemIcon>
              <ListItemText primary={stream.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </SidebarWrapper>
  );
};

export default Sidebar;
