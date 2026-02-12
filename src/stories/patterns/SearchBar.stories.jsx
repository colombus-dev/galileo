import SearchBar from '@/components/SearchBar';

export default {
  title: 'Patterns/SearchBar',
  component: SearchBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Empty = {
  args: {
    value: '',
    placeholder: 'Tapez quelque chose...',
  },
};

export const Filled = {
  args: {
    value: 'Tailwind CSS',
    placeholder: 'Rechercher...',
  },
};