import { useAuth } from '@/context/AuthContext';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogProps, DialogTitle, Tab, Tabs, TextField } from '@mui/material';
import React from 'react'
import Loading from './Loading';
import { constants } from 'fs/promises';

export interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
}

export default function LoginD(props: LoginDialogProps) {
    const { onClose, open } = props;
    const { signup, login, loading, updateUserName } = useAuth();
    const [isLogin, setIsLogin] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordC, setPasswordC] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [errorMessages, setErrorMessages] = React.useState({
        email: '',
        password: '',
        passwordC: '',
        firstName: '',
        lastName: '',
        general: '',
    })

    const handleClose = () => {
        onClose();
    };

    const handleSwitchSignUpClick = () => {
        resetErrorMessages();
        setIsLogin(!isLogin);
    };

    const resetInput = () => {
        setEmail('');
        setPassword('');
        setPasswordC('');
        setFirstName('');
        setLastName('');
    }

    const resetErrorMessages = () => {
        setErrorMessages({
            email: '',
            password: '',
            passwordC: '',
            firstName: '',
            lastName: '',
            general: '',
        });
    };

    async function handleSignUpClick() {
        resetErrorMessages();
        try {
            // Basic validation
            if (email === '' || password === '' || password.length < 6) {
                setErrorMessages((prev) => ({
                    ...prev,
                    email: email === '' ? 'Email is required' : '',
                    password: password === '' ? 'Password is required' : password.length < 6 ? 'Password must be at least 6 characters' : '',
                }));
                return;
            }

            if (password !== passwordC) {
                setErrorMessages((prev) => ({
                    ...prev,
                    passwordC: 'Passwords do not match',
                }));
                return;
            }


            const res = await signup(email, password);
            await updateUserName(res.user, firstName, lastName);
            onClose();
            resetInput();
            resetErrorMessages();
        } catch (err: any) {
            setErrorMessages((prev) => ({
                ...prev,
                email: err.code == 'auth/invalid-email' ? err.message : '',
                general: err.code !== 'auth/invalid-email' ? err.message : '',
            }));
        }
    }

    async function handleLoginClick(): Promise<void> {
        resetErrorMessages();
        try {
            // Basic validation
            if (email === '' || password === '') {
                setErrorMessages((prev) => ({
                    ...prev,
                    email: email === '' ? 'Email is required' : '',
                    password: password === '' ? 'Password is required' : '',
                }));
                return;
            }

            await login(email, password);
            onClose();
            resetInput();
            resetErrorMessages();
        }
        catch (error: any) {
            const emailErrorCodes = ['auth/invalid-email'];
            const generalErrorCodes = ['auth/invalid-credential', 'auth/too-many-requests', 'auth/network-request-failed']
            setErrorMessages((prev) => ({
                ...prev,
                email: emailErrorCodes.includes(error.code) ? error.message : '',
                general: generalErrorCodes.includes(error.code) ? error.message : '',
            }));
        }
    }

    return (
        <Dialog open={open} >
            <h2 className='px-6 py-5 bold pb-0'>{isLogin ? 'Login' : 'SignUp'}</h2>
            <div style={{ width: '350px' }} className='px-6 py-5 pt-0'>
                <TextField
                    required
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    value={email}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setEmail(event.target.value);
                        setErrorMessages((prev) => ({
                            ...prev,
                            email: '',
                        }));
                    }}
                    error={errorMessages.email !== ''}
                    helperText={errorMessages.email}
                />
                <TextField
                    required
                    id="password-input"
                    label="Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    fullWidth
                    value={password}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPassword(event.target.value);
                        setErrorMessages((prev) => ({
                            ...prev,
                            password: '',
                        }));
                    }}
                    error={errorMessages.password !== ''}
                    helperText={errorMessages.password}
                />
                {!isLogin ? <TextField
                    required
                    id="password-input"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    variant="standard"
                    fullWidth
                    value={passwordC}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setPasswordC(event.target.value);
                        setErrorMessages((prev) => ({
                            ...prev,
                            passwordC: '',
                        }));
                    }}
                    error={errorMessages.passwordC !== ''}
                    helperText={errorMessages.passwordC}
                /> : null
                }
                {!isLogin ?
                    <div className='flex items-center gap-x-6'>
                        <TextField
                            margin="dense"
                            id="first-Name"
                            name="firstName"
                            label="First Name"
                            type="text"
                            variant="standard"
                            value={firstName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setFirstName(event.target.value);
                                setErrorMessages((prev) => ({
                                    ...prev,
                                    firstName: '',
                                }));
                            }}
                            error={errorMessages.firstName !== ''}
                            helperText={errorMessages.firstName}
                        />
                        <TextField
                            margin="dense"
                            id="last-Name"
                            name="lastName"
                            label="Last Name"
                            type="text"
                            variant="standard"
                            value={lastName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setLastName(event.target.value);
                                setErrorMessages((prev) => ({
                                    ...prev,
                                    lastName: '',
                                }));
                            }}
                            error={errorMessages.lastName !== ''}
                            helperText={errorMessages.lastName}
                        />
                    </div>
                    : null}
                {errorMessages.general !== '' ? <div className='px-0 py-3 text-sm' style={{ color: 'red' }}>{errorMessages.general}</div> : null}

                <div className='px-0 py-4' style={{ fontSize: '12px' }}>
                    <div>
                        {isLogin ? 'Not a member?' : 'Have acounnt?'}
                        <a onClick={handleSwitchSignUpClick}
                            style={{ marginLeft: '8px' }}
                            className='relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500'>
                            {isLogin ? 'Signup' : 'Login'}</a>
                    </div>
                </div>
            </div>

            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                {
                    loading ? <Loading></Loading> :
                        <div>
                            {isLogin ? <Button type="submit" onClick={handleLoginClick}>Login</Button>
                                : <Button type="submit" onClick={handleSignUpClick}>Signup</Button>}
                        </div>
                }
            </DialogActions>
        </Dialog >
    )
}
