import worker from "../mediainfo.worker";

const { wasm } = worker();

const handleChange = (event) => {
  const file = event.target.files[0];
  wasm(file).then((result) => {
    console.log(result);
  });
};

function WASM() {
  return <input type="file" onChange={handleChange} />;
}

export default WASM;
