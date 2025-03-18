import React from 'react';

interface CardTipsContainerProps {
    children: React.ReactNode;
}
const CardTipsContainer: React.FC<CardTipsContainerProps> = ({ children }) => {
    return <div className="h-[340px] ">{children}</div>;
};

export default CardTipsContainer;