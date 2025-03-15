import React from 'react';

export const ContainerScreen =  ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="p-4 min-h-screen max-w-5xl mx-auto">
            {children}
        </div>
    );
};
