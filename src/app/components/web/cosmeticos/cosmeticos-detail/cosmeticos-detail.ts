import {Component, inject, Input, OnInit} from '@angular/core';
import {Cosmetico, Toast} from '../../../../common/interfaces';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {DataService} from '../../../../service/data-service';
import {FaIconComponent, IconDefinition} from '@fortawesome/angular-fontawesome';
import {CurrencyPipe} from '@angular/common';
import {faEdit, faTrash, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {Router} from '@angular/router';
import {NgbToast} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cosmeticos-detail',
  imports: [
    ReactiveFormsModule,
    FaIconComponent,
    CurrencyPipe,
    NgbToast
  ],
  templateUrl: './cosmeticos-detail.html',
  styleUrl: './cosmeticos-detail.css',
})
export class CosmeticosDetail implements OnInit {
@Input('id') idCosmetico!: string;
loaded = false;
private readonly formBuilder: FormBuilder = inject(FormBuilder);
private readonly dataService: DataService = inject(DataService);
formCosmetico: FormGroup = this.formBuilder.group({
  _id: [''],
  name: ['', [Validators.required, Validators.maxLength(30), Validators.minLength(5)]],
  image: [''],
  type: [''],
  brand: [''],
  price: [0]
});
  toast: Toast ={
    text: '',
    className: ''
  };
  show = false;
//Getters

  private router: Router = inject(Router);
  get _id(): any{
    return this.formCosmetico.get('_id');
  }get name(): any{
    return this.formCosmetico.get('name');
  }get image(): any{
    return this.formCosmetico.get('image');
  }get type(): any{
    return this.formCosmetico.get('type');
  }get brand(): any{
    return this.formCosmetico.get('brand');
  }get price(): any{
    return this.formCosmetico.get('price');
  }

ngOnInit() {
  this.loadCosmetico();
}

  private loadCosmetico() {
    if(this.idCosmetico) {
      //EDITAREMOS EL COSMETICO
      this.dataService.getOneCosmetico(this.idCosmetico).subscribe({
        next: data => {
          this.formCosmetico.setValue(data)
          console.log(this.formCosmetico);
          this.loaded = true;
          this.toast.text = 'Cosmetico cargado';
          this.toast.className = 'bg-success text-light';
          this.show = true;
        },
        error: error => {
          console.error(error);
        }
      })

    }
    else {
      //CREAREMOS EL COSMETICO
      this.formCosmetico.reset();
      this.loaded = true;

    }
  }
  protected readonly faTrashCan:IconDefinition = faTrashCan;
  protected readonly faEdit:IconDefinition= faEdit;
  protected readonly onsubmit = onsubmit;

  onSubmit() {
    if (this.formCosmetico.invalid) {
      this.formCosmetico.markAsTouched();
      return;
    }
    if (this.idCosmetico) {
      //PUT
      this.dataService.patchCosmetico(this.formCosmetico.value).subscribe({
        next: data => {
          alert(data.message);
          this.loaded = true;
          this.toast.text = data.message;
          this.toast.className = 'bg-success text-light';
          this.show = true;
          this.router.navigateByUrl('/cosmeticos/list');


        },
        error: error => {
          this.loaded = true;
          this.toast.text = error.message;
          this.toast.className = 'bg-danger text-light';
          this.show = true;
        }
      })
    } else {
      //POST
      this.dataService.postCosmetico(this.formCosmetico.value).subscribe({
        next: data => {
          alert(data.message);
          this.loaded = true;
          this.toast.text = data.message;
          this.toast.className = 'bg-success text-light';
          this.show = true;

          setTimeout(() => {
            this.show = false;
            this.router.navigateByUrl('/cosmeticos/list');
          }, 1000
          )
        },
        error: error => {
          this.loaded = true;
          this.toast.text = error.message;
          this.toast.className = 'bg-success text-light';
          this.show = true;
          console.error(error);
        }
      })
    }
  }
}
