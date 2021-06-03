import React from "react";
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

function DEVWASM() {
  let handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files?.[0];

    if (!file) {
      return;
    }

    let result: Result = await wasmWorker.wasm(file);

    console.log(result);
  };
  return <input type="file" onChange={handleChange} />;
}

export default DEVWASM;

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
