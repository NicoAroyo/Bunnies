import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";

const blobSasUrl =
  "https://fakelookstorage.blob.core.windows.net/uploads?sp=r&st=2022-09-29T07:21:59Z&se=2022-10-10T15:21:59Z&sv=2021-06-08&sr=c&sig=uD2DhdOlHa2Z449jcK%2Bvo3d%2BgVadtCeYDt3S26YA8Rs%3D";

export class BlobService {
  #blobServiceClient = new BlobServiceClient(blobSasUrl);
  #containerClient = this.#blobServiceClient.getContainerClient("uploads");

  async uploadFiles(file) {
    const blockBlobClient = this.#containerClient.getBlockBlobClient(file.name);
    const f = await blockBlobClient.uploadBrowserData(file);
    return f._response.request.url;
  }
}
