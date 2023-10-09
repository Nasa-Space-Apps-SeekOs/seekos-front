import { useState } from 'react';
import AppCard from '../../../../components/AppCard';
import './index.scss';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import { Box, Button, MobileStepper, Paper, Typography, useTheme } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import { useHomeContext } from '../../contexts/HomeContext';
import { Link } from 'react-router-dom';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const images = [
//     {
//         label: 'Bird',
//         imgPath:
//             'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=1000&q=60'
//     },
//     {
//         label: 'Bali, Indonesia',
//         imgPath:
//             'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1000'
//     },
//     {
//         label: 'Goč, Serbia',
//         imgPath:
//             'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=1000&q=60'
//     }
// ];

export default function Header() {
    const { headerImages, repositories } = useHomeContext();

    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = headerImages.length;

    const theme = useTheme();

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };

    return (
        <div id="home-header">
            {!!repositories.length && (
                <Box sx={{ flexGrow: 1 }}>
                    <Paper
                        square
                        elevation={0}
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            height: 50,
                            pl: 2,
                            bgcolor: 'background.default'
                        }}
                    >
                        {headerImages[activeStep].link ? (
                            <Link
                                to={headerImages[activeStep].link!}
                                style={{ textDecoration: 'none' }}
                            >
                                <Typography>{headerImages[activeStep]?.label}</Typography>
                            </Link>
                        ) : (
                            <Typography>{headerImages[activeStep].link}</Typography>
                        )}
                    </Paper>
                    <AutoPlaySwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {headerImages.map((step, i) => (
                            <div key={step.label}>
                                {Math.abs(activeStep - i) <= 2 ? (
                                    <Box
                                        component="div"
                                        sx={{
                                            height: 255,
                                            display: 'block',
                                            backgroundImage: `url(${step.imgPath})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            overflow: 'hidden',
                                            width: '100%'
                                        }}
                                    />
                                ) : null}
                            </div>
                        ))}
                    </AutoPlaySwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button
                                size="small"
                                onClick={handleNext}
                                disabled={activeStep === maxSteps - 1}
                            >
                                Next
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowLeft />
                                ) : (
                                    <KeyboardArrowRight />
                                )}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? (
                                    <KeyboardArrowRight />
                                ) : (
                                    <KeyboardArrowLeft />
                                )}
                                Back
                            </Button>
                        }
                    />
                </Box>
            )}
        </div>
    );
}
