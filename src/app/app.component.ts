import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateServerComponent } from './create-server/create-server.component';
import { ServerComponent } from './server/server.component';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'kaiburr-app';
  constructor(
    private dialog: MatDialog,
    private serverService: ServerService
    ) {} // Inject MatDialog

  openCreateServerDialog(): void {
    this.dialog.open(CreateServerComponent, {
      width: '400px', // Set the width and other options
      data: {},
      position: {left: '40%' }, // Center the dialog
      panelClass: 'center-dialog', // Add your custom CSS class if needed
    });
  }

  deleteAllServers(): void {
    if (confirm('Are you sure you want to delete all servers?')) {
      this.serverService.deleteAllServers().subscribe(() => {
        // Handle any UI updates here, such as resetting the servers array or reloading the server list
      });
    }
  }
}
