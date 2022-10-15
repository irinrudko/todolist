import { Box, SvgIcon, TextField } from '@mui/material'
import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded'
import { makeStyles } from '@mui/styles'

export type AddItemFormType = {
	addItem: (title: string) => void
	label?: string
}

const useStyles = makeStyles({
	container: {
		display: 'flex',
		justifyContent: 'flex-end',
		alignItems: 'center',
		padding: '10px',
		minHeight: 'fit-content',
	},
	input: {
		// paddingRight: '5px',
	},
})

export const AddItemForm: React.FC<AddItemFormType> = React.memo((props) => {
	const classes = useStyles()

	let [title, setTitle] = useState('')
	let [error, setError] = useState<string | null>(null)

	const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setTitle(e.currentTarget.value)
	}
	const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
		if (error !== null) {
			setError(null)
		}
		if (e.key === 'Enter') {
			addItem()
		}
	}
	const addItem = () => {
		if (title.trim() !== '') {
			props.addItem(title.trim())
			setTitle('')
		} else {
			setError('Title is required')
		}
	}

	return (
		<>
			<Box>
				<div className={classes.container}>
					<TextField
						label={props.label}
						color="primary"
						variant="outlined"
						autoFocus
						value={title}
						onChange={onChangeHandler}
						onKeyPress={onKeyPressHandler}
						className={error ? 'error' : ''}
						error={!!error}
						helperText={error}
						type="text"
						name="fieldX"
						autoComplete="my-site-field-x"
					/>

					<SvgIcon onClick={addItem} color="primary" sx={{ fontSize: 40 }}>
						<AddCircleRoundedIcon />
					</SvgIcon>
				</div>
			</Box>
		</>
	)
})
