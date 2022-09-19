import { Box, Button, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StreamService from '../../services/stream.service';
import {
  Frame,
  FrameContainer,
  ScreenshotsContainer,
  Screenshot,
  ModalContent,
  Body,
  FrameEmulator,
  FrameWrapper,
} from './styled';
import { MESSAGES } from '../../helpers/messages';
import MessageDialogService from '../../services/message-dialog.service';
import LoginService from '../../services/login.service';
import { html } from '../../lib/youtube-video';

const MainPage = () => {
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
  const [screenWidth, setScreenWidth] = useState(1200);
  const [screenHeight, setScreenHeight] = useState(560);
  const [userMedia, setUserMedia] = useState(StreamService.state.userMedia);

  const accessToken =
    LoginService.state.accessToken ||
    window.localStorage.getItem('accessToken');

  useEffect(() => {
    if (activeStream) {
      setLoading(true);
      StreamService.getScreenShots(activeStream.id);
    }
  }, [activeStream]);

  useEffect(() => {
    const streamState$ = StreamService.state$.subscribe((state) => {
      setLoading(state.loading);
      setError(state.error);
      setActiveStream(state.activeStream);
      setScreenShots(state.screenShots);
      setUserMedia(state.userMedia);
    });

    return () => {
      streamState$.unsubscribe();
    };
    // eslint-disable-next-line
  }, []);

  const saveScreenShot = async (activeStream) => {
    if (!accessToken) {
      setError(MESSAGES.CONNECT_WALLET_REQUEST);
      MessageDialogService.showError(MESSAGES.CONNECT_WALLET_REQUEST);
      return;
    }
    try {
      var video = document.getElementById('video');
      var canvas = document.querySelector('canvas');

      const leftOffset = document.getElementById('sidebar').offsetWidth;
      const topOffset = document.getElementById('app_bar').offsetHeight + 20;
      const width = video.offsetWidth;
      const height = video.offsetHeight;
      setScreenWidth(width);
      setScreenHeight(height);

      canvas.width = video.offsetWidth;
      canvas.height = video.offsetHeight;
      var ctx = canvas.getContext('2d');
      ctx.drawImage(
        video,
        leftOffset,
        topOffset,
        width,
        height,
        0,
        0,
        width,
        height
      );
      var dataURI = canvas.toDataURL('image/jpeg');
      console.log(dataURI);
      await StreamService.postScreenShot(activeStream.id, accessToken, dataURI);
      StreamService.getScreenShots(activeStream.id);
    } catch (e) {
      setError(e.message);
    }
  };

  useEffect(() => {
    if (activeStream) {
      if (!userMedia) StreamService.startUserMedia();
      else document.getElementById('video').srcObject = userMedia;
    }
  }, [activeStream, userMedia]);

  const vote = async (activeScreenshot) => {
    if (!accessToken) {
      setError(MESSAGES.CONNECT_WALLET_REQUEST);
      MessageDialogService.showError(MESSAGES.CONNECT_WALLET_REQUEST);
      return;
    }
    const success = await StreamService.vote(activeScreenshot.id, accessToken);
    if (success) {
      MessageDialogService.showSuccess('You successfully voted');
      StreamService.getScreenShots(activeStream.id);
    } else {
      MessageDialogService.showError(error);
    }
    setActiveScreenShot(null);
    handleClose();
  };

  const handleOpen = (screenShot) => {
    setActiveScreenShot(screenShot);
    setModalOpen(true);
  };
  const handleClose = () => setModalOpen(false);

  return (
    <Body>
      {activeStream ? (
        <>
          <FrameContainer>
            <FrameWrapper>
              <Frame
                id={`stream-${activeStream.id}`}
                height="560"
                src={activeStream.url}
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                style={{ display: 'block' }}
              />
              <FrameEmulator>
                <div
                  style={{
                    height: '100%',
                  }}
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              </FrameEmulator>
            </FrameWrapper>
            <Button
              variant="contained"
              color="primary"
              onClick={() => saveScreenShot(activeStream)}
            >
              Save screenshot
            </Button>
          </FrameContainer>

          <ScreenshotsContainer>
            {screenShots.map((screenShot) => (
              <Screenshot
                width="520px"
                src={screenShot.photo}
                onClick={() => handleOpen(screenShot)}
              />
            ))}
          </ScreenshotsContainer>

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
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => vote(activeScreenshot)}
                    >
                      Vote
                    </Button>
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
        </>
      ) : (
        ''
      )}
      <canvas
        width={screenWidth}
        height={screenHeight}
        style={{ display: 'none' }}
      ></canvas>
    </Body>
  );
};

export default MainPage;
