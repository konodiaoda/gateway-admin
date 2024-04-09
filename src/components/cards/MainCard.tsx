import {Card, CardContent, CardHeader, Divider, Typography} from "@mui/material";
import React, {forwardRef} from "react";
import {SubCardProps} from "@/components/cards/SubCard";

const headerSX = {
    '& .MuiCardHeader-action': {mr: 0}
};
export type MainCardProps = SubCardProps & {
    border?: boolean,
    boxShadow?: boolean,
    shadow?: string,
    mainCardContent?: boolean
}

const MainCard =
    forwardRef<HTMLDivElement, MainCardProps>((
            {
                border = true,
                boxShadow,
                children,
                mainCardContent = true,
                contentClass = '',
                contentSX = {},
                darkTitle,
                cardHeaderCation,
                shadow,
                sx = {},
                title,
                ...others
            },
            ref
        ) => {
            return (
                <Card
                    ref={ref}
                    {...others}
                    sx={{
                        border: border ? '1px solid' : 'none',
                        borderColor: "primary[200]",
                        ':hover': {
                            boxShadow: boxShadow ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)' : 'inherit'
                        },
                        ...sx
                    }}
                >
                    {/* card header and action */}
                    {title && <CardHeader sx={headerSX}
                                          title={darkTitle ? <Typography variant="h3">{title}</Typography> : title}
                                          action={cardHeaderCation}/>}

                    {/* content & header divider */}
                    {title && <Divider/>}

                    {/* card content */}
                    {mainCardContent && (
                        <CardContent sx={contentSX} className={contentClass}>
                            {children}
                        </CardContent>
                    )}
                    {!mainCardContent && children}
                </Card>
            );
        }
    );
MainCard.displayName = "MainCard"
export default MainCard