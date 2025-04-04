import { supabase } from './supabase';

export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    link?: string;
    githubUrl?: string;
    liveUrl?: string;
    created_at: string;
}

export async function getProjects(): Promise<Project[]> {
    const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Erreur lors de la récupération des projets:', error);
        return [];
    }

    // Transformer les données pour correspondre à l'interface Project
    return (data || []).map(project => ({
        ...project,
        tags: project.technologies || [], // Utiliser technologies comme tags
        link: project.liveUrl || project.githubUrl || '#' // Utiliser liveUrl ou githubUrl comme lien principal
    }));
} 