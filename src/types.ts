// TypeScript interfaces for component props and data structures


export interface StatCardProps {
    icon: React.ReactNode;
    title: string;
    value: number | string;
    target: string;
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

