import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { height } from '@mui/system';

const images = [
  {
    url: '/static/images/buttons/breakfast.jpg',
    title: 'Fast',
    width: '40%',
  },
  {
    url: '/static/images/buttons/burgers.jpg',
    title: 'Easy',
    width: '30%',
  },
  {
    url: '/static/images/buttons/camera.jpg',
    title: 'Professional',
    width: '30%',
  },
  {
    url: '/static/images/buttons/sunset.jpg',
    title: 'Relaxing',
    width: '40%',
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
  height:'42vh'
});

export default () => {
    return (
    <>
      <Row>
        <ImageButton focusRipple style={{ width: '50%' }}>
          <ImageSrc style={{ backgroundImage: `url(${images[0].url})` ,height:'42vh'}} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
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
        <ImageButton focusRipple style={{ width: '50%' }}>
          <ImageSrc style={{ backgroundImage: `url(${images[1].url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
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
      
      <Row>
        <ImageButton focusRipple style={{ width: '50%' }}>
          <ImageSrc style={{ backgroundImage: `url(${images[2].url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
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
              {images[2].title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
        <Typography variant="subtitle1" style={{ padding: '16px', width: '50%' }}>
          Additional text for the third image
        </Typography>
      </Row>

      <Row>
        <Typography variant="subtitle1" style={{ padding: '16px', width: '50%' }}>
          Additional text for the fourth image
        </Typography>
        <ImageButton focusRipple style={{ width: '50%' }}>
          <ImageSrc style={{ backgroundImage: `url(${images[3].url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
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
              {images[3].title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      </Row>
    </>
  );
}