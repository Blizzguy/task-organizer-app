export interface Task {
    id: number;
    taskName: string;
    description?: string;
    completed: boolean;
    isNew?: boolean;
}
