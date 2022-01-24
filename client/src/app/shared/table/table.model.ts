export interface TableActions {
    name: string;
    icon: string;
    route?: string;
    param?: string[];
    type?: string;
    emit?: boolean;
}

export interface EmitAction {
    data: any;
    params: string[];
    action_type: ActionType;
}

export enum ActionType {
    DELETE = 'Delete',
    EDIT = 'Edit'
  }