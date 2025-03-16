import { create } from 'zustand';


type SelectStateCountry = {
  selectedValueCountry: string;
  setSelectedValueCountry: (value: string) => void;
};
type SelectStateTheme = {
    selectedValueTheme: string;
    setSelectedValueTheme: (value: string) => void;
  };

export const useSelectStoreTheme = create<SelectStateTheme>((set) => ({
    selectedValueTheme: '', // Valor inicial
    setSelectedValueTheme: (value) => set({ selectedValueTheme: value }), // Função para atualizar o valor
}));

export const useSelectStoreContry = create<SelectStateCountry>((set) => ({
    selectedValueCountry: '', // Valor inicial
    setSelectedValueCountry: (value) => set({ selectedValueCountry: value }), // Função para atualizar o valor
  }))
