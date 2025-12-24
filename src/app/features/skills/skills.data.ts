
export const SKILLS: {
    frontend: Array<{ name: string, category: 'frontend' | 'backend' | 'tools', level?: string, url?: string }>,
    backend: Array<{ name: string, category: 'frontend' | 'backend' | 'tools', level?: string, url?: string }>,
    tools: Array<{ name: string, category: 'frontend' | 'backend' | 'tools', level?: string, url?: string }>
} = {
    frontend: [
        { name: 'Angular', category: 'frontend', level: 'Basic', url: 'assets/img/skills/Angular_gradient_logo.png' },
        { name: 'HTML', category: 'frontend', level: 'Advanced', url: 'assets/img/skills/html.png' },
        { name: 'CSS', category: 'frontend', level: 'Intermediate', url: 'assets/img/skills/css.png' },
        { name: 'JavaScript', category: 'frontend', level: 'Intermediate', url: 'assets/img/skills/js.png' },
        { name: 'TypeScript', category: 'frontend', level: 'Intermediate', url: 'assets/img/skills/ts.png' },
        { name: 'React.js', category: 'frontend', level: 'Basic', url: 'assets/img/skills/react.png' },
        { name: 'Next.js', category: 'frontend', level: 'Basic', url: 'assets/img/skills/next-js.png' },
        { name: 'Bootstrap', category: 'frontend', level: 'Intermediate', url: 'assets/img/skills/b5.webp' },
        { name: 'Tailwind CSS', category: 'frontend', level: 'Intermediate', url: 'assets/img/skills/tailwindcss.png' }
    ],
    backend: [
        { name: 'Java', category: 'backend', level: 'Intermediate', url: 'assets/img/skills/java.png' },
        { name: 'Spring Boot', category: 'backend', level: 'Intermediate', url: 'assets/img/skills/springboot.png' },
        { name: 'Spring Webflux', category: 'backend', level: 'Basic', url: 'assets/img/skills/spring_webflux.png' },
        { name: 'PHP', category: 'backend', level: 'Advanced', url: 'assets/img/skills/php.png' },
        { name: 'Laravel', category: 'backend', level: 'Advanced', url: 'assets/img/skills/laravel.png' },
        { name: 'Python', category: 'backend', level: 'Intermediate', url: 'assets/img/skills/python.png' },
        { name: 'SQL Server', category: 'backend', level: 'Intermediate', url: 'assets/img/skills/sqlserver.png' }
    ],
    tools: [
        { name: 'Git', category: 'tools', url: 'assets/img/skills/git.png' },
        { name: 'CPanel', category: 'tools', url: 'assets/img/skills/cpanel.png' },
        { name: 'Postman', category: 'tools', url: 'assets/img/skills/postman.png' },
        { name: 'Figma', category: 'tools', url: 'assets/img/skills/figma.png' }
    ]
};
