import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionType, EmitAction, TableActions } from './table.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() dataSource;
  @Input() displayedColumns;
  @Input() actionsForTable: TableActions;
  @Input() tableWidth: string;
  @Input() loading: boolean;
  @Output() emitOnClick = new EventEmitter();
  displayedColumnsFull = {};

  constructor() {}

  ngOnInit(): void {
    this.displayedColumnsFull = { ...this.displayedColumns, actions: 'Akcije' };
  }

  objectKeys(obj) {
    return Object.keys(obj);
  }

  onEmit(data: EmitAction) {
    const entity = data.data;
    let response = {};
    data.params.forEach((param, i) => {
      if (i === 0) {
        response['data_id'] = entity[param];
      } else {
        response[param] = entity[param];
      }
    });
    this.emitOnClick.emit({
      ...response,
      action_type: ActionType[data.action_type.toUpperCase()],
    });
  }
}
