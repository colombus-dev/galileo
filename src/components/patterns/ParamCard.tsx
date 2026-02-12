interface ParamCardProps {
    title: string;
    desc: string;
    linkText: string;
    linkUrl: string;
    icon?: string;
    theme?: 'blue' | 'red' | 'purple';
}

const themeStyles = {
    blue: {
        accent: "text-blue-500",
        bgIcon: "bg-blue-50 text-blue-500",
        hoverBorder: "hover:border-blue-500"
    },
    red: {
        accent: "text-red-500",
        bgIcon: "bg-red-50 text-red-500",
        hoverBorder: "hover:border-red-500"
    },
    purple: {
        accent: "text-purple-500",
        bgIcon: "bg-purple-50 text-purple-500",
        hoverBorder: "hover:border-purple-500"
    }
};

export const ParamCard = ({ 
    title, 
    desc, 
    linkText, 
    linkUrl, 
    icon = "1", 
    theme = "blue" 
}: ParamCardProps) => {
    const styles = themeStyles[theme];

    return (
        <a 
            href={linkUrl} 
            className={`
                group flex flex-col items-start h-full p-10
                bg-white border border-gray-200 rounded-2xl
                shadow-sm hover:shadow-xl hover:-translate-y-2
                transition-all duration-300 ease-in-out
                box-border no-underline ${styles.hoverBorder}
            `}
        >
            {/* Icône */}
            <div className={`
                w-[50px] h-[50px] rounded-xl mb-6
                flex items-center justify-center
                text-lg font-bold ${styles.bgIcon}
            `}>
                {icon}
            </div>

            {/* Titre */}
            <h2 className="text-[1.4rem] font-bold text-gray-900 mb-2.5">
                {title}
            </h2>

            {/* Description */}
            <p className="text-[0.95rem] text-gray-600 leading-relaxed mb-[30px]">
                {desc}
            </p>

            {/* Action (Lien) */}
            <div className={`mt-auto font-semibold flex items-center ${styles.accent}`}>
                {linkText}
                <span className="ml-2 transition-all duration-200 group-hover:ml-3">
                    →
                </span>
            </div>
        </a>
    );
}