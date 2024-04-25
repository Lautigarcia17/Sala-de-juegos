import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'saladejuegos-3eb2a',
          appId: '1:1020137117024:web:c429cbc87d15c8082a3a05',
          storageBucket: 'saladejuegos-3eb2a.appspot.com',
          apiKey: 'AIzaSyDJyVBr8UBqTyY9HCGS30mGEFEhl_iWI4Y',
          authDomain: 'saladejuegos-3eb2a.firebaseapp.com',
          messagingSenderId: '1020137117024',
        })
      )
    ),
    importProvidersFrom(provideFirestore(() => getFirestore())), importProvidersFrom(provideFirebaseApp(() => initializeApp({"projectId":"saladejuegos-3eb2a","appId":"1:1020137117024:web:c429cbc87d15c8082a3a05","storageBucket":"saladejuegos-3eb2a.appspot.com","apiKey":"AIzaSyDJyVBr8UBqTyY9HCGS30mGEFEhl_iWI4Y","authDomain":"saladejuegos-3eb2a.firebaseapp.com","messagingSenderId":"1020137117024"}))), importProvidersFrom(provideAuth(() => getAuth())),
  ],
};
