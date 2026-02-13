import type { Meta, StoryObj } from '@storybook/react';
import { CodeNotebook } from '@/components/patterns/CodeNotebook'

const meta: Meta<typeof CodeNotebook> = {
    title: 'Patterns/CodeNotebook',
    component: CodeNotebook,
    decorators: [(Story) => <div style={{ padding: '2rem', maxWidth: '400px' }}><Story/></div>],
    tags: ['autodocs'],
};


export default meta;
type Story = StoryObj<typeof CodeNotebook>;

export const Default: Story = {
  args: {
    titleCode: 'helloWorld.js',
    code: `const message = "Hello World";
console.log(message);`,
  },
};

export const LongCode: Story = {
  args: {
    titleCode: 'ComplexLogic.tsx',
    code: `export const ComplexComponent = () => {
  const [data, setData] = useState(null);
  return <div className="p-4 bg-red-500 text-white shadow-lg border-2 border-black">This is a very long line to test how the overflow-x-auto property handles the container width...</div>
}`,
  },
};