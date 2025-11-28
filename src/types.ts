// TypeScript interfaces for component props and data structures

export interface MetricCardProps {
    title: string;
    value: number | string;
    subtitle: string;
    borderColor: 'teal' | 'green';
    icon?: React.ReactNode;
}
export interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: number | string;
    target: string;
}

export interface DailyGoalItemProps {
    id: string;
    label: string;
    isCompleted: boolean;
    onToggle: (id: string) => void;
}

export interface NavItem {
    id: string;
    label: string;
    icon: React.ReactNode;
    path: string;
}

export interface Goal {
    id: string;
    label: string;
    isCompleted: boolean;
}

export interface GoalStatus {
    waterGoalMet: boolean;
    sleepGoalMet: boolean;
    dietGoalMet: boolean;
    workoutGoalMet: boolean;
    totalCompleted: number;
    totalGoals: number;
}

