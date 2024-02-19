type InputChangeEvent = Event & { target: (EventTarget & { files?: FileList }) | null };

/**
 * Download a Blob object into user files
 *
 * @param {Blob} blob       Blob object to download
 * @param {string} filename Downloaded file name
 */
export function download(blob: Blob, filename: string): void {
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
 * @param {Function} onLoad    Callback called once the file is loaded
 * @param {string} [accept=''] Types the file input should accept
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
