import {
    Card,
    Button,
    Icon,
    TextField,
    CircularProgress,
    FormControlLabel,
} from '@mui/material'
import React, { useState } from 'react'
import useAuth from 'app/hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { Box, styled, useTheme } from '@mui/system'
import 'react-notifications/lib/notifications.css'
import { useDispatch, useSelector } from 'react-redux';
import {loginAction} from "../../../redux/actions/LoginActions";


const FlexBox = styled(Box)(() => ({
    display: 'flex',
    alignItems: 'center',
}))

const JustifyBox = styled(FlexBox)(() => ({
    justifyContent: 'center',
}))

const ContentBox = styled(Box)(() => ({
    height: '100%',
    padding: '32px',
    position: 'relative',
    background: 'rgba(0, 0, 0, 0.01)',
}))

const IMG = styled('img')(() => ({
    width: '100%',
}))

const JWTRoot = styled(JustifyBox)(() => ({
    background: '#1A2038',
    minHeight: '100% !important',
    '& .card': {
        maxWidth: 600,
        borderRadius: 12,
        margin: '1rem',
    },
}))

const StyledProgress = styled(CircularProgress)(() => ({
    position: 'absolute',
    top: '6px',
    left: '25px',
}))

const QrCodeGenertion = () => {
    const navigate = useNavigate()
    const dispatch=useDispatch();
    const { login } = useAuth()
    const TwoFactorAuth = useSelector((state) => state.login);
    console.log("TwoFactorAuth",TwoFactorAuth);
    const handleAuth= async (event) =>{
 try {
            await login(TwoFactorAuth.username, TwoFactorAuth.password,TwoFactorAuth.authCode)
            // navigate('/')
        } catch (e) {
          
        }
       // dispatch(loginAction.getUserInformation({userDetails:TwoFactorAuth,navigation:navigate}))
    }
    return (
        <JWTRoot>
            <Card className="card">
                <h2
                    className="m-0 mb-14 text-white font-weight-300"
                    style={{ textAlign: 'center', alignItems: 'center' }}
                >
                    Application Authentication
                </h2>
                <div
                    className="m-0 mb-14 text-white font-weight-100"
                    style={{
                        textAlign: 'center',
                        margin: '5px 40px 40px 40px',
                    }}
                >
                    Please download and install Google authenticate app on your
                    phone, and scan following QR code to configure your device.
                </div>
                <div className="form-group" style={{ alignItems: 'center' }}>
                    {TwoFactorAuth.QrcodeGeneration != "" && (
                        <img
                            src={TwoFactorAuth.QrcodeGeneration}
                            alt="QR Code"
                            width="30%"
                            height="30%"
                            style={{
                                display: 'block',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                            }}
                        />
                    )}
                </div>
                <TextField
                    size="small"
                    InputLabelProps={{ shrink: true }}
                    id="accessCode"
                    label="Access Code"
                    variant="outlined"
                    // className="mb-4  w-full"
                    style={{ margin: '20px', width: '90%' }}
                    placeholder="Enter Valid Access Code"
                    value={TwoFactorAuth.authCode}
                    onChange={(value) =>
                        dispatch(loginAction.loginInputChange({
                            prop: 'authCode',
                            value: value.target.value,
                            error: 'authCodeError',
                        }))
                    }
                />
                <Box
                    display="flex"
                    // justifyContent="flex-end"
                    ml={3}
                    mb={3}
                    // p={1}
                    bgcolor="background.paper"
                >
                    <Button
                        className="buttonaddEmployee"
                        color="primary"
                        variant="contained"
                        type="submit"
                        onClick={handleAuth}
                    >
                        {/* <Icon>submit</Icon> */}
                        <span className="pl-2 capitalize">Submit</span>
                    </Button>
                </Box>
                <div
                    className="m-0 mb-10 text-white font-weight-100"
                    style={{
                        textAlign: 'center',
                        margin: '5px 40px 10px 10px',
                    }}
                >
                    Click here to{' '}
                    <a href="prathapv35@gmail.com">Contact Support</a> if you
                    are facing any issue. Click here to <a href="/">Login</a> if
                    you entered a Wrong credentials.
                </div>

                <div
                    className="m-0 mb-10 text-white font-weight-100"
                    style={{
                        textAlign: 'center',
                        margin: '5px 40px 10px 10px',
                    }}
                >
                    <p className="text-muted">
                        © 2022 Syneins. Crafted with{' '}
                        <i className="mdi mdi-heart text-danger"></i> by Syneins
                    </p>
                </div>
            </Card>
        </JWTRoot>
    )
}

export default QrCodeGenertion

// import React from "react";
// import { useSelector,useDispatch } from "react-redux";
// //import { InputChange } from "../../Actions";
// import { Button, Form } from "react-bootstrap";
// export default function QrCodeGenertion() {
//     const dispatch = useDispatch();
//    // const getQrCode = useSelector(state => state.AdminPageReducers);
//      //  console.log( "LocateThe QrCode",getQrCode);
//     const handleSubmit=()=>{
//        // dispatch(checkCodeValidation(getQrCode.qrpassword));
//     }

//   return (
//     <div
//       className="container row col-md-12 pb-3 "
//       style={{ backgroundColor:"#0F1827" ,alignItems:"center", justifyContent:"center"  }}
//     >
//         <div className=" col-md-5 card mt-3" style={{alignItems:"center", justifyContent:"center"}}>
//                 <div className="card-body" style={{backgroundColor:"#E0E0E0" , alignItems:"center"}}>
//                 <div className="row">
//                 <div className="">
//             <h4 style={{textAlign:"center"}}>Application Authentication</h4>
//             <p style={{textAlign:"center"}}>
//             Please download and install Google authenticate app on your phone, and scan following QR code to configure your device.
//             </p>
//             <div className="form-group" style={{alignItems:"center"}}>
//               {/* {getQrCode.logintoken != null && <img src={getQrCode.logintoken} alt="QR Code" width="40%" height="40%" style={{display:"block",alignItems:"center",justifyContent:"center", marginLeft: "auto",
//   marginRight: "auto"}}/> } */}
//             </div>
//             <Form >
//                 <div className="form-group" >
//                     <label for="code">Enter Authentication Code:</label>
//                     <input type="text" name="code" placeholder="6 Digit Code" style={{width:"90%"}} className="form-control"
//                      // value={getQrCode.qrpassword}
//                       onChange={(val) => {
//                     //    dispatch(InputChange({
//                     //       props: "qrpassword",
//                     //       value: val.target.value,
//                     //       error: "qrpasswordError",
//                     //     }));
//                       }}
//                       />
//                 </div>
//                 <Button
//                     className="btn jr-btn-rounded btn-primary btn-rounded mb-4"
//                     onClick={handleSubmit}
//                   >
//                     Validate

//                   </Button>
//             </Form>

//             <div className="form-group">
//             Click here to <a href="prathapv35@gmail.com">Contact Support</a> if you are facing any issue.
//                 Click here to <a href="/">Login</a> if you entered a Wrong credentials.
//             </div>
//         </div>
//         </div>
//                 </div>
//                 <div className="m-t-80 text-center">
//                <p className="text-muted">© 2022 Syneins. Crafted with <i className="mdi mdi-heart text-danger"></i> by Syneins</p>
//             </div>
//             </div>

//     </div>
//   );
// }
