import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControl from '@mui/material/FormControl'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'

type FormikErrorType = {
	email?: string
	password?: string
	confirmPassword?: string
	rememberMe?: boolean
}

//TODO: improve validation:
// onBlur (#16)
//change error color
//formik.resetForm() в onSubmit

export const Login = () => {
	const dispatch = useDispatch()

	const formik = useFormik({
		initialValues: {
			email: '',
			password: '',
			rememberMe: false,
		},
		validate: (values) => {
			const errors: FormikErrorType = {}

			if (!values.email) {
				errors.email = 'Email is required'
			} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
				errors.email = 'Invalid email address'
			}

			if (!values.password) {
				errors.password = 'Password is required'
			} else if (values.password.length < 8) {
				errors.password = 'Must be 8 characters or more'
			}

			return errors
		},
		onSubmit: (values) => {
			// dispatch(loginTC(values))
		},
	})

	return (
		<Grid container justifyContent={'center'}>
			<Grid item justifyContent={'center'}>
				<FormControl>
					<FormLabel>
						<p>
							To log in get registered
							<a href={'https://social-network.samuraijs.com/'} target={'_blank'}>
								{' '}
								here
							</a>
						</p>
						<p>or use common test account credentials:</p>
						<p>Email: free@samuraijs.com</p>
						<p>Password: free</p>
					</FormLabel>
					<FormGroup>
						<TextField label="Email" margin="normal" {...formik.getFieldProps('email')} />
						{formik.errors.email ? <div>{formik.errors.email}</div> : null}
						<TextField type="password" label="Password" margin="normal" {...formik.getFieldProps('password')} />
						{formik.errors.password ? <div>{formik.errors.password}</div> : null}
						<FormControlLabel
							label={'Remember me'}
							control={<Checkbox {...formik.getFieldProps('rememberMe')} checked={formik.values.rememberMe} />}
						/>{' '}
						<Button type={'submit'} variant={'contained'} color={'primary'}>
							Login
						</Button>
					</FormGroup>
				</FormControl>
			</Grid>
		</Grid>
	)
}
