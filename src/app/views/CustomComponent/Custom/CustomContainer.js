import React from "react";
import { styled } from "@mui/system";

const Container = styled('div')(({ theme }) => ({
    margin: '30px',
    [theme.breakpoints.down('sm')]: {
        margin: '16px',
    },
    '& .breadcrumb': {
        marginBottom: '30px',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '16px',
        },
    },
}))

const CustomContainer = props => {

    return (
        <Container
            {...props}

        >
            {props.children}
        </Container>
    );
};




export default CustomContainer;


