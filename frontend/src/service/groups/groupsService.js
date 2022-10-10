import { API_URL } from "../../utils/constants";

export class GroupsService {
  async getPublicGroups() {
    return fetch(`${API_URL}groups`).then(this.#success).catch(this.#failure);
  }

  async requestToJoin({ groupId, sender }) {
    return fetch(`${API_URL}groups/requestToJoin/${groupId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sender }),
    })
      .then(this.#success)
      .catch(this.#failure);
  }

  async cancelRequest({ groupId, sender }) {
    return fetch(`${API_URL}groups/cancelRequest/${groupId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sender }),
    })
      .then(this.#success)
      .catch(this.#failure);
  }

  async deleteAsync(id) {
    return fetch(`${API_URL}group/${id}`, {
      method: "DELETE",
    })
      .then(this.#success)
      .catch(this.#failure);
  }

  async postAsync(item) {
    return fetch(`${API_URL}groups`, {
      method: "POST",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.#success)
      .catch(this.#failure);
  }

  async patchAsync(item, userId) {
    return fetch(`${API_URL}groups/${userId}`, {
      method: "PATCH",
      body: JSON.stringify(item),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(this.#success)
      .catch(this.#failure);
  }

  async #success(response) {
    const data = await response.json();
    return data;
  }

  #failure(response) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
}
