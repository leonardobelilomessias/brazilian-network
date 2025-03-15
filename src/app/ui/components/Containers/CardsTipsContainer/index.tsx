import React from 'react';

interface CardTipsContainerProps {
    children: React.ReactNode;
}
const CardTipsContainer: React.FC<CardTipsContainerProps> = ({ children }) => {
    return <div className="">{children}</div>;
};

export default CardTipsContainer;