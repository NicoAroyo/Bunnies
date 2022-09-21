import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";

const blobSasUrl =
  "https://fakelookstorage.blob.core.windows.net/uploads?sp=racwdl&st=2022-09-21T10:01:01Z&se=2022-09-21T18:01:01Z&sv=2021-06-08&sr=c&sig=Wat1tQNDJxz631OdHxOqb%2Fp%2BPxRDqlWmRRBb5WBXpTc%3D";

export class BlobService {
  #blobServiceClient = new BlobServiceClient(blobSasUrl);
  #containerClient = this.#blobServiceClient.getContainerClient("uploads");

  async uploadFiles(file) {
    const blockBlobClient = this.#containerClient.getBlockBlobClient(file.name);
    const f = await blockBlobClient.uploadBrowserData(file);
    return f._response.request.url;
    // const promises = [];
    // files.forEach((file) => {
    //   const blockBlobClient = this.#containerClient.getBlockBlobClient(
    //     file.name
    //   );
    //   promises.push(blockBlobClient.uploadBrowserData(file));
    // });
    // const uploadedImages = await Promise.all(promises);
    // return uploadedImages.map((f) => f._response.request.url);
  }
}
