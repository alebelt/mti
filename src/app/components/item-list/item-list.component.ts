import { Item } from './../../shared/item';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ItemService } from 'src/app/shared/item.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent {
  dataSource: MatTableDataSource<Item>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  ItemData: any = [];
  displayedColumns: any[] = [
    '$key',
    'nombre',
    'id',
  ];
  dataItems:any;

    itemsCollection: AngularFirestoreCollection<Item>;
    items: Observable<Item[]>;



  constructor(private itemApi: ItemService, private afs: AngularFirestore) {  

      this.itemsCollection = afs.collection('cursos');
      this.items = this.itemsCollection.valueChanges(['added', 'removed']);

      this.afs.collection('cursos')
      .valueChanges().subscribe(items => {
      
      //this.dataItems is an "Any" before my constructor.
      this.dataItems = items

      //for loop allows me to get all the document's data
      // for (let i = 0; i < items.length; i++) {

      //      console.log(this.userNames);
      
      // }

      console.log('this.dataItems', this.dataItems);
    });

      console.log('this.itemsCollection',this.items);

    this.itemApi
      .GetItemList()
      .snapshotChanges()
      .subscribe((items) => {

        console.log(items)

        items.forEach((item) => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.ItemData.push(a as Item);
        });
        /* Data table */
        this.dataSource = new MatTableDataSource(this.ItemData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
      });
  }
  /* Delete */
  deleteItem(index: number, e) {
    if (window.confirm('Estas Seguro?')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.itemApi.DeleteItem(e.$key);
    }
  }
}