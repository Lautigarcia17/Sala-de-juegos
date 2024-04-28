import { Injectable } from '@angular/core';
import { DocumentData, Firestore, QuerySnapshot, addDoc, collection, getDocs } from '@angular/fire/firestore';
import { User } from '../classes/user';

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



}
