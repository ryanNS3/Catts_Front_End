import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { Solicitacao, StatusSolicitacao } from '../@Type/solicitacao';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'https://catts-api-hhegcygvgbcrgkas.brazilsouth-01.azurewebsites.net/api/adocoes';

  readonly dadosFicticios: Solicitacao[] = [
    {
      id: 30,
      nomeSolicitante: 'Eduardo Nascimento',
      nomePet: 'Tom',
      status: 'Pendente'
    },
    {
      id: 31,
      nomeSolicitante: 'Mariana Silva',
      nomePet: 'Luna',
      status: 'Aprovada'
    },
    {
      id: 32,
      nomeSolicitante: 'Lucas Oliveira',
      nomePet: 'Téo',
      status: 'Recusada'
    },
    {
      id: 33,
      nomeSolicitante: 'Laura Costa',
      nomePet: 'Olivia',
      status: 'Pendente'
    }
  ];

  private _solicitacoes = signal<Solicitacao[]>([...this.dadosFicticios]);
  carregando = signal(false);
  enviandoResposta = signal(false);

  get solicitacoes(): Solicitacao[] {
    return this._solicitacoes();
  }

  set solicitacoes(lista: Solicitacao[]) {
    this._solicitacoes.set(lista);
  }

  carregarSolicitacoesDaOng(usarFallbackEmErro = true) {
    const token = localStorage.getItem('token');

    if (!token) {
      if (usarFallbackEmErro) {
        this._solicitacoes.set([...this.dadosFicticios]);
      }
      return of(this._solicitacoes());
    }

    this.carregando.set(true);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.baseUrl}/ong`, { headers }).pipe(
      tap((resposta) => {
        const normalizadas = (resposta ?? []).map((item) => this.mapearSolicitacao(item));
        this._solicitacoes.set(normalizadas);
        this.carregando.set(false);
      }),
      catchError((erro) => {
        console.error('Erro ao buscar solicitações da ONG:', erro);
        this.carregando.set(false);
        if (usarFallbackEmErro) {
          this._solicitacoes.set([...this.dadosFicticios]);
        }
        return of(this._solicitacoes());
      })
    );
  }

  responderSolicitacao(
    id: number | string,
    novoStatus: StatusSolicitacao,
    respostaOng?: string,
    usarFallbackEmErro = true
  ) {
    if (novoStatus === 'Pendente') {
      return of(false);
    }

    const token = localStorage.getItem('token');
    const aprovar = novoStatus === 'Aprovada';

    if (!token) {
      if (usarFallbackEmErro) {
        this.atualizarStatus(id, novoStatus);
      }
      return of(usarFallbackEmErro);
    }

    this.enviandoResposta.set(true);

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = {
      aprovar,
      respostaOng:
        respostaOng ??
        (aprovar
          ? 'Solicitação aprovada pela ONG!'
          : 'Solicitação não aprovada no momento.')
    };

    return this.http
      .patch(`${this.baseUrl}/${id}/responder`, body, { headers })
      .pipe(
        map(() => {
          this.atualizarStatus(id, novoStatus);
          this.enviandoResposta.set(false);
          return true;
        }),
        catchError((erro) => {
          console.error('Erro ao responder solicitação:', erro);
          this.enviandoResposta.set(false);
          if (usarFallbackEmErro) {
            this.atualizarStatus(id, novoStatus);
            return of(true);
          }
          return of(false);
        })
      );
  }

  atualizarStatus(id: number | string, novoStatus: StatusSolicitacao) {
    const atualizadas = this._solicitacoes().map((item) =>
      String(item.id) === String(id) && item.status === 'Pendente'
        ? { ...item, status: novoStatus }
        : item
    );
    this._solicitacoes.set(atualizadas);
  }

  buscarSolicitacao(id: number | string) {
    return this._solicitacoes().find(
      (solicitacao) => String(solicitacao.id) === String(id)
    );
  }

  private normalizarStatus(statusRaw: unknown): StatusSolicitacao {
    const valor = String(statusRaw ?? '').toUpperCase();
    if (valor === 'APROVADA' || valor === 'APROVADO') return 'Aprovada';
    if (valor === 'REJEITADA' || valor === 'RECUSADA' || valor === 'REJEITADO') return 'Recusada';
    return 'Pendente';
  }

  private mapearSolicitacao(item: any): Solicitacao {
    const adotante = item.adopter ?? item.adotante ?? {};
    const endereco = adotante.address ?? adotante.endereco ?? item.address ?? item.endereco ?? {};
    const animal = item.animal ?? item.pet ?? {};

    return {
      ...item,
      id: item.id,
      nomeSolicitante:
        item.nomeSolicitante ??
        item.nomeAdotante ??
        item.adotanteNome ??
        adotante.nome ??
        'Solicitante',
      nomePet:
        item.nomePet ??
        item.nomeAnimal ??
        item.animalNome ??
        animal.name ??
        animal.nome ??
        'Pet',
      status: this.normalizarStatus(item.status),
      mensagemAdotante: item.mensagemAdotante,
      respostaOng: item.respostaOng,
      dataSolicitacao: item.dataSolicitacao
    };
  }
}