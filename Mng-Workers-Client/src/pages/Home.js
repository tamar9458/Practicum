import * as React from 'react';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import easy from '../images/easy.jpg';
import fast from '../images/fast.jpg';

import '../App.css';

const images = [
  {
    url: fast,
    title: 'Fast',
    width: '40%',
  },
  {
    url: easy,
    title: 'Easy',
    width: '30%',
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  backgroundImage: `url(${easy})`,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

const Row = styled('div')({
  display: 'flex',
  width: '100%',
  height: '42vh'
});

export default () => {
  return (
    <>
      <Row>
        <ImageButton focusRipple style={{ width: '50%', height: '42vh' }}>
          <ImageSrc style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            width: '100%',
          }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image style={{
            backgroundImage: `url(${images[0].url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            width: '100%',
          }}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {images[0].title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
        <Typography variant="subtitle1" style={{ padding: '16px', width: '50%' }}>
          loremIpsum
          Additional text for the first image
        </Typography>
      </Row>

      <Row>
        <Typography variant="subtitle1" style={{ padding: '16px', width: '50%' }}>
          Additional text for the second image
        </Typography>
        <ImageButton focusRipple style={{ width: '50%', height: '42vh' }}>
          <ImageSrc style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            width: '100%',
          }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image style={{
            backgroundImage: `url(${images[1].url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
            width: '100%',
          }}>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {images[1].title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      </Row>
    </>
  );
}