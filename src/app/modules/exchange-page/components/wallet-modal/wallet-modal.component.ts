import { Component, TemplateRef, inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UplayService } from 'src/app/core/services/uplay/uplay.service';
import { Wallet } from 'src/app/core/models/wallet/wallet';
import { AuthGuard } from 'src/app/core/auth/auth-guard/auth-guard.service';

@Component({
  selector: 'app-wallet-modal',
  templateUrl: './wallet-modal.component.html',
  styleUrls: ['./wallet-modal.component.css']
})
export class WalletModalComponent {
  private modalService = inject(NgbModal);
	closeResult = '';
  userWallet!: Wallet;

  constructor(private uplayService: UplayService,
      private authGuard: AuthGuard
      ) {}

  ngOnInit(): void {
    this.loadWallet();
  }

	open(content: TemplateRef<any>) {
    this.loadWallet(() => {
      this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
    });
  }

  loadWallet(callback?: () => void) {
    this.uplayService.getUserId().then(() => {
      if (this.authGuard.canActivate()) {
        this.uplayService.getUserWallet().subscribe(
          (wallet) => {
            this.userWallet = {
              ...wallet,
            };
            console.log('Wallet updated:', this.userWallet);
            if (callback) {
              callback();
            }
          },
          (error) => {
            console.error('Error fetching user wallet:', error);
          }
        );
      }
    });
  }
  
}

