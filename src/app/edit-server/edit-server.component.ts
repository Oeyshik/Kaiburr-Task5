import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Server } from '../server';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent {
  editedServer: Server;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<EditServerComponent>,
    private serverService: ServerService
  ) {
    // Initialize the editedServer with the selected server data
    this.editedServer = { ...data.server };
  }

  onSubmit() {
    // Send an HTTP request to update the server data on the server
    this.serverService.updateServer(this.editedServer).subscribe((updatedServer: Server) => {
      // Close the dialog and pass the updated server data back
      this.dialogRef.close(updatedServer);
    });
  }

  onCancel() {
    // Close the dialog without saving changes
    this.dialogRef.close();
  }
}
