import { BlobServiceClient, BlockBlobClient } from "@azure/storage-blob";

const blobSasUrl =
  "https://fakelookstorage.blob.core.windows.net/uploads?sp=racwdl&st=2022-09-29T13:41:41Z&se=2022-10-19T21:41:41Z&sv=2021-06-08&sr=c&sig=Vg2fd5ZCER%2F7v0c1JvWkaWU02x%2Fflc1tAMb2w7cVpE0%3D";

export class BlobService {
  #blobServiceClient = new BlobServiceClient(blobSasUrl);
  #containerClient = this.#blobServiceClient.getContainerClient("uploads");

  async uploadFiles(file) {
    const blockBlobClient = this.#containerClient.getBlockBlobClient(file.name);
    const f = await blockBlobClient.uploadBrowserData(file);
    return f._response.request.url;
  }

  async deleteFile(fileName) {
    console.log("FILE NAME", fileName);
    const options = { deleteSnapshots: "include" };
    const blockBlobClient = this.#containerClient.getBlockBlobClient(fileName);
    await blockBlobClient.deleteIfExists(options);
  }
}
