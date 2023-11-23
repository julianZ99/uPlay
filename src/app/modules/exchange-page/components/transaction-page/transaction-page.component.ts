import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from 'src/app/core/auth/auth-guard/auth-guard.service';
import { Transaction } from 'src/app/core/models/transaction/transaction';
import { UplayService } from 'src/app/core/services/uplay/uplay.service';

@Component({
  selector: 'app-transaction-page',
  templateUrl: './transaction-page.component.html',
  styleUrls: ['./transaction-page.component.css']
})
export class TransactionPageComponent {
  transactions: Transaction[] = [];

  constructor(
    private uplayService: UplayService,
    private authGuard: AuthGuard
  ) {}

  private modalService = inject(NgbModal);
  closeResult = '';

  ngOnInit() {
    this.loadTransactions();
  }

  open(content: TemplateRef<any>) {
    this.loadTransactions(() => {
      this.modalService.open(content, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'l'
      });
    });
  }

  loadTransactions(callback?: () => void) {
    this.uplayService.getUserId().then(() => {
      if (this.authGuard.canActivate()) {
        this.uplayService.getUserTransactions().subscribe(
          (transactions) => {
            this.transactions = transactions.map(transaction => ({
              ...transaction,
              Date: this.parseDateString(transaction.transactionDate),
            }));
            console.log('Transactions updated:', this.transactions);
            if (callback) {
              callback();
            }
          },
          (error) => {
            console.error('Error fetching user transactions:', error);
          }
        );
      }
    });
  }

  parseDateString(dateArray: number[]): Date {
    if (dateArray && dateArray.length === 7) {
      return new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
    } else {
      console.error('Invalid dateArray:', dateArray);
      return new Date();
    }
  }
  
}
