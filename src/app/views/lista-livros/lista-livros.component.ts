import { EMPTY, catchError, debounceTime, distinctUntilChanged, filter, map, of, switchMap, tap, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { LivroService } from 'src/app/service/livro.service';
import { Item, LivrosResultado } from 'src/app/models/interfaces';
import { LivroVolumeInfo } from 'src/app/models/livroVolumeInfo';
import { FormControl } from '@angular/forms';
import { showLivrosTrigger } from 'src/app/animations';

const PAUSA = 300;
@Component({
  selector: 'app-lista-livros',
  templateUrl: './lista-livros.component.html',
  styleUrls: ['./lista-livros.component.css'],
  animations: [
    showLivrosTrigger
  ]
})
export class ListaLivrosComponent {
  campoBusca = new FormControl();
  mensagemErro = ''
  livrosResultado: LivrosResultado;
  listaLivros = [];

  constructor(private service: LivroService) {}

  livrosEncontrados$ = this.campoBusca.valueChanges
  .pipe(
      debounceTime( PAUSA ),
      filter( valorDigitado => valorDigitado.length >= 3),
      tap(() => console.log('Fluxo inicial')),
      distinctUntilChanged(),
      switchMap((valorDigitado) => this.service.buscar(valorDigitado)),
      tap( retorno => console.log(retorno)),
      map( resultado => this.livrosResultado = resultado),
      map( resultado => resultado.items ?? []),
      map( items => this.listaLivros = this.livrosResultadoParaLivros(items)),
      catchError( erro => {
        // this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação!'
        // return EMPTY;
        return throwError( () => new Error(
          this.mensagemErro = 'Ops, ocorreu um erro. Recarregue a aplicação!'))
      }),

  )
  //observable livrosEncontrados$
  //para cada valor há um valueChanges, onde transformados serão feitas as requisições cancelando as anteriores

  // buscarLivros() {
  //   this.subscription = this.service.buscar(this.campoBusca).subscribe({
  //     next: (items) => {
  //       console.log('requisições ao servidor')
  //       this.listaLivros = this.livrosResultadoParaLivros(items)
  //     },
  //     error: erro => console.error(erro),
  //   }
  //   )
  // }

  livrosResultadoParaLivros(items: Item[]): LivroVolumeInfo[] {
    return items.map((item) => {
      return new LivroVolumeInfo(item);
    });
  }

  // ngOnDestroy() {
  //   this.subscription.unsubscribe();
  // }
}
