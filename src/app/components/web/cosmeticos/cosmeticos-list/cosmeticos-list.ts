import {Component, inject, OnInit} from '@angular/core';
import {DataService} from '../../../../service/data-service';
import {ApiResponseCosmeticosByPage, Cosmetico} from '../../../../common/interfaces';
import {RouterLink} from '@angular/router';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faEdit, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {NgbPagination} from '@ng-bootstrap/ng-bootstrap';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'app-cosmeticos-list',
  imports: [
    RouterLink,
    FaIconComponent,
    NgbPagination,
    CurrencyPipe
  ],
  templateUrl: './cosmeticos-list.html',
  styleUrl: './cosmeticos-list.css',
})
export class CosmeticosList implements OnInit {
    private readonly dataService: DataService = inject(DataService);
    apiData !: ApiResponseCosmeticosByPage;
    cosmeticoList: Cosmetico[] = [];
    currentPage: number = 1;
    loaded = false;

    ngOnInit() {
      this.loadCosmeticos();
    }

  private loadCosmeticos() {
    this.dataService.getCosmeticosByPage(this.currentPage).subscribe( {
      next : data => {
        this.cosmeticoList = data.cosmeticos.cosmeticos;
        this.apiData=data
        this.loaded = true;
      },error : err => {
      }
    })
  }
  deleteCosmetico(cosmetico: Cosmetico){
    if (confirm('Deseja eliminar'+ cosmetico.name +'?')) {
      this.dataService.deleteCosmetico(cosmetico._id).subscribe(({
        next: data => {
          alert(data.message);
          this.loadCosmeticos();
        },
        error: error => {
          console.error(error);
        }
      }))

    }

  }
  changePage(event: number) {
    this.currentPage = event;
    this.loadCosmeticos();

  }

  protected readonly faEdit = faEdit;
  protected readonly faTrashCan = faTrashCan;
}
