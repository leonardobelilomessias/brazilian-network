import React from 'react';
import { LucideProps } from 'lucide-react';

interface SectionContainerProps {
    children: React.ReactNode;
    className?: string;
    title?:string
    IconTitle:React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

const SectionContainer: React.FC<SectionContainerProps> = ({title, children, className = '', IconTitle }) => {
    return (
    <div className={`mb-8 bg-white rounded-lg p-4 md:p-6 w-full${className}`}>
              <div className="flex items-center mb-4">
                <span className="text-gray-600 mr-2"><IconTitle size={20}/></span>
                <h2 className="text-lg md:text-xl font-semibold">{title}</h2>
              </div>
              <div className="space-y-3 md:space-y-4"></div>
        {children}

    </div>
    );
};

export default SectionContainer;