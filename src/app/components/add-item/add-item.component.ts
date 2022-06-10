import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { ItemService } from 'src/app/shared/item.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
export interface Language {
  name: string;
}
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css'],
})
export class AddItemComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  languageArray: Language[] = [];
  @ViewChild('chipList') chipList;
  @ViewChild('resetItemForm') myNgForm;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  itemForm: FormGroup;
  BindingType: any = [
    'Type 1',
    'Type 2',
  ];
  ngOnInit() {
    this.itemApi.GetItemList();
    this.submitItemForm();
  }
  constructor(public fb: FormBuilder, private itemApi: ItemService) {}
  /* Remove dynamic languages */
  remove(language: Language): void {
    const index = this.languageArray.indexOf(language);
    if (index >= 0) {
      this.languageArray.splice(index, 1);
    }
  }
  /* Reactive item form */
  submitItemForm() {
    this.itemForm = this.fb.group({
      item_name: ['', [Validators.required]],
      languages: [this.languageArray],
    });
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.itemForm.controls[controlName].hasError(errorName);
  };
  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.languageArray.length < 5) {
      this.languageArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.itemForm.get('publication_date').setValue(convertDate, {
      onlyself: true,
    });
  }
  /* Reset form */
  resetForm() {
    this.languageArray = [];
    this.itemForm.reset();
    Object.keys(this.itemForm.controls).forEach((key) => {
      this.itemForm.controls[key].setErrors(null);
    });
  }
  /* Submit item */
  submitItem() {
    if (this.itemForm.valid) {
      this.itemApi.AddItem(this.itemForm.value);
      this.resetForm();
    }
  }
}