import React, { useEffect, useState } from 'react';
import StreamService from '../../services/stream.service';
import LoginService from '../../services/login.service';
import { ModalContent } from '../MainPage/styled';
import { Modal, Box, Typography } from '@mui/material';
import { Body, Screenshot } from './styled';

const VotingPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeStream, setActiveStream] = useState(
    StreamService.state.activeStream
  );
  const [screenShots, setScreenShots] = useState(
    StreamService.state.screenShots
  );
  const [modalOpen, setModalOpen] = React.useState(false);
  const [activeScreenshot, setActiveScreenShot] = useState(null);
  const accessToken =
    LoginService.state.accessToken ||
    window.localStorage.getItem('accessToken');

  useEffect(() => {
    if (activeStream) {
      StreamService.getScreenShots(activeStream.id);
    }
  }, [activeStream]);

  useEffect(() => {
    const streamState$ = StreamService.state$.subscribe((state) => {
      setLoading(state.loading);
      setError(state.error);
      setActiveStream(state.activeStream);
      setScreenShots(state.screenShots);
    });

    return () => {
      streamState$.unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const handleOpen = (screenShot) => {
    setActiveScreenShot(screenShot);
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

  return (
    <Body>
      {screenShots.map((screenshot) => (
        <Screenshot
          width="420"
          src={screenshot.photo}
          onClick={() => handleOpen(screenshot)}
        />
      ))}
      {activeScreenshot ? (
        <Modal
          open={modalOpen}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={ModalContent}>
            <Screenshot width="100%" src={activeScreenshot.photo} />
            {activeStream.active ? (
              <>
                {activeScreenshot.votes ? (
                  <Typography>
                    Votes: {activeScreenshot.votes.length}
                  </Typography>
                ) : (
                  <Typography>No votes yet</Typography>
                )}
              </>
            ) : (
              <>
                {activeScreenshot.votes ? (
                  <Typography>
                    Votes: {activeScreenshot.votes.length}
                  </Typography>
                ) : (
                  <Typography>No votes made</Typography>
                )}
              </>
            )}
          </Box>
        </Modal>
      ) : (
        ''
      )}
    </Body>
  );
};

export default VotingPage;
