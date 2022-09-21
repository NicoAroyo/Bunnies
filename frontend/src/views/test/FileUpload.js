import React, { useRef, useState } from "react";
import { BlobServiceClient } from "@azure/storage-blob";

const blobSasUrl =
  "https://fakelookstorage.blob.core.windows.net/uploads?sp=racwdl&st=2022-09-21T10:01:01Z&se=2022-09-21T18:01:01Z&sv=2021-06-08&sr=c&sig=Wat1tQNDJxz631OdHxOqb%2Fp%2BPxRDqlWmRRBb5WBXpTc%3D";

export const FileUpload = () => {
  const [imageUrl, setImageUrl] = useState([]);
  ////
  const uploadFiles = async (e) => {
    try {
      console.log(e.target.files);
      const blobServiceClient = new BlobServiceClient(blobSasUrl);
      const containerClient = blobServiceClient.getContainerClient("posts");
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
