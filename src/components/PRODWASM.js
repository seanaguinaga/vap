import MediaInfo from "mediainfo.js";

const readChunk = (file) => (chunkSize, offset) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target.error) {
        reject(event.target.error);
      }
      resolve(new Uint8Array(event.target.result));
    };
    reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize));
  });

const handleChange = async (event) => {
  const file = event.target.files[0];
  try {
    let mediainfo = await MediaInfo();
    let result = await mediainfo.analyzeData(() => file.size, readChunk(file));
    console.log("RESULT", result);
  } catch (error) {
    console.log(error);
  }
};
function PRODWASM() {
  return <input type="file" onChange={handleChange} />;
}

export default PRODWASM;
