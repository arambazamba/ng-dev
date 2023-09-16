import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
} from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { FoodItem } from "../food.model";

@Component({
  selector: "app-food-list",
  templateUrl: "./food-list.component.html",
  styleUrls: ["./food-list.component.scss"],
})
export class FoodListComponent implements OnChanges {
  @Input() food: FoodItem[] = [];
  @Output() foodSelected: EventEmitter<FoodItem> = new EventEmitter<FoodItem>();
  @Output()
  foodDeleted: EventEmitter<FoodItem> = new EventEmitter<FoodItem>();
  @Output()
  foodAdding: EventEmitter<FoodItem> = new EventEmitter<FoodItem>();

  displayedColumns: string[] = [
    "id",
    "name",
    "price",
    "calories",
    "deleteItem",
    "editItem",
  ];
  dataSource = new MatTableDataSource([]);

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource(changes["food"].currentValue);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectFood(p: FoodItem) {
    this.foodSelected.emit(p);
  }

  deleteFood(item: FoodItem) {
    this.foodDeleted.emit(item);
  }

  addFood() {
    const item = new FoodItem();
    item.id = this.getNewId();
    this.foodAdding.emit(new FoodItem());
  }

  getNewId() {
    const nextId = this.food.reduce((acc, f) => (acc = acc > f.id ? acc : f.id), 0) + 1;
    return nextId;
  }
}
