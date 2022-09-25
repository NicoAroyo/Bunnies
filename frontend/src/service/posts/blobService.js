import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";

const blobSasUrl =
  "https://fakelookstorage.blob.core.windows.net/uploads?sp=racwdli&st=2022-09-22T07:26:51Z&se=2022-09-30T15:26:51Z&sv=2021-06-08&sr=c&sig=6a%2BewsoZrPkLfC%2FbYUPQkWiupvuKDR9HST1KC2Jva1c%3D";

export class BlobService {
  #blobServiceClient = new BlobServiceClient(blobSasUrl);
  #containerClient = this.#blobServiceClient.getContainerClient("uploads");

  async uploadFiles(file) {
    const blockBlobClient = this.#containerClient.getBlockBlobClient(file.name);
    const f = await blockBlobClient.uploadBrowserData(file);
    return f._response.request.url;
  }
}
