import { ICustomer } from "data/types/customer.types";
import { SalesPortalPage } from "../salesPortal.page";

export class AddNewCustomerPage extends SalesPortalPage {
  readonly title = this.page.locator("h2.page-title-text");
  readonly emailInput = this.page.locator("#inputEmail");
  readonly nameInput = this.page.locator("#inputName");
  readonly countrySelect = this.page.locator("#inputCountry");
  readonly cityInput = this.page.locator("#inputCity");
  readonly streetInput = this.page.locator("#inputStreet");
  readonly houseInput = this.page.locator("#inputHouse");
  readonly flatInput = this.page.locator("#inputFlat");
  readonly phoneInput = this.page.locator("#inputPhone");
  readonly notesInput = this.page.locator("#textareaNotes");
  readonly saveButton = this.page.locator("#save-new-customer");

  readonly uniqueElement = this.title;

  async fillForm(customer: Partial<ICustomer>) {
    if (customer.email) await this.emailInput.fill(customer.email);
    if (customer.name) await this.nameInput.fill(customer.name);
    if (customer.country) await this.countrySelect.selectOption(customer.country);
    if (customer.city) await this.cityInput.fill(customer.city);
    if (customer.street) await this.streetInput.fill(customer.street);
    if (customer.house !== undefined) await this.houseInput.fill(customer.house.toString());
    if (customer.flat !== undefined) await this.flatInput.fill(customer.flat.toString());
    if (customer.phone) await this.phoneInput.fill(customer.phone);
    if (customer.notes !== undefined) await this.notesInput.fill(customer.notes);
  }

  async clickSave() {
    await this.saveButton.click();
  }
}
