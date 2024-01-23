import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatModule } from 'src/app/modules/material.module';

@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [MatModule],
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss']
})
export class DeleteDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public task: string,
    private readonly dialogRef: MatDialogRef<DeleteDialogComponent>
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

}
