import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { MatPaginatorIntl, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Subject } from 'rxjs';

@Injectable()
export class MyCustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  firstPageLabel = 'Première page';
  itemsPerPageLabel = 'Joueurs par page:';
  lastPageLabel = 'Dernière page';
  nextPageLabel = 'Page suivante';
  previousPageLabel = 'Page précédente';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return 'Page 1 sur 1';
    }
    const amountPages = Math.ceil(length / pageSize);
    return `Page ${page + 1}/${amountPages}`;
  }
}

/**
 * @title Paginator internationalization
 */
@Component({
  selector: 'paginator-intl',
  templateUrl: '../html/paginator.component.html',
  imports: [MatPaginatorModule],
  standalone: true,
  providers: [{ provide: MatPaginatorIntl, useClass: MyCustomPaginatorIntl }],
})

export class PaginatorIntl {
  @Input() length: number = 200;
  @Output() paginatorEvent: EventEmitter<any> = new EventEmitter<any>();

  pageSize = 10;
  currentPage = 0;

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.paginatorEvent.emit({ currentPage: this.currentPage, pageSize: this.pageSize });
  }
}