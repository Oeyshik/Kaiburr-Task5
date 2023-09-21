import { Component, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ServerService } from '../server.service';
import { Server } from '../server';

@Component({
  selector: 'app-create-server',
  templateUrl: './create-server.component.html',
  styleUrls: ['./create-server.component.css']
})
export class CreateServerComponent {
  newServer: Server = new Server();
  showSuccessMessage = false;

  @ViewChild('successAlert') successAlert!: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<CreateServerComponent>,
    private serverService: ServerService
  ) {}

  createServer() {
    this.serverService.createServer(this.newServer).subscribe(
      (data: Server) => {
        console.log('Server created:', data);

        // Show the success message
        this.showSuccessMessage = true;

        // Close the dialog after a delay
        setTimeout(() => {
          this.dialogRef.close();
        }, 2000); // Close the dialog after 2 seconds (2000 milliseconds)
      },
      (error) => {
        console.error('Error creating server:', error);
        // Handle error cases here if needed
      }
    );
  }

  closeDialog() {
    // Close the dialog without creating a server
    this.dialogRef.close();
  }
}
