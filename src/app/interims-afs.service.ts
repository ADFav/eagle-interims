import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  DocumentChangeAction,
  DocumentData,
  AngularFirestoreCollection,
  QueryFn,
  Query,
  CollectionReference
} from 'angularfire2/firestore';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class InterimsAFSService {

  private examPath: string;
  private examsQuestions;
  constructor(
    private afs: AngularFirestore
  ) { }

  createReference<TYPE>(document: DocumentChangeAction<DocumentData>) {
    return { path: document.payload.doc.ref.path, data: document.payload.doc.data() as TYPE };
  }

  setExamPath = path => this.examPath = path;

  getSnapshotAsHashMap<TYPE>(path: string, limit?: number) {
    let col: AngularFirestoreCollection;
    let query: QueryFn = (ref: CollectionReference) => {
      let result: Query = ref;
      if (limit) {
        result = result.limit(limit)
      }
      return result;
    }
    col = this.afs.collection<TYPE>(path, query)

    return col.snapshotChanges().pipe(map(refs =>
      refs
        .map(ref => this.createReference<TYPE>(ref))
        .reduce(this.arrayToHashMap, {})
    ))
  }

  arrayToHashMap(obj, newReference) {
    obj[newReference.id] = newReference.data;
    return obj;
  }

  convertHashMapToArray(hashmap) {
    let result = Object.keys(hashmap).map(key => ({ id: key, data: hashmap[key] }));
    return result;
  }
}


