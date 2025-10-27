import { SalesPortalPage } from "../salesPortal.page";

export class DeleteProductModal extends SalesPortalPage {
  readonly uniqueElement = this.page.locator("div.modal-content", {
    has: this.page.locator("h5.modal-title", { hasText: "Delete Product" }),
  });

  readonly title = this.uniqueElement.locator("h5.modal-title");
  readonly closeButton = this.uniqueElement.locator("button.btn-close");
  readonly confirmDeleteButton = this.uniqueElement.locator("button.btn-danger", {
    hasText: "Yes, Delete",
  });
  readonly cancelButton = this.uniqueElement.locator("button.btn-secondary", {
    hasText: "Cancel",
  });

  async clickClose() {
    await this.closeButton.click();
  }

  async clickConfirmDelete() {
    await this.confirmDeleteButton.click();
  }

  async clickCancel() {
    await this.cancelButton.click();
  }
}
