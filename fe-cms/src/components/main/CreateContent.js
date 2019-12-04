import React, { useState, useContext, useRef } from 'react';
import { GlobalErrorContext } from '../../App';
import { contentEndpoint } from '../../config';

function CreateContent() {
	const errorContext = useContext(GlobalErrorContext);
	const fileInput = useRef(null);
	const UPLOAD_LABEL_NAME = 'Choose file';
	const [obj, setData] = useState({
		imageName: '',
		imageNameError: false,
		imageDescription: '',
		imageDescriptionError: false,
		imageFiles: [],
		imageLabelName: '',
		imageFileValue: '',
		imageFilesError: false,
		qrCode: null
	});

	const isFrontendValid = () => {
		return obj.imageName && obj.imageDescription && obj.imageFiles.length;
	};

	const uploadContent = () => {
		let imageNameErr = false;
		let imageDescriptionErr = false;
		let imageFilesErr = false;

		if (!isFrontendValid()) {
			if (!obj.imageName) {
				imageNameErr = true;
			}
			if (!obj.imageDescription) {
				imageDescriptionErr = true;
			}
			if (!obj.imageFiles.length) {
				imageFilesErr = true;
			}
			setData({
				...obj,
				imageNameError: imageNameErr,
				imageDescriptionError: imageDescriptionErr,
				imageFilesError: imageFilesErr
			});
			return;
		}
		const form = new FormData();

		form.append('file', obj.imageName);
		form.append('file', obj.imageDescription);
		form.append('file', obj.imageFiles[0]);

		fetch(contentEndpoint.CREATE_CONTENT, {
			method: 'POST',
			body: form,
			credentials: 'include'
		})
			.then((res) => res.json())
			.then((x) => {
				fileInput.current.value = '';
				setData({
					...obj,
					qrCode: x,
					imageName: '',
					imageDescription: '',
					imageLabelName: UPLOAD_LABEL_NAME,
					imageFiles: []
				});
			})
			.catch((_) =>
				errorContext.dispatchError({
					type: 'global',
					payload: 'Server error ocurred'
				})
			);
	};

	return (
		<div className='main-wrapper'>
			<h2></h2>
			<input
				id='image-name'
				type='text'
				value={obj.imageName}
				name='image-name'
				placeholder='Image name'
				className={
					obj.imageNameError
						? 'error-input-container createInputLabel'
						: 'createInputLabel'
				}
				onChange={(e) =>
					setData({
						...obj,
						imageName: e.target.value,
						imageNameError: false
					})
				}
			/>
			<textarea
				id='image-description'
				name='image-description'
				value={obj.imageDescription}
				placeholder='Image description'
				rows='20'
				cols='40'
				className='ui-autocomplete-input'
				autoComplete='off'
				role='textbox'
				className={
					obj.imageDescriptionError
						? 'error-input-container createTextArea'
						: 'createTextArea'
				}
				onChange={(e) =>
					setData({
						...obj,
						imageDescription: e.target.value,
						imageDescriptionError: false
					})
				}></textarea>

			<div className='input-group'>
				<div className='input-group-prepend'>
					<span class='input-group-text' id='inputGroupFileAddon01'>
						<i class='fas fa-upload'></i>
					</span>
				</div>
				<div class='custom-file'>
					<input
						id='inputGroupFile01'
						type='file'
						ref={fileInput}
						name='image-file'
						aria-describedby='inputGroupFileAddon01'
						accept='image/x-png,image/png,image/gif,image/jpeg,image/jpg'
						className={
							obj.imageFilesError
								? 'error-input-container custom-file-input'
								: 'custom-file-input'
						}
						onChange={(e) => {
							console.log(e.target.files);
							setData({
								...obj,
								imageFiles: e.target.files,
								imageFilesError: false,
								imageLabelName: e.target.files[0].name
							});
						}}
					/>
					<label class='custom-file-label' for='inputGroupFile01'>
						{!!obj.imageLabelName
							? obj.imageLabelName
							: UPLOAD_LABEL_NAME}
					</label>
				</div>
			</div>

			<button
				type='submit'
				className='btn btn-lg btn-primary btn-block text-uppercase mt-2 imgUploadButton'
				onClick={uploadContent}>
				Submit
			</button>
			{obj.qrCode && (
				<div id='preview-mode'>
					<h3 className='qr-code-message'>
						Your QR code was successfully stored to the database!
					</h3>
					<img
						id='qr-code'
						src={obj.qrCode}
						className='mx-auto d-block'
					/>
				</div>
			)}
		</div>
	);
}

export default CreateContent;
