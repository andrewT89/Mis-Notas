import { NgModule } from '@angular/core';
import {
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatListModule,
    MatGridListModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSnackBarModule ,
    MatTabsModule} from '@angular/material';

const modules = [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatListModule,
    MatGridListModule,
    MatRadioModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatSnackBarModule,
    MatTabsModule
];

@NgModule({
    imports: modules,
    exports: modules
})
export class MaterialModule {}
