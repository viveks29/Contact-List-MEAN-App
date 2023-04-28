import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from './contact';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>('http://localhost:3000/api/contacts');
  }

  addContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>('http://localhost:3000/api/contact',contact);
  }

  deleteContact(_id: string): Observable<any> {
    return this.http.delete<any>('http://localhost:3000/api/contact/'+_id);
  }
}
