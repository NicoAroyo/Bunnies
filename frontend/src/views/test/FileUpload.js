import React, { useRef, useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";

const blobSasUrl =
  "https://fakelookstorage.blob.core.windows.net/?sv=2021-06-08&ss=bfqt&srt=co&sp=rwdlacupiytfx&se=2022-09-20T23:47:24Z&st=2022-09-18T15:47:24Z&spr=https,http&sig=ybYTBgfg1FR8LUsSszEWz4a2vydTjzjkwRbgpMpLhGo%3D";

export const FileUpload = () => {
  const [imageUrl, setImageUrl] = useState([]);
  ////
  const uploadFiles = async (e) => {
    try {
      console.log(e.target.files);
      const blobServiceClient = new BlobServiceClient(blobSasUrl);
      const containerClient = blobServiceClient.getContainerClient("test");
      const promises = [];
      for (const file of e.target.files) {
        const blockBlobClient = containerClient.getBlockBlobClient(file.name);
        promises.push(blockBlobClient.uploadBrowserData(file));
      }
      const uploadedImages = await Promise.all(promises);
      setImageUrl(uploadedImages.map((img) => img._response.request.url));
      console.log("DONE UPLOADING");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <div>
        <h2>UPLOAD FILES</h2>
        <input onChange={uploadFiles} type={"file"}></input>
      </div>
      {imageUrl.map((url) => {
        return <img src={url} />;
      })}
    </div>
  );
};
