// arktic-studio/schemaTypes/heroInfo.ts
export default {
    name: 'heroInfo',
    title: 'Infos Prochaine Session (Accueil)',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Titre de la session',
            type: 'string',
            initialValue: 'Session Escalade Arkose',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            initialValue: 'Rejoins-nous pour une session d\'escalade inoubliable à Arkose Montreuil ! Que tu sois débutant ou confirmé, nos moniteurs expérimentés seront là pour te guider et te faire progresser dans une ambiance conviviale et fun.',
        },
        {
            name: 'location',
            title: 'Lieu',
            type: 'string',
            initialValue: 'Arkose Montreuil, 93100 Montreuil',
        },
        {
            name: 'schedule',
            title: 'Horaire (ex: Mardi 17 Mars 2026 - 17h30)',
            type: 'string',
        },
        {
            name: 'coverImage',
            title: 'Image de présentation',
            type: 'image',
            options: {
                hotspot: true,
            }
        },
    ],
}
