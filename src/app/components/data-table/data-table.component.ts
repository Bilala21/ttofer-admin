import { Component, OnInit, ViewChild, AfterViewInit, Input, EventEmitter, Output } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { TableSearchFromComponent } from '../table-search-form/search-from.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    TableSearchFromComponent,
    RouterModule
  ],
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit, AfterViewInit {
  @Input() data: any
  @Input() tableType: string = "Table type";
  @Input() columns: any
  @Input() tableHeading: string = ""
  @Input() isDetail: boolean = false
  @Input() page_name: string = ''
  @Input() isMark: boolean = false
  @Input() searchPlaceholder: string = ""
  @Input() pageTitle: string = "Page title"
  @Input() searchBnText: string = "Button text"
  @Input() isSearched: boolean = true
  @Input() isEdit: boolean = false
  displayedColumns: string[] = [];
  dataSource = new MatTableDataSource<any>();
  @Output() deleteData = new EventEmitter<any>();
  @Output() searchUsers = new EventEmitter<string>();
  @Output() markAsRead = new EventEmitter<number>();
  @Output() detailView = new EventEmitter<number>();
  @Output() editRecord = new EventEmitter<number>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  viewElement(item: any) {
    this.detailView.emit(item)
  }
  handleEdit(item: any) {
    this.editRecord.emit(item)
  }

  handleMarkAsRead(id: number) {
    this.markAsRead.emit(id);
  }

  onSearchChange(searchValue: string) {
    this.searchUsers.emit(searchValue);
  }
  bulkIds: any[] = [];

  // DELETE FUNCTIONALIY
  handleCheckbox(id: any) {
    if (!this.bulkIds.includes(id)) {
      this.bulkIds.push(id);
    } else {
      this.bulkIds = this.bulkIds.filter((value: any) => value !== id);
    }
  }


  deleteRecord() {
    this.deleteData.emit(this.bulkIds);
  }
  deleteElement(id: number) {
    this.deleteData.emit([id]);
  }


  ngOnInit() {
    this.displayedColumns = this.columns.map((col: any) => col.key).concat('actions');
    this.dataSource.data = this.data;
    console.log(this.page_name);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
