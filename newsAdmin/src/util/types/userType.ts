interface baseMneu {
    path: string,
    title: string,
    name?: string,
    child?: string,
    params?: string
}

export interface menuType extends baseMneu {
    children?: Array<baseMneu>
}

export interface users {
    username: string,
    role: number,
    introduction: string,
    gender: number,
    avatar: string,
    menu: Array<menuType>
}

export interface uinfo extends users {
    id: number,
}

export interface nuser extends users {
    password: string,
    file: any
}
