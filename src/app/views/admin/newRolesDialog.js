import React from 'react'
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    useTheme,
    TextField,
    CircularProgress,
    InputLabel,
    useMediaQuery,
    Select,
} from '@mui/material'

import IntlMessages from '../../utils/IntlMessages'
import 'react-notifications/lib/notifications.css'
import { NotificationManager } from 'react-notifications'
export default function NewRolesDialog(props) {
    const [open, setOpen] = React.useState(false)
    const theme = useTheme()
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))
    function handleClickOpen() {
        setOpen(true)
    }
    function handleClose() {
        // setOpen(false);
        props.closePopup()
    }
    function savePass() {
        // setOpen(false);
      //  console.log(props.selectedRoles.length)
        if (props.selectedRoles.length > 0 && props.roleName != '') {
            props.newRoleUpdate(props)
        } else {
            if (props.roleName == '') {
                NotificationManager.error("Role name can't empty")
            } else {
                NotificationManager.error('Select any one roles')
            }
        }
        //
    }
    const buttonProgress = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    }
    const handleChangeMultiple = (event) => {
        const { options } = event.target
        const value = []
        for (let i = 0, l = options.length; i < l; i += 1) {
            if (options[i].selected) {
                value.push(options[i].value)
            }
        }
        props.adminInputChange({
            prop: 'selectedRoles',
            value: value,
            error: 'selectedRolesError',
        })
    }
    return (
        <div>
            <Dialog
                fullWidth={true}
                fullScreen={fullScreen}
                open={props.popupStatus}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    Roles Menu Allocation
                </DialogTitle>
                <DialogContent>
                    <div className="p-9 h-full" style={{margin:5}}>
                        <TextField
                          //  className="mb-6 w-full"
                            variant="outlined"
                            label="Role Name"
                            type="text"
                            onChange={(value) =>
                                props.adminInputChange({
                                    prop: 'roleName',
                                    value: value.target.value,
                                    error: 'roleNameError',
                                })
                            }
                            name="newPassword"
                            value={props.roleName}
                        />

                        <InputLabel
                            style={{ paddingLeft: '20px' }}
                            id="demo-mutiple-chip-label"
                        >
                            Roles
                        </InputLabel>
                        <Select
                            multiple
                            native
                            //autoWidth
                            label="Roles"
                            style={{ width: '100%' }}
                            value={props.selectedRoles}
                            onChange={handleChangeMultiple}
                            inputProps={{
                                id: 'select-multiple-native',
                            }}
                        >
                            {props.menuList.map((option) => (
                                <option key={option.uid} value={option.uid}>
                                    {option.menuName}
                                </option>
                            ))}
                        </Select>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button
                    className="closeNewRoles"
                    onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <div className="flex flex-wrap items-center mb-4 p-4">
                        <div style={{ position: 'relative' }}>
                            <Button
                            className="saveNewRoles"
                                variant="contained"
                                color="primary"
                                onClick={savePass}
                                disabled={props.loading}
                                type="button"
                            >
                                Save
                            </Button>
                            {props.loader && (
                                <CircularProgress
                                    size={24}
                                    style={buttonProgress}
                                />
                            )}


                            
                        </div>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    )
}
