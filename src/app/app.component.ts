import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Person } from './models/person.model';
import { patchState, signalState } from '@ngrx/signals';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}

/** notas sobre signals
 * o signal é imutável por padrão ou seja precisa atualizar todo o objeto para mudar uma propriedade.
 * 
 * exemplo:
 *  const novoObjetoCompleto = {
    id: 1,
    name: 'João',
    age: 29,  // ← Modificada
    address: {
      street: 'Rua A', 
      city: 'Rio de Janeiro',  // ← Modificada
      state: 'RJ'              // ← Modificada
    }
  };
  
  this.person.set(novoObjetoCompleto); precisa alterar apenas cidade e estado repasse todo o objeto para o set ou utilize spread operator com o updade exemplo
 * 
    this.person.update(p => ({
    ...p,                    // Mantém id, name, etc.
    idade: 29,                 // Modifica apenas idade
    address: {
      ...p.address,          // Mantém street
      city: 'Rio de Janeiro', // Modifica city
      state: 'RJ'            // Modifica state
    }
  })); dessa forma que se trabalha com o signal nunca altera diretamente uma propriedade do objeto signal. exemplo errado:
  this.person().name = 'Novo Nome'; // Errado! Isso não notifica os observers.

 *this.person.update(p => ({ ...p, name: 'Novo Nome' })); // Correto! Isso cria um novo objeto e notifica os observers. 
 * 
 * 
 *  patchState(this.person, { age: 29 }); // Correto! patchState atualiza apenas a propriedade age utiliza apenas para signalstore          
 * 
 * 
 * 
 * 
 * App component antigo com os exemplos
 * ----Copiar daqui para o app component antigo ----
 *  // Cria um estado reativo usando signalState para gerenciar o objeto Person
  // Por debaixo dos panos: Transforma cada propriedade do objeto em um Signal individual utilizando DeepSignal
  readonly person = signalState<Person>({
    id: 1,
    name: 'Antonio',
    address: {
      street: 'Rua 123',
      city: 'Belo Horizonte',
      state: 'MG',
    },
  });

  // Cria um computed signal que observa apenas a propriedade name do person
  // Por debaixo dos panos: Cria uma dependência reativa específica - só reexecuta quando name muda
  // Mais verboso que a abordagem direta do signalState
  readonly personName = computed(() => this.person.name);

  // Acesso DIRETO à propriedade street através do DeepSignal do signalState
  // Por debaixo dos panos: person.address.street já É um Signal, não precisa de computed
  // Mais eficiente: o Signal para street é criado lazy (sob demanda) na primeira vez que é acessado
  readonly personStreet = this.person.address.street;

  method() {
    // Atualiza o estado de forma imutável usando patchState
    // Por debaixo dos panos:
    // 1. Cria uma nova cópia do estado com as mudanças
    // 2. Atualiza apenas os Signals que realmente mudaram
    // 3. Notifica todos os observers dependentes de forma granular
    patchState(this.person, (p) => ({
      address: {
        ...p.address,
        street: '456 Elm St',
      },
    }));
  }        
 ---------------------   fim da copia  -------------------------------------------------------         
 */
