import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Item } from '../../../services/item/item.service';

type CreateItemModel = {
  title: string;
  description: string;
  location?: string;
  price: number | null;
};

type PreviewFile = { file: File; url: string };

@Component({
  selector: 'app-create-item',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './create-item.component.html',
  styleUrl: './create-item.component.css'
})
export class CreateItemComponent {
  model: CreateItemModel = { title: '', description: '', location: '', price: null };

  files: PreviewFile[] = [];

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const list = Array.from(input.files ?? []);

    // чистим предыдущие ObjectURL
    this.revokeAll();

    // создаём превью только для изображений
    this.files = list
      .filter(f => f.type?.startsWith('image/'))
      .map(file => ({ file, url: URL.createObjectURL(file) }));

    // сброс значения, чтобы повторный выбор того же файла сработал
    input.value = '';
  }

  removeFile(index: number): void {
    const pf = this.files[index];
    if (pf) URL.revokeObjectURL(pf.url);
    this.files.splice(index, 1);
  }

  private revokeAll() {
    for (const pf of this.files) URL.revokeObjectURL(pf.url);
  }

  ngOnDestroy() {
    this.revokeAll();
  }

  generateNewItem(): CreateItemModel {
    const body: any = {
      title: (this.model.title || '').trim(),
      description: (this.model.description || '').trim(),
      price: Number(this.model.price ?? 0),
    };
    if (this.model.location?.trim()) body.location = this.model.location.trim();
    return body;
  }
}
