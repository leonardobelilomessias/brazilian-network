                        import { useEffect } from 'react';
import { collection, doc, setDoc, getFirestore } from 'firebase/firestore';
import { db } from './firebase';
import { IProduct } from '@/app/types/types';
 // Supondo que você tenha exportado a instância do app do Firebase

export  async function createFavorite  (user_id:string,data:IProduct) {


    // Referência para a coleção aninhada dentro do documento principal
    const documentId = data.id || 'id-padrao';
    const nestedDocRef = doc(db, 'users', user_id, 'favorites', documentId);
      try {
        await setDoc(nestedDocRef, data, { merge: true });
      } catch (error) {
        console.error('Erro ao inserir documento aninhado: ', error);
      }

}
    



