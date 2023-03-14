export interface Team {
    team_id: string;
    abbreviation: string;
    active: boolean;
    first_name: string;
    last_name: string;
    conference: string;
    division: string;
    site_name: string;
    city: string;
    state: string;
    full_name: string;
}

export interface Stat {
    last_name: string;
    first_name: string;
    display_name: string;
    position: string;
    minutes: number;
    points: number;
    assists: number;
    turnovers: number;
    steals: number;
    blocks: number;
    field_goals_attempted: number;
    field_goals_made: number;
    three_point_field_goals_attempted: number;
    three_point_field_goals_made: number;
    free_throws_attempted: number;
    free_throws_made: number;
    defensive_rebounds: number;
    offensive_rebounds: number;
    personal_fouls: number;
    team_abbreviation: string;
    is_starter: boolean;
    field_goal_percentage: number;
    three_point_percentage: number;
    free_throw_percentage: number;
}

export interface Official {
    position?: any;
    first_name: string;
    last_name: string;
}

export interface Site {
    capacity: number;
    surface: string;
    name: string;
    state: string;
    city: string;
}

export interface EventInformation {
    temperature: number;
    site: Site;
    attendance: number;
    duration: string;
    status: string;
    season_type: string;
    start_date_time: Date;
}

export interface Totals {
    minutes: number;
    points: number;
    assists: number;
    turnovers: number;
    steals: number;
    blocks: number;
    field_goals_attempted: number;
    field_goals_made: number;
    three_point_field_goals_attempted: number;
    three_point_field_goals_made: number;
    free_throws_attempted: number;
    free_throws_made: number;
    defensive_rebounds: number;
    offensive_rebounds: number;
    personal_fouls: number;
    field_goal_percentage: number;
    three_point_percentage: number;
    free_throw_percentage: number;
}

export interface NBAGame {
    league: "NBA";
    away_team: Team;
    home_team: Team;
    away_period_scores: number[];
    home_period_scores: number[];
    away_stats: Stat[];
    home_stats: Stat[];
    officials: Official[];
    event_information: EventInformation;
    away_totals: Totals;
    home_totals: Totals;
}
