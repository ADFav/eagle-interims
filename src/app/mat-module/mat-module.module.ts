import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatTooltipModule,
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatTableModule,
  MatChipsModule,
  MatGridListModule,
  MatInputModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatDialogModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatRadioModule,
  MatListModule,
  MatCardModule
} from '@angular/material';

const importsExports = [
  CommonModule,
  MatToolbarModule,
  MatTooltipModule,
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule,
  MatSidenavModule,
  MatTableModule,
  MatChipsModule,
  MatGridListModule,
  MatInputModule,
  MatSlideToggleModule,
  MatDividerModule,
  MatDialogModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatRadioModule,
  MatListModule,
  MatCardModule
]

@NgModule({
  imports: importsExports,
  exports: importsExports,
  declarations: []
})
export class MatModule { }
