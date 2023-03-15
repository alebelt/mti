import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css']
})
export class DialogConfirmComponent implements OnInit {

  public reasonForm!: FormGroup;
  
  constructor() { }

  ngOnInit(): void {
    this.reasonForm = new FormGroup({
      reason: new FormControl("", [Validators.required, Validators.minLength(10)])
    });
  }

    //method for error in login
    public hasError = (controlName: string, errorName: string) => {
      return this.reasonForm.controls[controlName].hasError(errorName);
    };


}
