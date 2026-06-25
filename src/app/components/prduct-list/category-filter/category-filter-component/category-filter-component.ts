import { CommonModule } from '@angular/common';
import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { CategoryModel } from '../../../../models/category-model';


@Component({
  selector: 'app-category-filter-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filter-component.html',
  styleUrl: './category-filter-component.css',
})
export class CategoryFilterComponent implements OnInit{
  @Input() categories: CategoryModel[] = [];
  @Input() selectedId: number | null = null;
  @Output() categoryChange = new EventEmitter<number | null>();

  ngOnInit(): void {
    
  }

  selectCategory(id: number | null) {
    this.categoryChange.emit(id);
  }
}
