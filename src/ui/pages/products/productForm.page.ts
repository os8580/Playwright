import { IProduct } from "data/types/product.types";
import { SalesPortalPage } from "../salesPortal.page";
import { logStep } from "utils/report/logStep.utils";

export class ProductFormPage extends SalesPortalPage {
  readonly title = this.page.locator("h2.page-title-text");
  readonly nameInput = this.page.locator("#inputName");
  readonly manufacturerSelect = this.page.locator("#inputManufacturer");
  readonly priceInput = this.page.locator("#inputPrice");
  readonly amountInput = this.page.locator("#inputAmount");
  readonly notesInput = this.page.locator("#textareaNotes");
  readonly saveButton = this.page.locator("button[id^='save-']");

  readonly uniqueElement = this.title;

  @logStep("Fill product form")
  async fillForm(productData: Partial<IProduct>) {
    if (productData.name) await this.nameInput.fill(productData.name);
    if (productData.manufacturer) await this.manufacturerSelect.selectOption(productData.manufacturer);
    if (productData.price !== undefined) await this.priceInput.fill(productData.price.toString());
    if (productData.amount !== undefined) await this.amountInput.fill(productData.amount.toString());
    if (productData.notes !== undefined) await this.notesInput.fill(productData.notes);
  }

  @logStep("Click Save button")
  async clickSave() {
    await this.saveButton.click();
  }
}
