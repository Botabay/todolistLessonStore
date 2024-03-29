import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { authAPI } from '../../api/todolists-api';
import { useAppDispatch, useAppSelector } from '../../app/store';
import { loginTC } from '../authReducer';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}
export type LoginDataType = {
    email: string
    password: string
    rememberMe?: boolean
}
export const Login = () => {
    const a=useAppSelector((s)=>s.auth.isLoggedIn)
    const dispatch = useAppDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (values.password.length < 4) {
                errors.password = 'short password'
            }
            return errors
        },
        onSubmit: values => {
            // alert(JSON.stringify(values));
            dispatch(loginTC(values))

            formik.resetForm()
        },
    })
    // LoginPage && isLoggedIn === true ---> Redirect to Main page
    if (a) return <Navigate to ='/' />
    // MainPage && isLoggedIn === false ---> Redirect to Login page
    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                                target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"

                            // name='email'
                            // onChange={formik.handleChange}
                            // value={formik.values.email}
                            // onBlur={formik.handleBlur}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email && <p>{formik.errors.email}</p>}
                        <TextField
                            type="password"
                            label="Password"
                            margin="normal"

                            // name='password'
                            // onChange={formik.handleChange}
                            // value={formik.values.password}
                            // onBlur={formik.handleBlur}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password && <p>{formik.errors.password}</p>}
                        <FormControlLabel
                            label={'Remember me'}

                            control={<Checkbox
                                // name='rememberMe'
                                // onChange={formik.handleChange}
                                //value={formik.values.rememberMe}
                                {...formik.getFieldProps('rememberMe')}
                                checked={formik.values.rememberMe}
                            />}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}