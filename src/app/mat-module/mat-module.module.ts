import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatTooltipModule,
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule
} from '@angular/material';

const importsExports = [
  CommonModule,
  MatToolbarModule,
  MatTooltipModule,
  MatButtonModule,
  MatSelectModule,
  MatFormFieldModule
]

@NgModule({
  imports: importsExports,
  exports: importsExports,
  declarations: []
})
export class MatModule { }
