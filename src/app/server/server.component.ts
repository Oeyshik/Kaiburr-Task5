import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditServerComponent } from '../edit-server/edit-server.component';
import { CreateServerComponent } from '../create-server/create-server.component';
import { ServerService } from '../server.service';
import { Server } from '../server';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  servers: Server[] = [];

  constructor(
    private serverService: ServerService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchServers();
  }

  fetchServers() {
    this.serverService.getServers().subscribe((data: Server[]) => {
      console.log(data);
      this.servers = data;
    });
  }
  openEditDialog(server: Server): void {
    const dialogRef = this.dialog.open(EditServerComponent, {
      width: '400px', // Set the width and other options
      data: { server }, // Pass the server data to the dialog
      panelClass: 'center-dialog', // Add your custom CSS class if needed
    });

    // Subscribe to the dialog's afterClosed event to receive data when the dialog is closed
    dialogRef.afterClosed().subscribe((result: Server) => {
      if (result) {
        // Update the server data in your servers array here
        // You can use a service or other logic to update the data
        const index = this.servers.findIndex(s => s.id === result.id);
        if (index !== -1) {
          this.servers[index] = result;
        }
      }
    });
  }


  deleteServer(server: Server): void {
    const serverId = parseInt(server.id, 10); // Parse server.id as a number
    if (confirm('Are you sure you want to delete the server?')){
      this.serverService.deleteServer(serverId).subscribe(() => {
        // Fetch the updated server list after deletion
        this.fetchServers();
      });
    }
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateServerComponent, {
      width: '400px', // Set the width and other options
      data: {}, // Pass any initial data if needed
      panelClass: 'center-dialog', // Add your custom CSS class if needed
    });

    // Subscribe to the dialog's afterClosed event to refresh the server list
    dialogRef.afterClosed().subscribe(() => {
      this.fetchServers();
    });
  }
}
