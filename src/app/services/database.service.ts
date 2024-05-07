import { Injectable } from '@angular/core';
import { DocumentData, Firestore, QuerySnapshot, addDoc, collection, collectionData, getDocs, orderBy, serverTimestamp,query } from '@angular/fire/firestore';
import { User } from '../classes/user';
import { Observable, map } from 'rxjs';import { Message } from '../interfaces/message';
;

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(public firestore: Firestore) { }


  saveUserDatabase(user: User): void {
    try {
      addDoc(collection(this.firestore, 'users'), {
        username: user.username,
        email: user.email,
        password: user.password,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  saveLog(username: string): void {
    try {
      addDoc(collection(this.firestore, 'logs'), {
        username: username,
        date: serverTimestamp()
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  findUsernameDatabase(email: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      let username = "";

      getDocs(collection(this.firestore, 'users'))
        .then((querySnapshot: QuerySnapshot<DocumentData>) => {
          querySnapshot.forEach((document) => {
            if (email == document.data()['email']) {
              username = document.data()['username']
              resolve(username);
            }
          })
          resolve(username);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
          reject(error);
        })
    })
  }

  isUsernameAvailable(username: string): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      let available = true;

      getDocs(collection(this.firestore, 'users'))
        .then((querySnapshot: QuerySnapshot<DocumentData>) => {
          querySnapshot.forEach((document) => {
            if (username == document.data()['username']) {
              available = false;
              resolve(available);
            }
          })
          resolve(available);
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
          reject(error);
        })
    })
  }

  //messages
  getMessages(): Observable<Message[]> {
    const data = query(collection(this.firestore, 'messages'), orderBy('time', 'asc'));
    return collectionData<any>(data)
    .pipe(map( (messages : Message[]) => {
        return messages.map( (message : any) => ({
          username: message.username,
          message: message.message,
          time: message.time.toDate() 
        }));
      })
    ) as Observable<Message[]>
  }

  
  sendMessage(username : string, message: string) : void
  {
    try {
      const date = new Date();
      addDoc(collection(this.firestore,"messages"),{
        username: username,
        message: message,
        time: date
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

}
