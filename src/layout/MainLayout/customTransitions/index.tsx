import React, {forwardRef} from "react";
import {Box, Collapse, Fade, Grow, Slide, Theme, Zoom} from "@mui/material";
import {SxProps} from "@mui/system";

type position = 'top-left' | 'top-right' | 'top' | 'bottom-left' | 'bottom-right' | 'bottom'
type direction = 'up' | 'down' | 'left' | 'right'
type type = 'grow' | 'fade' | 'collapse' | 'slide' | 'zoom'

interface TransitionsProps {
    sx: SxProps<Theme>
    type: type
    children: React.ReactNode
    position: position
    direction: direction
    in: boolean
    onEnter: () => void
    onExited: () => void
}

const CustomTransitions = forwardRef<HTMLDivElement, Partial<TransitionsProps>>(
    ({children, type = 'grow', position = 'top-left', direction = 'up', ...others}: Partial<TransitionsProps>,
     ref) => {
        let positionSX: { transformOrigin: string };
        switch (position) {
            case 'top-right':
                positionSX = {
                    transformOrigin: 'top right'
                };
                break;
            case 'top':
                positionSX = {
                    transformOrigin: 'top'
                };
                break;
            case 'bottom-left':
                positionSX = {
                    transformOrigin: 'bottom left'
                };
                break;
            case 'bottom-right':
                positionSX = {
                    transformOrigin: 'bottom right'
                };
                break;
            case 'bottom':
                positionSX = {
                    transformOrigin: 'bottom'
                };
                break;
            case 'top-left':
            default:
                positionSX = {
                    transformOrigin: '0 0 0'
                };
                break;
        }

        return (
            <>
                <Box ref={ref}>
                    {type === 'grow' && (
                        <Grow {...others}>
                            <Box sx={positionSX}>{children}</Box>
                        </Grow>
                    )}
                    {type === 'collapse' && (
                        <Collapse {...others} sx={positionSX}>
                            {children}
                        </Collapse>
                    )}
                    {type === 'fade' && (
                        <Fade
                            {...others}
                            timeout={{
                                appear: 500,
                                enter: 600,
                                exit: 400
                            }}
                        >
                            <Box sx={positionSX}>{children}</Box>
                        </Fade>
                    )}
                    {type === 'slide' && (
                        <Slide
                            {...others}
                            timeout={{
                                appear: 0,
                                enter: 400,
                                exit: 200
                            }}
                            direction={direction}
                        >
                            <Box sx={positionSX}>{children}</Box>
                        </Slide>
                    )}
                    {type === 'zoom' && (
                        <Zoom {...others}>
                            <Box sx={positionSX}>{children}</Box>
                        </Zoom>
                    )}
                </Box>
            </>
        );
    }
);
CustomTransitions.displayName = "Transitions"
export default CustomTransitions;