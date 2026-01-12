type InputChangeEvent = Event & { target: (EventTarget & { files?: FileList }) | null };

/**
 * Load a file
 *
 * @param {File} file File to load
 * @returns {Promise<string>} Data URL of the file
 */
export async function load(file: File): Promise<string> {
	return await new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.addEventListener('load', () => resolve(URL.createObjectURL(file)));
		fileReader.addEventListener('error', () => reject(new Error(`Failed to load file: ${file.name}`)));
		fileReader.readAsDataURL(file);
	});
}

/**
 * Download a Blob object into user files
 *
 * @param {Blob} blob Blob object to download
 * @param {Object} params Download parameters
 * @param {string} params.filename Downloaded file name
 */
export function download(blob: Blob, { filename }: { filename: string }): void {
  const link = document.createElement('a');
  link.setAttribute('href', URL.createObjectURL(blob));
  link.setAttribute('download', filename);

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Upload a file from user files
 *
 * @param {Function} onLoad Callback called once the file is loaded
 * @param {string} [accept=''] MIME type the file input should accept
 */
export function upload(onLoad: (dataUrl: string) => void, accept: string = ''): void {
  const input = document.createElement('input');
  input.setAttribute('type', 'file');
  input.setAttribute('accept', accept);

  input.addEventListener('change', (event: InputChangeEvent) => {
    const file = event.target?.files?.[0];
    if (file) {
      const fileReader = new FileReader();
      fileReader.addEventListener('load', () => onLoad(URL.createObjectURL(file)));
      fileReader.readAsDataURL(file);
    }
  });

  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
}

/**
 * Share a Blob object with the user's device
 *
 * @param {Blob} blob Blob object to share
 * @param {ShareData} params Share parameters
 * @param {string} params.filename Shared file name
 * @returns {Promise<void>}
 */
export async function share(blob: Blob, { filename, ...data }: { filename: string } & ShareData): Promise<void> {
	const file = new File([blob], filename, { type: blob.type });
	try {
		if (!navigator?.canShare({ files: [file] })) {
			const error = new Error(`Failed to share file: ${filename}`);
			error.name = 'NotAllowedError';
			throw error;
		}
		await navigator.share({ files: [file], ...data });
	} catch (error) {
		if (error instanceof Error && error.name === 'NotAllowedError') {
			download(blob, { filename });
		}
	}
}
