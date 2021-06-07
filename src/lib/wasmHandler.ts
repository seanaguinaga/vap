import MediaInfo from "mediainfo.js";
import * as worker from "../mediainfo.worker";

const devMode = process.env.NODE_ENV !== "production";

interface IWASMWorker {
  wasm: (file: File | Blob) => Promise<Result>;
}

let wasmWorker: IWASMWorker;

if (devMode) {
  //@ts-expect-error mhm
  wasmWorker = worker();
}

const readChunk =
  (file: File) =>
  (chunkSize: number, offset: number): Promise<Uint8Array> =>
    new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.error) {
          reject(event.target?.error);
        }
        resolve(
          new Uint8Array(event.target?.result as ArrayBuffer)
        ) as unknown as Uint8Array;
      };
      reader.readAsArrayBuffer(file.slice(offset, offset + chunkSize));
    });

export const handleFileChange = async (
  event: React.ChangeEvent<HTMLInputElement>
) => {
  let fileList = event.target.files;
  let file = fileList?.[0];

  if (!file) {
    return;
  }
  let objectURL = URL.createObjectURL(file);

  let name = file.name;

  if (devMode) {
    let result: Result = await wasmWorker.wasm(file);

    let track = result.media.track.find((track) => track["@type"] === "Video");

    let frameRate = Math.round(parseFloat(track?.FrameRate as string));

    console.log({ frameRate, name, objectURL });

    return { frameRate, name, objectURL };
  }

  try {
    let mediainfo = await MediaInfo();
    let result = (await mediainfo.analyzeData(
      () =>
        //@ts-expect-error weird error
        file.size,
      readChunk(file)
    )) as unknown as Result;

    let track = result.media.track.find((track) => track["@type"] === "Video");

    let frameRate = Math.round(parseFloat(track?.FrameRate as string));

    console.log({ frameRate, name, objectURL });

    return { frameRate, name, objectURL };
  } catch (error) {
    console.log(error);
  }
};

export interface Result {
  media: Media;
}

export interface Media {
  "@ref": string;
  track: Track[];
}

export interface Track {
  "@type": "General" | "Video" | "Audio";
  VideoCount?: string;
  AudioCount?: string;
  Format: string;
  Format_Profile?: string;
  CodecID: string;
  CodecID_Compatible?: string;
  FileSize?: string;
  Duration: string;
  OverallBitRate?: string;
  FrameRate: string;
  FrameCount: string;
  StreamSize: string;
  HeaderSize?: string;
  DataSize?: string;
  FooterSize?: string;
  IsStreamable?: string;
  Encoded_Application?: string;
  StreamOrder?: string;
  ID?: string;
  Format_Level?: string;
  Format_Settings_CABAC?: string;
  Format_Settings_RefFrames?: string;
  BitRate?: string;
  Width?: string;
  Height?: string;
  Stored_Height?: string;
  Sampled_Width?: string;
  Sampled_Height?: string;
  PixelAspectRatio?: string;
  DisplayAspectRatio?: string;
  Rotation?: string;
  FrameRate_Mode?: string;
  FrameRate_Mode_Original?: string;
  ColorSpace?: string;
  ChromaSubsampling?: string;
  BitDepth?: string;
  ScanType?: string;
  Title?: string;
  Encoded_Library?: string;
  Encoded_Library_Name?: string;
  Encoded_Library_Version?: string;
  colour_description_present?: string;
  colour_description_present_Source?: string;
  colour_range?: string;
  colour_range_Source?: string;
  colour_primaries?: string;
  colour_primaries_Source?: string;
  transfer_characteristics?: string;
  transfer_characteristics_Source?: string;
  matrix_coefficients?: string;
  matrix_coefficients_Source?: string;
  extra?: Extra;
  Format_AdditionalFeatures?: string;
  BitRate_Mode?: string;
  Channels?: string;
  ChannelPositions?: string;
  ChannelLayout?: string;
  SamplesPerFrame?: string;
  SamplingRate?: string;
  SamplingCount?: string;
  Compression_Mode?: string;
  StreamSize_Proportion?: string;
  Default?: string;
  AlternateGroup?: string;
}

export interface Extra {
  CodecConfigurationBox: string;
}
