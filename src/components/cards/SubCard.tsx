import React, {forwardRef} from "react";
import {Card, CardContent, CardHeader, Divider, Theme, Typography} from "@mui/material";
import {CardProps} from "@mui/material/Card/Card";
import {SxProps} from "@mui/system";


export type SubCardProps = CardProps & {
    children: React.ReactElement,
    contentSX?: SxProps<Theme>,
    darkTitle?: boolean,
    contentClass?: string,
    cardHeaderCation?: React.ReactNode,
    subCardTitle?: string
}

const SubCard = forwardRef<HTMLDivElement, SubCardProps>(
    ({
         children,
         content,
         contentClass,
         darkTitle,
         cardHeaderCation,
         sx = {},
         contentSX = {},
         subCardTitle,
         ...others
     }, ref) => {
        return (
            <Card
                ref={ref}
                sx={{
                    border: '1px solid',
                    borderColor: "primary",
                    ':hover': {
                        boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)'
                    },
                    ...sx
                }}
                {...others}
            >
                {/* card header and action */}
                {!darkTitle && subCardTitle &&
                    <CardHeader sx={{p: 2.5}} title={<Typography variant="h5">{subCardTitle}</Typography>}
                                action={cardHeaderCation}/>}
                {darkTitle && subCardTitle &&
                    <CardHeader sx={{p: 2.5}} title={<Typography variant="h4">{subCardTitle}</Typography>}
                                action={cardHeaderCation}/>}

                {/* content & header divider */}
                {subCardTitle && (
                    <Divider
                        sx={{
                            opacity: 1,
                            borderColor: "primary"
                        }}
                    />
                )}

                {/* card content */}
                {content && (
                    <CardContent sx={{p: 2.5, ...contentSX}} className={contentClass || ''}>
                        {children}
                    </CardContent>
                )}
                {!content && children}
            </Card>
        );
    });

SubCard.displayName = "SubCard"
export default SubCard