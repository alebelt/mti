import { Injectable } from '@angular/core';
import { Item } from './item';
import { AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root',
})
export class ItemService {
  itemsRef: AngularFireList<any>;
  itemRef: AngularFireObject<any>;
  constructor(private db: AngularFireDatabase) {}
  /* Create item */
  AddItem(item: Item) {
    this.itemsRef
      .push({
        item_name: item.nombre,
      })
      .catch((error) => {
        this.errorMgmt(error);
      });
  }
  /* Get item */
  GetItem(id: string) {
    this.itemRef = this.db.object('items-list/' + id);
    return this.itemRef;
  }
  /* Get item list */
  GetItemList() {
    this.itemsRef = this.db.list('items-list');
    //this.itemsRef = this.db.list('cursos')
    return this.itemsRef;
  }
  /* Update item */
  UpdateItem(id, item: Item) {
    this.itemRef
      .update({
        item_name: item.nombre,
      })
      .catch((error) => {
        this.errorMgmt(error);
      });
  }
  /* Delete item */
  DeleteItem(id: string) {
    this.itemRef = this.db.object('items-list/' + id);
    this.itemRef.remove().catch((error) => {
      this.errorMgmt(error);
    });
  }
  // Error management
  private errorMgmt(error) {
    console.log(error);
  }
}