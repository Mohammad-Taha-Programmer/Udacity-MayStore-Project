import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  message = signal<string | null>(null);
  type = signal<'success' | 'error'>('success');

  show(msg: string, msgType: 'success' | 'error' = 'success') {
    this.message.set(msg);
    this.type.set(msgType);
    setTimeout(() => this.message.set(null), 3000);
  }
}
