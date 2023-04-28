import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [ContactService]
})
export class ContactsComponent implements OnInit {
  contacts!: Contact[];
  contact!: Contact;
  first_name!: string;
  last_name!: string;
  phone!: string;

  constructor(private contactService: ContactService) {  }

  async ngOnInit(): Promise<void> {
    this.contactService.getContacts().subscribe({
      next: contacts => this.contacts = contacts,
      error: err => console.log(err)
    });
  }

  addContact(){
    const newContact = {
      _id: "0",
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.contactService.addContact(newContact).subscribe({
      next: result => {
        console.log("success");
        this.contacts.push(result);
      },
      error: (err) => {
        console.log("Error "+ err);
      }
    })

  }

  deleteContact(_id:string){
    var contacts = this.contacts;
    this.contactService.deleteContact(_id).subscribe({
      next: result => {
        for (var i = 0; i < contacts.length; i++) {
          if (contacts[i]._id == _id) {
           contacts.splice(i, 1);
          };            
       }
      }
    });
  }
  

  

}
