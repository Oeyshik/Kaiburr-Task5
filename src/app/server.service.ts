import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Server } from './server';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private baseUrl = "http://localhost:8080/api/servers"

  constructor(private http: HttpClient) { }

  // To get all servers in Server List
  getServers(): Observable<Server[]>{
    return this.http.get<Server[]>(`${this.baseUrl}`)
  }

  // To create a new server
  createServer(server: Server): Observable<Server> {
    return this.http.post<Server>(this.baseUrl, server);
  }

  // To delete a server
  deleteServer(serverId: number): Observable<void> {
    const url = `${this.baseUrl}/${serverId}`;
    return this.http.delete<void>(url);
  }

  // Update a server by ID
  updateServer(updatedServer: Server): Observable<Server> {
    const url = `${this.baseUrl}/${updatedServer.id}`;
    return this.http.put<Server>(url, updatedServer);
  }

  // Delete all servers
  deleteAllServers(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/all`);
  }

}
