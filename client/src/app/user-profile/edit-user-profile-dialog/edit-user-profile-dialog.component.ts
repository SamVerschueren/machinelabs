import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

import { User } from '../../models/user';
import { PLACEHOLDER_USERNAME } from '../../user/user.service';

function validateNoPlaceholderName(control: AbstractControl) {
  return control.value !== PLACEHOLDER_USERNAME ? null : { placeholderName: true };
}

@Component({
  selector: 'ml-edit-user-profile-dialog',
  templateUrl: './edit-user-profile-dialog.component.html',
  styleUrls: ['./edit-user-profile-dialog.component.scss']
})
export class EditUserProfileDialogComponent implements OnInit {
  user: User;
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditUserProfileDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.user = this.data.user;
    this.form = this.formBuilder.group({
      displayName: [this.user.displayName, [Validators.required, validateNoPlaceholderName]],
      bio: this.user.bio
    });
  }

  submit(data) {
    this.user.displayName = data.displayName;
    this.user.bio = data.bio;
    this.dialogRef.close(this.user);
  }
}
